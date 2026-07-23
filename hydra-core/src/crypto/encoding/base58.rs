pub struct Base58;

impl Base58 {
    pub fn encode(bytes: &[u8]) -> String {
        bs58::encode(bytes).into_string()
    }

    pub fn decode(str: &str) -> Result<Vec<u8>, ()> {
        bs58::decode(str).into_vec().map_err(|_| ())
    }

    pub fn decode_bytes<const N: usize>(str: &str) -> Result<[u8; N], ()> {
        Self::decode(str)
            .map_err(|_| ())?
            .try_into()
            .map_err(|_| ())
    }
}
