import * as bip39 from "bip39";
import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";

const bip32 = BIP32Factory(ecc);

export async function generateMasterKeys(mnemonic: string[]) {
  const phrase = mnemonic.join(" ");
  const seed = await bip39.mnemonicToSeed(phrase);
  const root = bip32.fromSeed(seed);
  
}
