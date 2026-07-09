pub struct _Base58Encoder;

impl _Base58Encoder {
    pub fn _encode(bytes: &[u8]) -> String {
        bs58::encode(bytes).into_string()
    }
}
