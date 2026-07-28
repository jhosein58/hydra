use crate::{
    state::AppState,
    websocket::{
        connection::ConnectionState,
        protocol::{PresenceEntry, ServerMessage},
    },
};

const MAX_USERS_PER_QUERY: usize = 100;

pub struct PresenceHandler;

impl PresenceHandler {
    pub async fn handle(
        app_state: &AppState,
        conn_state: &ConnectionState,
        users: Vec<String>,
    ) -> Result<ServerMessage, &'static str> {
        if !matches!(conn_state, ConnectionState::Authenticated { .. }) {
            return Err("unauthenticated");
        }

        let mut keys: Vec<String> = users
            .into_iter()
            .map(|user| user.trim().to_string())
            .filter(|user| !user.is_empty())
            .collect();

        keys.sort();
        keys.dedup();

        if keys.is_empty() {
            return Err("users is required");
        }

        if keys.len() > MAX_USERS_PER_QUERY {
            return Err("too many users requested");
        }

        let users = app_state
            .connections
            .presence_of(&keys)
            .await
            .into_iter()
            .map(|(master_public_key, devices)| PresenceEntry {
                master_public_key,
                online: devices > 0,
                devices,
            })
            .collect();

        Ok(ServerMessage::Presence { users })
    }
}
