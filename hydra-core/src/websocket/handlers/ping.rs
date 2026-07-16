use crate::{
    AppState,
    websocket::{
        handlers::interface::SocketHandler,
        protocol::{ClientMessage, ServerMessage},
    },
};

pub struct PingHandler;

impl SocketHandler for PingHandler {
    async fn handle(_: &AppState, _: ClientMessage) -> Result<ServerMessage, &str> {
        Ok(ServerMessage::Pong)
    }
}
