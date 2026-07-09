use axum::{Json, http::StatusCode};

use crate::crypto::mnemonic::bip39::Bip39;

#[utoipa::path(
        get,
        path = "/api/register/mnemonic",
        responses(
            (status = 200, description = "Generate a new BIP39 mnemonic", body = Vec<String>),
            (status = 500, description = "Internal server error")
        )
    )]
pub async fn mnemonic() -> Result<Json<Vec<String>>, StatusCode> {
    Bip39::generate()
        .map(|m| Json(m.words().map(|v| v.to_string()).collect()))
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
}
