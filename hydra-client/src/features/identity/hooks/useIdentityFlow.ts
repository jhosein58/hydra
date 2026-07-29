// features/auth/hooks/useAuthFlow.ts
import { useState, useRef, useEffect } from "react";
import { generateMnemonic } from "../api/generate-mnemonic";
import { generateKeys } from "../crypto/generate-keys";
import { registerIdentity } from "../api/register-Identity";
import { getIdentityKeys } from "../storage/keys";
import { useSocket } from "@/shared/providers/SocketProvider";

export type AuthStep =
  | "IDLE"
  | "FETCHING_MNEMONIC"
  | "SHOW_MNEMONIC"
  | "GENERATING_KEYS"
  | "REGISTER_KEYS"
  | "ERROR";

export function useIdentityFlow() {
  const [step, setStep] = useState<AuthStep>("IDLE");
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { setIdentity } = useSocket();

  const keysRef = useRef<
    | {
        masterPrivateKey: Uint8Array<ArrayBufferLike>;
        masterPublicKey: Uint8Array;
        devicePrivateKey: Uint8Array;
        devicePublicKey: Uint8Array;
      }
    | undefined
  >(null);

  const fetchMnemonic = async () => {
    try {
      setError(null);
      setStep("FETCHING_MNEMONIC");

      const words = await generateMnemonic();
      setMnemonic(words);

      setStep("SHOW_MNEMONIC");
    } catch (err: any) {
      setError(err.message || "خطا در دریافت کلمات امنیتی");
      setStep("ERROR");
    }
  };

  const confirmMnemonicAndConnect = async () => {
    try {
      setStep("GENERATING_KEYS");

      const payload = await generateKeys(mnemonic);

      setStep("REGISTER_KEYS");

      await registerIdentity(payload);

      const identity = await getIdentityKeys();

      if (!identity) throw new Error("something was wronge");
      setIdentity(identity);
    } catch (err: any) {
      setError(err.message || "خطا در برقراری ارتباط با سرور");
      setStep("ERROR");
    }
  };

  useEffect(() => {
    fetchMnemonic();
  }, []);

  return {
    step,
    mnemonic,
    error,
    confirmMnemonicAndConnect,
  };
}
