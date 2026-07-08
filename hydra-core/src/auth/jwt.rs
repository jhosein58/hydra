use jsonwebtoken::{Algorithm, DecodingKey, EncodingKey, Header, Validation, decode, encode};
use serde::{Serialize, de::DeserializeOwned};

pub struct Jwt;

impl Jwt {
    pub fn encode<T: Serialize>(
        claims: &T,
        key: &str,
    ) -> Result<String, jsonwebtoken::errors::Error> {
        encode(
            &Header::default(),
            claims,
            &EncodingKey::from_secret(key.as_ref()),
        )
    }

    pub fn decode<T: DeserializeOwned>(
        token: String,
        key: &str,
    ) -> Result<jsonwebtoken::TokenData<T>, jsonwebtoken::errors::Error> {
        decode::<T>(
            &token,
            &DecodingKey::from_secret(key.as_ref()),
            &Validation::new(Algorithm::HS256),
        )
    }
}
