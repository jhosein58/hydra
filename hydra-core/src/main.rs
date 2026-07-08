pub mod crypto;
pub mod identity;

use axum::{Router, routing::get};

use crate::identity::user_id::UserIdGen;

#[tokio::main]
async fn main() {
    // let app = Router::new().route("/", get(|| async { "Hello, World!" }));

    // let listener = tokio::net::TcpListener::bind("0.0.0.0:3400").await.unwrap();
    // axum::serve(listener, app).await.unwrap();

    println!("{}", UserIdGen::generate().unwrap());
}
