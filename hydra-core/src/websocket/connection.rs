use axum::extract::ws::{Message, WebSocket};
use futures_util::{SinkExt, StreamExt};
use std::time::Instant;
use tokio::sync::mpsc;

use crate::{
    state::AppState,
    websocket::{
        protocol::{ClientMessage, ServerMessage},
        registry::Outbound,
        router::routing,
    },
};

const OUTBOUND_BUFFER: usize = 128;

pub enum ConnectionState {
    Unauthenticated,

    WaitingForChallenge {
        device_public_key: String,
        challenge: String,
        created_at: Instant,
    },

    Authenticated {
        master_public_key: String,
        device_public_key: String,
    },
}
pub async fn handle(socket: WebSocket, state: AppState) {
    let (mut sink, mut stream) = socket.split();
    let (tx, mut rx) = mpsc::channel::<ServerMessage>(OUTBOUND_BUFFER);
    let outbound = Outbound::new(tx);

    let writer = tokio::spawn(async move {
        while let Some(message) = rx.recv().await {
            let json = match serde_json::to_string(&message) {
                Ok(json) => json,
                Err(error) => {
                    eprintln!("Serialize error: {error}");
                    continue;
                }
            };

            if sink.send(Message::Text(json.into())).await.is_err() {
                break;
            }
        }
    });

    let mut conn_state = ConnectionState::Unauthenticated;

    while let Some(result) = stream.next().await {
        let message = match result {
            Ok(message) => message,
            Err(error) => {
                eprintln!("WebSocket error: {error}");
                break;
            }
        };

        match message {
            Message::Text(text) => {
                handle_text(&state, &mut conn_state, &outbound, &text).await;
            }

            Message::Close(_) => break,

            _ => {}
        }
    }

    if let ConnectionState::Authenticated {
        master_public_key,
        device_public_key,
    } = &conn_state
    {
        state
            .connections
            .unregister(master_public_key, device_public_key, outbound.id())
            .await;
    }

    drop(outbound);
    let _ = writer.await;
}

async fn handle_text(
    state: &AppState,
    conn_state: &mut ConnectionState,
    outbound: &Outbound,
    text: &str,
) {
    let message: ClientMessage = match serde_json::from_str(text) {
        Ok(message) => message,

        Err(_) => {
            outbound
                .send(ServerMessage::Error {
                    message: "Invalid message".into(),
                })
                .await;

            return;
        }
    };

    routing(state, conn_state, outbound, message).await
}
