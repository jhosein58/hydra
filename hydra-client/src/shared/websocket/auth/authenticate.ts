import { getIdentityKeys } from "@/features/identity/storage/keys";
import { encodeBase58 } from "../../lib/crypto/base58";
import { redirect } from "next/navigation";

export async function authenticate() {
  const identity = await getIdentityKeys();

  if (!identity) {
    redirect("/setup")
  }

  return {
    type: "Authenticate",
    data: {
      device_public_key: encodeBase58(identity.devicePublicKey),
    },
  };
}
