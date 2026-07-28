use serde_json::Value;

use crate::{
    state::AppState,
    websocket::{connection::ConnectionState, protocol::ServerMessage},
};

const MAX_PAYLOAD_BYTES: usize = 64 * 1024;

pub struct SendMessageHandler;

impl SendMessageHandler {
    pub async fn handle(
        app_state: &AppState,
        conn_state: &ConnectionState,
        session_id: u64,
        to: String,
        payload: Value,
    ) -> Result<ServerMessage, &'static str> {
        let ConnectionState::Authenticated {
            master_public_key, ..
        } = conn_state
        else {
            return Err("unauthenticated");
        };

        let to = to.trim().to_string();

        if to.is_empty() {
            return Err("recipient is required");
        }

        if payload.is_null() {
            return Err("payload is required");
        }

        if serde_json::to_vec(&payload).map_or(true, |bytes| bytes.len() > MAX_PAYLOAD_BYTES) {
            return Err("payload is too large");
        }

        let delivered = app_state
            .connections
            .send_to_user_except(
                &to,
                Some(session_id),
                ServerMessage::Message {
                    from: master_public_key.clone(),
                    payload,
                },
            )
            .await;

        Ok(ServerMessage::MessageSent { to, delivered })
    }
}
