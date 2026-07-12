export interface KeyPair {
  privateKey: Uint8Array;
  publicKey: Uint8Array;
}

export interface EncodedKeyPair {
  privateKey: string;
  publicKey: string;
}
