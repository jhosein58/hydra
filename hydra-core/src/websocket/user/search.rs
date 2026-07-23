use crate::{
    AppState,
    websocket::{
        connection::ConnectionState,
        protocol::{ServerMessage, UserSearchResult},
    },
};

use serde::Deserialize;
use surrealdb::types::SurrealValue;

pub struct SearchUserHandler;

#[derive(Debug, Deserialize, SurrealValue)]
struct SearchUserRow {
    username: String,
    master_public_key: String,
}

impl SearchUserHandler {
    pub async fn handle(
        app_state: &AppState,
        conn_state: &mut ConnectionState,
        username: &str,
    ) -> Result<ServerMessage, &'static str> {
        
        let ConnectionState::Authenticated { .. } = conn_state else {
            return Err("unauthenticated");
        };

        let username = username.trim().to_lowercase();

        if username.is_empty() {
            return Ok(ServerMessage::Users { users: Vec::new() });
        }

        if username.chars().count() > 64 {
            return Err("search query is too long");
        }

        let mut response = app_state
            .db
            .query(
                r#"
                SELECT
                    username,
                    record::id(id) AS master_public_key
                FROM user
                WHERE username != NONE
                  AND username CONTAINS $username
                ORDER BY username ASC
                LIMIT 20;
                "#,
            )
            .bind(("username", username))
            .await
            .map_err(|error| {
                eprintln!("failed to search users: {error:#?}");
                "failed to search users"
            })?;

        let rows: Vec<SearchUserRow> = response.take(0).map_err(|error| {
            eprintln!("failed to parse searched users: {error:#?}");
            "failed to parse users"
        })?;

        let users = rows
            .into_iter()
            .map(|row| UserSearchResult {
                username: row.username,
                master_public_key: row.master_public_key,
            })
            .collect();

        Ok(ServerMessage::Users { users })
    }
}
