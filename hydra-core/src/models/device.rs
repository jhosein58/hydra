use serde::{Deserialize, Serialize};
use surrealdb::types::{RecordId, SurrealValue};

#[derive(Debug, SurrealValue, Serialize, Deserialize)]
pub struct Device {
    pub id: Option<RecordId>,
    pub user: RecordId,
    pub trusted: bool,
}
