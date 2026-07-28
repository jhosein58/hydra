use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Serialize, Clone)]
pub struct UserSearchResult {
    pub username: String,
    pub master_public_key: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct PresenceEntry {
    pub master_public_key: String,
    pub online: bool,
    pub devices: usize,
}

#[derive(Debug, Deserialize)]
#[serde(tag = "type", content = "data")]
pub enum ClientMessage {
    Ping,
    Authenticate {
        device_public_key: String,
    },
    ChallengeResponse {
        signature: String,
    },
    AuthStatus,
    UpdateProfile {
        name: Option<String>,
        bio: Option<String>,
        username: Option<String>,
    },
    GetProfile,
    SearchUsers {
        username: String,
    },
    SendMessage {
        to: String,
        payload: Value,
    },

    GetPresence {
        users: Vec<String>,
    },
}

#[derive(Debug, Serialize, Clone)]
#[serde(tag = "type", content = "data")]
pub enum ServerMessage {
    Pong,
    Challenge {
        challenge: String,
    },
    Authenticated,
    Error {
        message: String,
    },
    AuthStatus {
        authenticated: bool,
    },
    ProfileUpdated,
    Profile {
        name: Option<String>,
        bio: Option<String>,
        username: Option<String>,
    },
    Users {
        users: Vec<UserSearchResult>,
    },
    MessageSent {
        to: String,
        delivered: usize,
    },
    Message {
        from: String,
        payload: Value,
    },
    Presence {
        users: Vec<PresenceEntry>,
    },
}
