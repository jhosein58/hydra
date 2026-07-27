use surrealdb::{Surreal, engine::local::Mem};

use crate::websocket::registry::Connections;

#[derive(Clone)]
pub struct AppState {
    pub db: Surreal<surrealdb::engine::local::Db>,
    pub connections: Connections,
}

impl AppState {
    pub async fn new() -> Self {
        let db = Surreal::new::<Mem>(()).await.unwrap();
        db.use_ns("main").use_db("main").await.unwrap();

        db.query(
            r#"
            DEFINE TABLE user SCHEMALESS;
            DEFINE TABLE device SCHEMALESS;

            DEFINE INDEX user_master_public_key
            ON TABLE user
            FIELDS master_public_key
            UNIQUE;
            "#,
        )
        .await
        .unwrap();

        Self {
            db,
            connections: Connections::default(),
        }
    }
}
