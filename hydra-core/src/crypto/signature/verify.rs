use ed25519_dalek::{Signature, Verifier, VerifyingKey};

use crate::crypto::encoding::base58::Base58;

pub fn from_bytes(key: &[u8; 32], data: &[u8], sig: &[u8]) -> Result<(), &'static str> {
    let key = VerifyingKey::from_bytes(key).map_err(|_| "Invalid public key.")?;
    let sig = Signature::from_slice(sig).map_err(|_| "Invalid signature format or length.")?;

    key.verify(data, &sig)
        .map_err(|_| "Signature verification failed.")
}

pub fn from_bs58(key: &str, data: &str, sig: &str) -> Result<(), &'static str> {
    let key: [u8; 32] =
        Base58::decode_bytes(key).map_err(|_| "Invalid Base58-encoded public key.")?;
    let data = Base58::decode(data).map_err(|_| "Invalid Base58-encoded data.")?;
    let sig = Base58::decode(sig).map_err(|_| "Invalid Base58-encoded signature.")?;

    from_bytes(&key, &data, &sig)
}
