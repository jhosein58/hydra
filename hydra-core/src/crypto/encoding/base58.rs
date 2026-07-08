pub struct Base58Encoder;

impl Base58Encoder {
    pub fn encode(bytes: &[u8]) -> String {
        bs58::encode(bytes).into_string()
    }
}
