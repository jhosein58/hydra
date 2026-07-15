use axum::extract::ws::{Message, WebSocket};

use crate::{
    AppState,
    websocket::protocol::{ClientMessage, ServerMessage},
};

pub async fn handle(mut socket: WebSocket, state: AppState) {
    while let Some(result) = socket.recv().await {
        let message = match result {
            Ok(message) => message,
            Err(error) => {
                eprintln!("WebSocket error: {error}");
                break;
            }
        };

        match message {
            Message::Text(text) => {
                handle_text(&mut socket, &state, &text).await;
            }

            Message::Close(_) => {
                break;
            }

            _ => {}
        }
    }
}

async fn handle_text(socket: &mut WebSocket, _state: &AppState, text: &str) {
    let message: ClientMessage = match serde_json::from_str(text) {
        Ok(message) => message,

        Err(_) => {
            send(
                socket,
                ServerMessage::Error {
                    message: "Invalid message".into(),
                },
            )
            .await;

            return;
        }
    };

    match message {
        ClientMessage::Ping => {
            send(socket, ServerMessage::Pong).await;
        }
    }
}

async fn send(socket: &mut WebSocket, message: ServerMessage) {
    let json = serde_json::to_string(&message).unwrap();

    let _ = socket.send(Message::Text(json.into())).await;
}
