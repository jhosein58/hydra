use crate::crypto::{encryption::Base58Encoder, random::RNG};

pub struct UserIdGen;

impl UserIdGen {
    pub fn generate() -> Result<String, getrandom::Error> {
        let mut buf = [0u8; 16];
        RNG::fill(&mut buf)?;
        Ok(Base58Encoder::encode(&buf))
    }
}
