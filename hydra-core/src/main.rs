mod auth;
mod cli;
mod crypto;
mod docs;
mod identity;
mod models;
mod router;
mod websocket;

use figlet_rs::FIGlet;

use clap::Parser;
use cli::Cli;
use surrealdb::{Surreal, engine::local::Mem};

#[derive(Clone)]
pub struct AppState {
    pub db: Surreal<surrealdb::engine::local::Db>,
}

#[tokio::main]
async fn main() {
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
