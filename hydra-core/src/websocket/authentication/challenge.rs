use std::time::Instant;

use crate::{
    auth::challenge::generate32,
    models::device::Device,
    state::AppState,
    websocket::{connection::ConnectionState, protocol::ServerMessage},
};

pub struct ChallengeHandler;

impl ChallengeHandler {
    pub async fn handle(
        app_state: &AppState,
        conn_state: &mut ConnectionState,
        device_public_key: String,
    ) -> Result<ServerMessage, &'static str> {
        if matches!(conn_state, ConnectionState::Authenticated { .. }) {
            return Err("Already authenticated");
        }

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

        let challenge = generate32();

        *conn_state = ConnectionState::WaitingForChallenge {
            device_public_key,
            challenge: challenge.clone(),
            created_at: Instant::now(),
        };

        Ok(ServerMessage::Challenge { challenge })
    }
}
