use serde::{Deserialize, Serialize};
use surrealdb::types::{RecordId, SurrealValue};

#[derive(Debug, SurrealValue, Serialize, Deserialize)]
pub struct User {
    pub id: Option<RecordId>,
    pub username: Option<String>,
}
