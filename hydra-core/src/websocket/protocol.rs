use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
pub struct UserSearchResult {
    pub username: String,
    pub master_public_key: String,
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
}

#[derive(Debug, Serialize)]
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
}
