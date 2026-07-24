mod app;
mod auth;
mod cli;
mod crypto;
mod docs;
mod identity;
mod models;
mod router;
mod state;
mod websocket;

#[cfg(test)]
mod tests;

use clap::Parser;
use cli::Cli;

use crate::app::HydraApplication;

#[tokio::main]
async fn main() {
    let cli = Cli::parse();

    HydraApplication::new(cli.port, cli.origin)
        .print_info()
        .serve()
        .await;
}
