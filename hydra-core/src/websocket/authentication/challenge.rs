use std::time::Instant;

use crate::{
    AppState,
    auth::challenge::generate32,
    models::device::Device,
    websocket::{authentication::challenge, connection::ConnectionState, protocol::ServerMessage},
};

pub struct ChallengeHandler;

impl ChallengeHandler {
    pub async fn handle(
        app_state: &AppState,
        conn_state: &mut ConnectionState,
        device_public_key: String,
    ) -> Result<ServerMessage, &'static str> {
        let device: Option<Device> = app_state
            .db
            .select(("device", device_public_key.clone()))
            .await
            .map_err(|_| "Database error")?;

        let Some(device) = device else {
            return Err("This device is not exist.");
        };

        if !device.trusted {
            return Err("Device is not trusted.");
        }

        let challenge_str = challenge::generate32();

        let created_at = Instant::now();

        *conn_state = ConnectionState::WaitingForChallenge {
            device_public_key,
            challenge: challenge_str.clone(),
            created_at,
        };

        Ok(ServerMessage::Challenge {
            challenge: challenge_str,
        })
    }
}
