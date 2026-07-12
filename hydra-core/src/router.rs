use axum::{
    Router,
    http::{HeaderValue, Method},
    routing::{get, post},
};

use tower_http::cors::CorsLayer;

use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::{
    AppState,
    auth::register::{mnemonic, register},
    docs::ApiDoc,
};

pub fn router(origin: String, state: AppState) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(origin.parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers(tower_http::cors::Any);

    Router::new()
        .route("/api/register/mnemonic", get(mnemonic))
        .route("/api/register", post(register))
        .merge(SwaggerUi::new("/docs").url("/api-doc/openapi.json", ApiDoc::openapi()))
        .layer(cors)
        .with_state(state)
}
