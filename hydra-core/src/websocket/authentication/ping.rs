use crate::websocket::protocol::ServerMessage;

pub struct PingHandler;

impl PingHandler {
    pub fn handle() -> Result<ServerMessage, &'static str> {
        Ok(ServerMessage::Pong)
    }
}
