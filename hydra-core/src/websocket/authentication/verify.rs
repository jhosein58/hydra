use ed25519_dalek::{Signature, VerifyingKey, ed25519::signature::AsyncVerifier};

use crate::{
    crypto::encoding::base58::Base58,
    websocket::{connection::ConnectionState, protocol::ServerMessage},
};

pub struct VerifyHandler;

impl VerifyHandler {
    pub async fn handle(
        conn_state: &mut ConnectionState,
        signature: String,
    ) -> Result<ServerMessage, &'static str> {
        let ConnectionState::WaitingForChallenge {
            device_public_key,
            challenge,
            created_at,
        } = conn_state
        else {
            return Err("I wasn't expecting a signature!");
        };

        if created_at.elapsed().as_secs() > 30 {
            return Err("Its too late!");
        }

        let public_key_bytes =
            Base58::decode(device_public_key).map_err(|_| "Invalid device public key")?;

        let public_key_bytes: [u8; 32] = public_key_bytes
            .try_into()
            .map_err(|_| "Invalid device public key length")?;

        let verifying_key =
            VerifyingKey::from_bytes(&public_key_bytes).map_err(|_| "Invalid device public key")?;

        let signature_bytes = Base58::decode(&signature).map_err(|_| "Invalid signature")?;

        let signature = Signature::from_slice(&signature_bytes).map_err(|_| "Invalid signature")?;

        let challenge: [u8; 32] = Base58::decode(&challenge)
            .map_err(|_| "Invalid challenge")?
            .try_into()
            .map_err(|_| "Invalid challenge")?;

        verifying_key
            .verify_async(&challenge, &signature)
            .await
            .map_err(|_| "Invalid signature")?;

        *conn_state = ConnectionState::Authenticated {
            device_public_key: device_public_key.to_owned(),
        };

        Ok(ServerMessage::Authenticated)
    }
}
