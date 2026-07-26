"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { socketService } from "../lib/websocket/socket-service";
import { getIdentityKeys } from "@/features/identity/storage/keys";
import { decodeBase58, encodeBase58 } from "../lib/crypto/base58";
import { ed25519 } from "@noble/curves/ed25519.js";

export type AuthStep =
  | "IDLE"
  | "GET_KEYS"
  | "AWAITING_CHALLENGE"
  | "SIGNING"
  | "AUTHENTICATED"
  | "ERROR";

interface SocketContextType {
  step: AuthStep;
}

const SocketContext = createContext<SocketContextType>({
  step: "IDLE",
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<AuthStep>("IDLE");
  const [error, setError] = useState<string | null>(null);
  const unsubscribersRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    async function initSocket() {
      try {
        const identity = await getIdentityKeys();
        if (!identity) throw new Error("something was wronge");
        setStep("GET_KEYS");

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
        });

        await socketService.connect("ws://localhost:8080/ws");

        unsubscribersRef.current.push(unsubChallenge, unsubSuccess);

        socketService.send({
          type: "Authenticate",
          data: { device_public_key: encodeBase58(identity.devicePublicKey) },
        });
      } catch (err) {
        setError("خطا در امضای چالش رمزنگاری");
        setStep("ERROR");
      }
    }

    initSocket();

    return () => {
      unsubscribersRef.current.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  if (step === "ERROR") return <p>something was wrong !!!!</p>;
  if(step !== "AUTHENTICATED") return <p>please wite a second ...</p>

  return <SocketContext value={{ step }}>{children}</SocketContext>;
}

export const useSocket = () => useContext(SocketContext);
