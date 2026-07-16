use crate::websocket::{connection::ConnectionState, protocol::ServerMessage};

pub struct AuthStatusHandler;

impl AuthStatusHandler {
    pub fn handle(conn_status: &ConnectionState) -> Result<ServerMessage, &'static str> {
        let is_login = if let ConnectionState::Authenticated {
            device_public_key: _,
        } = conn_status
        {
            true
        } else {
            false
        };

        Ok(ServerMessage::AuthStatus {
            authenticated: is_login,
        })
    }
}
