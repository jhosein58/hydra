mod auth;
mod cli;
mod crypto;
mod docs;
mod identity;
mod models;
mod router;
mod state;
mod websocket;

use figlet_rs::FIGlet;

use clap::Parser;
use cli::Cli;

use crate::state::AppState;

#[tokio::main]
async fn main() {
    let state = AppState::new().await;
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
