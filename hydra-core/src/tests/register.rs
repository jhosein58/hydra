use serde_json::json;

use crate::tests::common::TestServer;

#[tokio::test]
async fn mnemonic_returns_word_list() {
    let server = TestServer::spawn().await;

    let (status, body) = server.get("/api/register/mnemonic").await;

    assert_eq!(status, 200);
    assert!(!body.as_array().unwrap().is_empty());
}

#[tokio::test]
async fn register_rejects_invalid_signature() {
    let server = TestServer::spawn().await;

    let (status, body) = server
        .post(
            "/api/register",
            json!({
                "master_public_key": "invalid",
                "device_public_key": "invalid",
                "signature": "invalid"
            }),
        )
        .await;

    assert_eq!(status, 400);
    assert_eq!(body["success"], false);
}
