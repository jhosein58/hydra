use figlet_rs::FIGlet;

use crate::{router::router, state::AppState};

pub struct HydraApplication {
    port: u16,
    origin: String,
}

impl HydraApplication {
    pub fn new(port: u16, origin: String) -> Self {
        Self { port, origin }
    }

    pub fn print_info(&self) -> &Self {
        // banner
        let standard_font = FIGlet::standard().unwrap();
        println!("{}", standard_font.convert("AHMENT").unwrap());

        // server info
        println!("Server listening on:  http://localhost:{}", self.port);
        println!("API documentation:    http://localhost:{}/docs", self.port);
        println!("Allowed origin:       {}", self.origin);

        self
    }

    pub async fn serve(&self) {
        let state = AppState::new().await;

        let listener = tokio::net::TcpListener::bind(format!("127.0.0.1:{}", self.port))
            .await
            .unwrap();

        axum::serve(listener, router(self.origin.to_owned(), state))
            .await
            .unwrap();
    }
}
