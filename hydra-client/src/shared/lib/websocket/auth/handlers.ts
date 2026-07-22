import type { ServerMessage } from "./types";
import { decodeBase58, encodeBase58 } from "../../crypto/base58";
import { getIdentityKeys } from "@/features/identity/storage/keys";
import { ed25519 } from "@noble/curves/ed25519.js";
import { socketService } from "../socket";

export async function handleMessage(message: ServerMessage) {
  switch (message.type) {
    case "AuthStatus":
      console.log(message.authenticated);
      break;

    case "Challenge": {
      const challengeBytes = decodeBase58(message.data.challenge);

      const identity = await getIdentityKeys();
      if (!identity) return;
      const signature = ed25519.sign(challengeBytes, identity.devicePrivateKey);

      const signatureBase58 = encodeBase58(signature);

      socketService.send({
        type: "ChallengeResponse",
        data: {
          signature: signatureBase58,
        },
      });
      break;
    }
    case "Authenticated":
      console.log("authenticated");
      break;
  }
}
