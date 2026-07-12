use surrealdb::types::SurrealValue;

#[derive(Debug, SurrealValue)]
pub struct Device {
    pub user: String,
    pub public_key: String,
    pub trusted: bool,
}
