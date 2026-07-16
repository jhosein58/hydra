pub struct Base58;

impl Base58 {
    pub fn encode(bytes: &[u8]) -> String {
        bs58::encode(bytes).into_string()
    }

    pub fn decode(str: &str) -> Result<Vec<u8>, ()> {
        bs58::decode(str).into_vec().map_err(|_| ())
    }
}
