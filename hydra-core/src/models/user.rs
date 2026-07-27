use serde::{Deserialize, Serialize};
use surrealdb::types::{RecordId, SurrealValue};

#[derive(Debug, SurrealValue, Serialize, Deserialize)]
pub struct User {
    pub id: Option<RecordId>,
    pub name: Option<String>,
    pub username: Option<String>,
    pub bio: Option<String>,
    pub conversations: Vec<(String, String, String)>, // (chat name, another public key, conversation id)
}

#[derive(Debug, SurrealValue, Serialize)]
pub struct UpdateUserFields {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub bio: Option<String>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub username: Option<String>,
}
