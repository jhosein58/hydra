import { ed25519 } from "@noble/curves/ed25519.js";

export function signDevicePublicKey(
  devicePublicKey: Uint8Array,
  masterPrivateKey: Uint8Array
) {
  return ed25519.sign(devicePublicKey, masterPrivateKey);
}