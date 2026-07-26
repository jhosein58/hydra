// features/auth/hooks/useAuthFlow.ts
import { useState, useRef, useEffect } from "react";
import { generateMnemonic } from "../api/generate-mnemonic";
import { socketService } from "@/shared/lib/websocket/socket-service";
import { decodeBase58, encodeBase58 } from "@/shared/lib/crypto/base58";
import { generateKeys } from "../crypto/generate-keys";
import { registerIdentity } from "../api/register-Identity";
import { getIdentityKeys } from "../storage/keys";
import { ed25519 } from "@noble/curves/ed25519.js";
import { redirect } from "next/navigation";
import { useSocket } from "@/shared/providers/SocketProvider";

export type AuthStep =
  | "IDLE"
  | "FETCHING_MNEMONIC" // ۱. در حال دریافت کلمات از REST
  | "SHOW_MNEMONIC" // ۲. توقف: نمایش کلمات به کاربر جهت یادداشت
  | "GENERATING_KEYS" // ۳. ساخت کلیدها پس از تایید کاربر
  | "REGISTER_KEYS"
  | "AWAITING_CHALLENGE" // ۵. منتظر چالش از سرور
  | "SIGNING" // ۶. در حال امضای چالش
  | "AUTHENTICATED" // ۷. احراز هویت موفق
  | "ERROR";

export function useIdentityFlow() {
  const [step, setStep] = useState<AuthStep>("IDLE");
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setAuthStatus } = useSocket();

  // نگهداری کلیدها در memory جهت امنیت و جلوگیری از رندرهای اضافی React
  const keysRef = useRef<
    | {
        masterPrivateKey: Uint8Array<ArrayBufferLike>;
        masterPublicKey: Uint8Array;
        devicePrivateKey: Uint8Array;
        devicePublicKey: Uint8Array;
      }
    | undefined
  >(null);

  // نگهداری ارجاع به توابع Unsubscribe برای پاک‌سازی شنونده‌ها در Unmount
  const unsubscribersRef = useRef<(() => void)[]>([]);

  // پاک‌سازی شنونده‌ها موقع آن‌مانت شدن کامپوننت جهت جلوگیری از Memory Leak
  useEffect(() => {
    return () => {
      unsubscribersRef.current.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  // اکشن اول: گرفتن ۱۲ کلمه از REST (توسط کاربر یا لود اولیه)
  const fetchMnemonic = async () => {
    try {
      setError(null);
      setStep("FETCHING_MNEMONIC");

      const words = await generateMnemonic();
      setMnemonic(words);

      // توقف فرآیند تا کاربر کلمات را ببیند و روی دکمه "ادامه" کلیک کند
      setStep("SHOW_MNEMONIC");
    } catch (err: any) {
      setError(err.message || "خطا در دریافت کلمات امنیتی");
      setStep("ERROR");
    }
  };

  // اکشن دوم: تایید کلمات توسط کاربر ⬅️ ساخت کلید ⬅️ اتصال سوکت ⬅️ ثبت شنونده‌ها ⬅️ احراز هویت
  const confirmMnemonicAndConnect = async () => {
    try {
      if (mnemonic.length === 0) return;

      // ۱. ساخت کلیدها از کلمات
      setStep("GENERATING_KEYS");

      const payload = await generateKeys(mnemonic);

      setStep("REGISTER_KEYS");

      await registerIdentity(payload);

      const identity = await getIdentityKeys();

      if (!identity) throw new Error("something was wronge");

      keysRef.current = identity;

      // ۲. ثبت شنونده‌ها روی socketService (با استفاده از متد .on جدید)
      const unsubChallenge = socketService.on(
        "Challenge",
        async (data: { challenge: string }) => {
          try {
            setStep("SIGNING");
            const challengeBytes = decodeBase58(data.challenge);
            const signature = ed25519.sign(
              challengeBytes,
              identity.devicePrivateKey,
            );
            const signatureBase58 = encodeBase58(signature);

            // ارسال امضا روی سوکت
            socketService.send({
              type: "ChallengeResponse",
              data: { signature: signatureBase58 },
            });

            setStep("AWAITING_CHALLENGE");
          } catch (err) {
            setError("خطا در امضای چالش رمزنگاری");
            setStep("ERROR");
          }
        },
      );

      const unsubSuccess = socketService.on("Authenticated", () => {
        setStep("AUTHENTICATED");
        setAuthStatus("AUTHENTICATED");
        redirect("/chat");
      });

      // ذخیره توابع Cleanup
      unsubscribersRef.current.push(unsubChallenge, unsubSuccess);

      // 3. ارسال کلید عمومی به سرور برای دریافت اولین چالش
      socketService.send({
        type: "Authenticate",
        data: { device_public_key: encodeBase58(identity.devicePublicKey) },
      });

      setStep("AWAITING_CHALLENGE");
    } catch (err: any) {
      setError(err.message || "خطا در برقراری ارتباط با سرور");
      setStep("ERROR");
    }
  };

  return {
    step,
    mnemonic,
    error,
    fetchMnemonic,
    confirmMnemonicAndConnect,
  };
}
