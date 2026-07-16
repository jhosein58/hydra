use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
#[serde(tag = "type", content = "data")]
pub enum ClientMessage {
    Ping,
    Authenticate { device_public_key: String },
    ChallengeResponse { signature: String },
    AuthStatus,
}

#[derive(Debug, Serialize)]
#[serde(tag = "type", content = "data")]
pub enum ServerMessage {
    Pong,
    Challenge { challenge: String },
    Authenticated,
    Error { message: String },
    AuthStatus { authenticated: bool },
}
