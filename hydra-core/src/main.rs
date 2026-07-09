pub mod auth;
pub mod crypto;
pub mod identity;

use axum::{Router, routing::get};
use figlet_rs::FIGlet;

#[tokio::main]
async fn main() {
    let standard_font = FIGlet::standard().unwrap();
    println!("{}", standard_font.convert("AHMENT").unwrap());

    let app = Router::new().route("/", get(|| async { "Hello, World!" }));

    let listener = tokio::net::TcpListener::bind("localhost:3000")
        .await
        .unwrap();

    println!("   Server started at: http://localhost:3000");
    axum::serve(listener, app).await.unwrap();
}
