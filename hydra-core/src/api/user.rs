use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use surrealdb::types::SurrealValue;

use crate::state::AppState;

#[derive(Debug, Deserialize, SurrealValue)]
struct PublicUserRow {
    name: Option<String>,
    bio: Option<String>,
    username: Option<String>,
    master_public_key: String,
}

#[derive(Debug, Serialize)]
pub struct PublicUser {
    pub name: Option<String>,
    pub bio: Option<String>,
    pub username: Option<String>,
    pub master_public_key: String,
    pub online: bool,
}

fn error(status: StatusCode, message: &str) -> Response {
    (status, Json(json!({ "error": message }))).into_response()
}

pub async fn get_by_username(
    State(state): State<AppState>,
    Path(username): Path<String>,
) -> Response {
    let username = username.trim().to_lowercase();

    if username.is_empty() {
        return error(StatusCode::BAD_REQUEST, "username is required");
    }

    if username.chars().count() > 64 {
        return error(StatusCode::BAD_REQUEST, "username is too long");
    }

    let mut response = match state
        .db
        .query(
            r#"
            SELECT
                name,
                bio,
                username,
                record::id(id) AS master_public_key
            FROM user
            WHERE username = $username
            LIMIT 1;
            "#,
        )
        .bind(("username", username))
        .await
    {
        Ok(response) => response,
        Err(err) => {
            eprintln!("failed to fetch user: {err:#?}");
            return error(StatusCode::INTERNAL_SERVER_ERROR, "failed to fetch user");
        }
    };

    let rows: Vec<PublicUserRow> = match response.take(0) {
        Ok(rows) => rows,
        Err(err) => {
            eprintln!("failed to parse user: {err:#?}");
            return error(StatusCode::INTERNAL_SERVER_ERROR, "failed to parse user");
        }
    };

    let Some(row) = rows.into_iter().next() else {
        return error(StatusCode::NOT_FOUND, "user not found");
    };

    let online = state.connections.is_online(&row.master_public_key).await;

    Json(PublicUser {
        name: row.name,
        bio: row.bio,
        username: row.username,
        master_public_key: row.master_public_key,
        online,
    })
    .into_response()
}
