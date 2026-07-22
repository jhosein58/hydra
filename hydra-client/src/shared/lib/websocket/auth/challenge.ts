import { getIdentityKeys } from "@/features/identity/storage/keys";
import { decodeBase58, encodeBase58 } from "../../crypto/base58";
import { ed25519 } from "@noble/curves/ed25519.js";
import { socketService } from "../core/socket";

export async function handleChallenge(challenge: string) {
  const challengeBytes = decodeBase58(challenge);

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
}
