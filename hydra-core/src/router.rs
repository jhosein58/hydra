use axum::{
    Router,
    http::{HeaderValue, Method},
    routing::get,
};

use tower_http::cors::CorsLayer;

use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::{auth::register::mnemonic, docs::ApiDoc};

pub fn router(origin: String) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(origin.parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers(tower_http::cors::Any);

    Router::new()
        .route("/api/register/mnemonic", get(mnemonic))
        .merge(SwaggerUi::new("/docs").url("/api-doc/openapi.json", ApiDoc::openapi()))
        .layer(cors)
}
