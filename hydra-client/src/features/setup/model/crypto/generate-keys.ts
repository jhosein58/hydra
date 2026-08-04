import { generateMasterKeyPair } from "./master";
import { generateDeviceKeyPair } from "./device";
import { signDevicePublicKey } from "./sign";
import { saveIdentityKeys } from "../storage/keys";
import { encodeBase58 } from "../../../../shared/lib/crypto/base58";

export async function generateKeys(mnemonic: string[]) {
  const master = await generateMasterKeyPair(mnemonic);

  const device = generateDeviceKeyPair();

  await saveIdentityKeys(
    master.privateKey,
    master.publicKey,
    device.privateKey,
    device.publicKey,
  );

  const signature = await signDevicePublicKey(
    device.publicKey,
    master.privateKey,
  );

  return {
    master_public_key: encodeBase58(master.publicKey),

    device_public_key: encodeBase58(device.publicKey),

    signature: encodeBase58(signature),
  };
}
