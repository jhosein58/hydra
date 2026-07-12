import { generateMasterKeyPair } from "../crypto/master";
import { generateDeviceKeyPair } from "../crypto/device";
import { signDevicePublicKey } from "../crypto/sign";
import { encodeBase58 } from "../crypto/base58";

export async function createIdentity(mnemonic: string[]) {
  const master = await generateMasterKeyPair(mnemonic);

  const device = generateDeviceKeyPair();

  const signature = await signDevicePublicKey(
    device.publicKey,
    master.privateKey
  );

  return {
    master,

    device,

    payload: {
      masterPublicKey: encodeBase58(master.publicKey),

      devicePublicKey: encodeBase58(device.publicKey),

      signature: encodeBase58(signature),
    },
  };
}