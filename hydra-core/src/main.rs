pub mod auth;
pub mod crypto;
pub mod identity;

use axum::{Router, routing::get};
use serde::{Deserialize, Serialize};

use crate::auth::jwt::Jwt;

#[derive(Serialize, Deserialize)]
struct Claims {
    name: String,
}

#[tokio::main]
async fn main() {
    let my_claims = Claims {
        name: "AHMADI".to_string(),
    };

    println!("{}", Jwt::encode(&my_claims, "test").unwrap());

    let app = Router::new().route("/", get(|| async { "Hello, World!" }));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3400").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
