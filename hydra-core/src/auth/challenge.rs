use crate::crypto::{encoding::base58::Base58, random::Rng};

pub fn generate32() -> String {
    let mut buf = [0u8; 32];
    Rng::fill(&mut buf);
    Base58::encode(&buf)
}
