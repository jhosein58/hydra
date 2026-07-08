use bip39::Mnemonic;

use crate::crypto::random::Rng;

pub struct Bip39;

impl Bip39 {
    pub fn generate() -> Result<Mnemonic, ()> {
        let mut entropy = [0u8; 16];
        Rng::fill(&mut entropy).map_err(|_| ())?;
        Mnemonic::from_entropy_in(bip39::Language::English, &entropy).map_err(|_| ())
    }
}
