use axum::extract::ws::WebSocket;

use crate::{
    AppState,
    websocket::{
        connection::send,
        handlers::{interface::SocketHandler, ping::PingHandler},
        protocol::{ClientMessage, ServerMessage},
    },
};

pub async fn routing(socket: &mut WebSocket, state: &AppState, message: ClientMessage) {
    let response = match message {
        ClientMessage::Ping => PingHandler::handle(state, message).await,
    };

    match response {
        Ok(res) => send(socket, res).await,
        Err(e) => {
            send(
                socket,
                ServerMessage::Error {
                    message: e.to_string(),
                },
            )
            .await
        }
    }
}
