use surrealdb::types::SurrealValue;

#[derive(Debug, SurrealValue)]
pub struct User {
    pub master_public_key: String,
}
