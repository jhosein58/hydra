use std::time::Duration;

use futures_util::{SinkExt, StreamExt};
use serde_json::Value;
use tokio::net::TcpStream;
use tokio_tungstenite::{MaybeTlsStream, WebSocketStream, connect_async, tungstenite::Message};

use crate::{router::router, state::AppState};

pub struct TestServer {
    addr: String,
    client: reqwest::Client,
}

impl TestServer {
    pub async fn spawn() -> Self {
        let state = AppState::new().await;
        let app = router("http://localhost:3000".into(), state);

        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let addr = listener.local_addr().unwrap().to_string();

        tokio::spawn(async move {
            axum::serve(listener, app).await.unwrap();
        });

        Self {
            addr,
            client: reqwest::Client::new(),
        }
    }

    pub async fn get(&self, path: &str) -> (u16, Value) {
        let response = self
            .client
            .get(format!("http://{}{}", self.addr, path))
            .send()
            .await
            .unwrap();

        let status = response.status().as_u16();
        let body = response.json().await.unwrap();

        (status, body)
    }

    pub async fn post(&self, path: &str, body: Value) -> (u16, Value) {
        let response = self
            .client
            .post(format!("http://{}{}", self.addr, path))
            .json(&body)
            .send()
            .await
            .unwrap();

        let status = response.status().as_u16();
        let body = response.json().await.unwrap();

        (status, body)
    }

    pub async fn ws(&self) -> WsClient {
        let (stream, _) = connect_async(format!("ws://{}/ws", self.addr))
            .await
            .unwrap();

        WsClient { stream }
    }
}

pub struct WsClient {
    stream: WebSocketStream<MaybeTlsStream<TcpStream>>,
}

impl WsClient {
    pub async fn send(&mut self, message: Value) {
        self.stream
            .send(Message::Text(message.to_string().into()))
            .await
            .unwrap();
    }

    pub async fn recv(&mut self) -> Value {
        loop {
            let message = tokio::time::timeout(Duration::from_secs(5), self.stream.next())
                .await
                .expect("timed out waiting for server message")
                .expect("connection closed")
                .unwrap();

            if let Message::Text(text) = message {
                return serde_json::from_str(&text).unwrap();
            }
        }
    }

    pub async fn send_recv(&mut self, message: Value) -> Value {
        self.send(message).await;
        self.recv().await
    }

    pub async fn close(mut self) {
        let _ = self.stream.close(None).await;
    }
}
