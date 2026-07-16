use crate::{
    AppState,
    websocket::protocol::{ClientMessage, ServerMessage},
};

pub trait SocketHandler {
    async fn handle(state: &AppState, msg: ClientMessage) -> Result<ServerMessage, &str>;
}
