mod auth;
mod cli;
mod crypto;
mod docs;
mod identity;
mod models;
mod router;

use ed25519_dalek::{Signer, SigningKey};
use figlet_rs::FIGlet;

use clap::Parser;
use cli::Cli;
use serde_json::json;
use surrealdb::{Surreal, engine::local::Mem};

#[derive(Clone)]
pub struct AppState {
    pub db: Surreal<surrealdb::engine::local::Db>,
}

fn generate_key() -> SigningKey {
    let mut bytes = [0u8; 32];
    getrandom::fill(&mut bytes).unwrap();

    SigningKey::from_bytes(&bytes)
}

#[tokio::main]
async fn main() {
    let master_private_key = generate_key();
    let master_public_key = master_private_key.verifying_key();

    let device_private_key = generate_key();
    let device_public_key = device_private_key.verifying_key();

    let signature = master_private_key.sign(device_public_key.as_bytes());

    let payload = json!({
        "master_public_key": bs58::encode(master_public_key.as_bytes()).into_string(),
        "device_public_key": bs58::encode(device_public_key.as_bytes()).into_string(),
        "signature": bs58::encode(signature.to_bytes()).into_string(),
    });

    println!("{}", serde_json::to_string_pretty(&payload).unwrap());

    // Initializing database
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

    let state = AppState { db };

    // Start Application
    let cli = Cli::parse();

    let standard_font = FIGlet::standard().unwrap();
    println!("{}", standard_font.convert("AHMENT").unwrap());

    let address = format!("127.0.0.1:{}", cli.port);

    let listener = tokio::net::TcpListener::bind(address).await.unwrap();
    println!("Server listening on:  http://localhost:{}", cli.port);
    println!("API documentation:    http://localhost:{}/docs", cli.port);
    println!("Allowed origin:       {}", cli.origin);
    axum::serve(listener, router::router(cli.origin, state))
        .await
        .unwrap();
}
