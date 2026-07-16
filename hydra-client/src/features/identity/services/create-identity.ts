import { generateMasterKeyPair } from "../crypto/master";
import { generateDeviceKeyPair } from "../crypto/device";
import { signDevicePublicKey } from "../crypto/sign";
import { encodeBase58 } from "../../../shared/lib/crypto/base58";
import { saveIdentityKeys } from "../storage/keys";

export async function createIdentity(mnemonic: string[]) {
  const master = await generateMasterKeyPair(mnemonic);

  const device = generateDeviceKeyPair();

  await saveIdentityKeys(master.privateKey,master.publicKey, device.privateKey, device.publicKey);

  const signature = await signDevicePublicKey(
    device.publicKey,
    master.privateKey,
  );

  return {
    master,

    device,

    payload: {
      master_public_key: encodeBase58(master.publicKey),

      device_public_key: encodeBase58(device.publicKey),

      signature: encodeBase58(signature),
    },
  };
}
