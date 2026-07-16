use axum::{Json, extract::State, http::StatusCode};
use ed25519_dalek::{Signature, VerifyingKey, ed25519::signature::AsyncVerifier};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::{
    AppState,
    crypto::{encoding::base58::Base58, mnemonic::bip39::Bip39},
    models::{device::Device, user::User},
};

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

#[derive(Deserialize, ToSchema)]
pub struct RegisterRequest {
    pub master_public_key: String,
    pub device_public_key: String,
    pub signature: String,
}

#[derive(Serialize, ToSchema)]
pub struct RegisterResponse {
    pub success: bool,
    pub message: String,
}

#[utoipa::path(
    post,
    path = "/api/register",
    request_body(
        content = RegisterRequest,
        description = "Master public key, device public key, and the device key signature",
        content_type = "application/json"
    ),
    responses(
        (
            status = 201,
            description = "User registered successfully",
            body = RegisterResponse
        ),
        (
            status = 400,
            description = "Invalid public key, Base58 encoding, or signature",
            body = RegisterResponse
        ),
        (
            status = 409,
            description = "User already exists",
            body = RegisterResponse
        ),
        (
            status = 500,
            description = "Internal server error",
            body = RegisterResponse
        )
    ),
    tag = "Registration"
)]
pub async fn register(
    State(state): State<AppState>,
    Json(payload): Json<RegisterRequest>,
) -> Result<(StatusCode, Json<RegisterResponse>), (StatusCode, Json<RegisterResponse>)> {
    let master_bytes = decode_32(&payload.master_public_key)?;
    let device_bytes = decode_32(&payload.device_public_key)?;

    let signature_bytes = Base58::decode(&payload.signature)
        .map_err(|_| bad_request("Invalid signature encoding"))?;

    let master_public_key = VerifyingKey::from_bytes(&master_bytes)
        .map_err(|_| bad_request("Invalid master public key"))?;

    let signature =
        Signature::from_slice(&signature_bytes).map_err(|_| bad_request("Invalid signature"))?;

    master_public_key
        .verify_async(&device_bytes, &signature)
        .await
        .map_err(|_| bad_request("Device signature verification failed"))?;

    let result: Option<User> = state
        .db
        .select(("user", payload.master_public_key.clone()))
        .await
        .map_err(|err| {
            eprintln!("Database error: {err:#?}");
            internal_error()
        })?;

    let user_exists = result.is_some();

    if user_exists {
        return Err((
            StatusCode::CONFLICT,
            Json(RegisterResponse {
                success: false,
                message: "User already exists".into(),
            }),
        ));
    }

    let user: Option<User> = state
        .db
        .create(("user", payload.master_public_key.clone()))
        .content(User {
            id: None,
            username: None,
        })
        .await
        .map_err(|err| {
            eprintln!("Database error: {err:#?}");
            internal_error()
        })?;

    let unwraped_user = user.ok_or_else(internal_error)?;

    let _: Option<Device> = state
        .db
        .create(("device", payload.device_public_key.clone()))
        .content(Device {
            id: None,
            user: unwraped_user.id.unwrap(), // injaa ro ba'dan baaiad dorost konam
            trusted: true,
        })
        .await
        .map_err(|err| {
            eprintln!("Database error: {err:#?}");
            internal_error()
        })?;

    Ok((
        StatusCode::CREATED,
        Json(RegisterResponse {
            success: true,
            message: "User registered successfully".into(),
        }),
    ))
}

fn decode_32(value: &str) -> Result<[u8; 32], (StatusCode, Json<RegisterResponse>)> {
    let bytes = Base58::decode(value).map_err(|_| bad_request("Invalid Base58 encoding"))?;

    bytes
        .try_into()
        .map_err(|_| bad_request("Public key must be exactly 32 bytes"))
}

fn bad_request(message: &str) -> (StatusCode, Json<RegisterResponse>) {
    (
        StatusCode::BAD_REQUEST,
        Json(RegisterResponse {
            success: false,
            message: message.into(),
        }),
    )
}

fn internal_error() -> (StatusCode, Json<RegisterResponse>) {
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(RegisterResponse {
            success: false,
            message: "Internal server error".into(),
        }),
    )
}
