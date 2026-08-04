import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { ed25519 } from "@noble/curves/ed25519.js";

import type { KeyPair } from "./types";
import { DERIVATION_PATH } from "./constants";

export async function generateMasterKeyPair(
  mnemonic: string[],
): Promise<KeyPair> {
  const phrase = mnemonic.join(" ");

  const seed = await bip39.mnemonicToSeed(phrase);

  const { key } = derivePath(
    DERIVATION_PATH,
    Buffer.from(seed).toString("hex"),
  );

  const publicKey = ed25519.getPublicKey(key);

  return {
    privateKey: key,
    publicKey,
  };
}
