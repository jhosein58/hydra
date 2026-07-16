use axum::extract::ws::{Message, WebSocket};
use std::time::Instant;

use crate::{
    AppState,
    websocket::{
        protocol::{ClientMessage, ServerMessage},
        router::routing,
    },
};

pub enum ConnectionState {
    Unauthenticated,

    WaitingForChallenge {
        device_public_key: String,
        challenge: String,
        created_at: Instant,
    },

    Authenticated {
        device_public_key: String,
    },
}

pub async fn handle(mut socket: WebSocket, state: AppState) {
    let mut conn_state = ConnectionState::Unauthenticated;

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
                handle_text(&mut socket, &state, &mut conn_state, &text).await;
            }

            Message::Close(_) => {
                break;
            }

            _ => {}
        }
    }
}

async fn handle_text(
    socket: &mut WebSocket,
    state: &AppState,
    conn_state: &mut ConnectionState,
    text: &str,
) {
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

    routing(socket, state, conn_state, message).await
}

pub async fn send(socket: &mut WebSocket, message: ServerMessage) {
    let json = serde_json::to_string(&message).unwrap();

    let _ = socket.send(Message::Text(json.into())).await;
}
