use crate::crypto::{encoding::base58::Base58Encoder, random::Rng};

pub struct UserIdGen;

impl UserIdGen {
    pub fn generate() -> Result<String, getrandom::Error> {
        let mut buf = [0u8; 16];
        Rng::fill(&mut buf)?;
        Ok(Base58Encoder::encode(&buf))
    }
}
