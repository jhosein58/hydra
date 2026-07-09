use crate::crypto::{encoding::base58::_Base58Encoder, random::Rng};

pub struct _UserIdGen;

impl _UserIdGen {
    pub fn _generate() -> Result<String, getrandom::Error> {
        let mut buf = [0u8; 16];
        Rng::fill(&mut buf)?;
        Ok(_Base58Encoder::_encode(&buf))
    }
}
