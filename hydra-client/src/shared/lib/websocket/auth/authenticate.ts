import { getIdentityKeys } from "@/features/identity/storage/keys";
import { encodeBase58 } from "../../crypto/base58";
import { socketService } from "../socket";

export async function authenticate() {
  const identity = await getIdentityKeys();

  if (!identity) {
    throw new Error("Identity not found");
  }

  socketService.send({
    type: "Authenticate",
    data: {
      device_public_key: encodeBase58(identity.devicePublicKey),
    },
  });
}
