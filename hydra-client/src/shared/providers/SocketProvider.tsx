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
import { getIdentityKeys } from "@/features/setup/model/storage/keys";
import { decodeBase58, encodeBase58 } from "../lib/crypto/base58";
import { ed25519 } from "@noble/curves/ed25519.js";
import { redirect } from "next/navigation";

export type AuthStep =
  | "IDLE"
  | "GET_KEYS"
  | "AWAITING_CHALLENGE"
  | "SIGNING"
  | "AUTHENTICATED"
  | "ERROR";

interface SocketContextType {
  step: AuthStep;
  setIdentity: Dispatch<SetStateAction<{}>>;
}

const SocketContext = createContext<SocketContextType>({
  step: "IDLE",
  setIdentity: () => {},
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<AuthStep>("IDLE");
  const [error, setError] = useState<string | null>(null);
  const unsubscribersRef = useRef<(() => void)[]>([]);

  const [identity, setIdentity] = useState({});

  useEffect(() => {
    async function initSocket() {
      await socketService.connect("ws://localhost:8080/ws");

      setStep("GET_KEYS");

      const keys = await getIdentityKeys();
      if (!keys) {
        setError("key is not exist");
        setStep("ERROR");
        return;
      }

      const unsubChallenge = socketService.on(
        "Challenge",
        async (data: { challenge: string }) => {
          try {
            setStep("SIGNING");

            const challengeBytes = decodeBase58(data.challenge);
            const signature = ed25519.sign(
              challengeBytes,
              keys.devicePrivateKey,
            );

            const signatureBase58 = encodeBase58(signature);

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

      const unsubError = socketService.on("Error", (data) => {
        setStep("ERROR");
        setError(data.message);
      });

      unsubscribersRef.current.push(unsubChallenge, unsubSuccess, unsubError);

      socketService.send({
        type: "Authenticate",
        data: { device_public_key: encodeBase58(keys.devicePublicKey) },
      });
    }

    initSocket();

    return () => {
      unsubscribersRef.current.forEach((unsubscribe) => unsubscribe());
    };
  }, [identity]);

  console.log(step);

  if (step !== "ERROR" && step !== "AUTHENTICATED")
    return <p>please wait a second ...</p>;

  return (
    <SocketContext value={{ step, setIdentity }}>{children}</SocketContext>
  );
}

export const useSocket = () => useContext(SocketContext);
