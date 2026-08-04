import { ed25519 } from "@noble/curves/ed25519.js";

import type { KeyPair } from "./types";

export function generateDeviceKeyPair(): KeyPair {
  const privateKey = ed25519.utils.randomSecretKey();

  const publicKey = ed25519.getPublicKey(privateKey);

  return {
    privateKey,
    publicKey,
  };
}