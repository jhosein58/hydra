use ed25519_dalek::{Signature, VerifyingKey, ed25519::signature::AsyncVerifier};
use surrealdb::types::{RecordId, RecordIdKey};

use crate::{
    crypto::encoding::base58::Base58,
    models::{device::Device, user::User},
    state::AppState,
    websocket::{connection::ConnectionState, protocol::ServerMessage, registry::Outbound},
};

const CHALLENGE_TTL_SECS: u64 = 30;

fn key_as_string(id: &RecordId) -> Option<String> {
    match &id.key {
        RecordIdKey::String(value) => Some(value.clone()),
        _ => None,
    }
}

pub struct VerifyHandler;

impl VerifyHandler {
    pub async fn handle(
        app_state: &AppState,
        conn_state: &mut ConnectionState,
        outbound: &Outbound,
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

        if created_at.elapsed().as_secs() > CHALLENGE_TTL_SECS {
            *conn_state = ConnectionState::Unauthenticated;
            return Err("Its too late!");
        }

        let device_public_key = device_public_key.clone();

        let public_key_bytes: [u8; 32] = Base58::decode(&device_public_key)
            .map_err(|_| "Invalid device public key")?
            .try_into()
            .map_err(|_| "Invalid device public key length")?;

        let verifying_key =
            VerifyingKey::from_bytes(&public_key_bytes).map_err(|_| "Invalid device public key")?;

        let signature_bytes = Base58::decode(&signature).map_err(|_| "Invalid signature")?;
        let signature = Signature::from_slice(&signature_bytes).map_err(|_| "Invalid signature")?;

        let challenge: [u8; 32] = Base58::decode(challenge)
            .map_err(|_| "Invalid challenge")?
            .try_into()
            .map_err(|_| "Invalid challenge")?;

        verifying_key
            .verify_async(&challenge, &signature)
            .await
            .map_err(|_| "Invalid signature")?;

        let device: Device = app_state
            .db
            .select(("device", device_public_key.clone()))
            .await
            .map_err(|_| "Device not found")?
            .ok_or("Device not found")?;

        if !device.trusted {
            return Err("Device is not trusted.");
        }

        let user: User = app_state
            .db
            .select(device.user)
            .await
            .map_err(|_| "User not found")?
            .ok_or("User not found")?;

        let master_public_key =
            key_as_string(&user.id.ok_or("User not found")?).ok_or("Invalid user id")?;

        let previous = app_state
            .connections
            .register(&master_public_key, &device_public_key, outbound.clone())
            .await;

        if let Some(previous) = previous {
            previous.try_send(ServerMessage::Error {
                message: "session replaced by a new connection".into(),
            });
        }

        *conn_state = ConnectionState::Authenticated {
            master_public_key,
            device_public_key,
        };

        Ok(ServerMessage::Authenticated)
    }
}
