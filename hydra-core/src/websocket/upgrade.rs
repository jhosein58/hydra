use axum::{
    extract::{State, WebSocketUpgrade},
    response::Response,
};

use crate::{state::AppState, websocket::connection};

pub async fn upgrade(ws: WebSocketUpgrade, State(state): State<AppState>) -> Response {
    ws.on_upgrade(move |socket| connection::handle(socket, state))
}
