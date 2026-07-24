use serde_json::json;

use crate::tests::common::TestServer;

#[tokio::test]
async fn ping_returns_pong() {
    let server = TestServer::spawn().await;
    let mut ws = server.ws().await;

    let response = ws.send_recv(json!({ "type": "Ping" })).await;

    ws.close().await;

    assert_eq!(response["type"], "Pong");
}
