use crate::{
    state::AppState,
    websocket::{
        authentication::{
            auth_status::AuthStatusHandler, challenge::ChallengeHandler, ping::PingHandler,
            verify::VerifyHandler,
        },
        connection::{ConnectionState, send},
        protocol::{ClientMessage, ServerMessage},
        user::{get::GetProfileHandler, search::SearchUserHandler, update::UpdateUserHandler},
    },
};
use axum::extract::ws::WebSocket;

pub async fn routing(
    socket: &mut WebSocket,
    app_state: &AppState,
    conn_state: &mut ConnectionState,
    message: ClientMessage,
) {
    let response = match message {
        ClientMessage::Ping => PingHandler::handle(),

        ClientMessage::Authenticate { device_public_key } => {
            ChallengeHandler::handle(app_state, conn_state, device_public_key).await
        }

        ClientMessage::ChallengeResponse { signature } => {
            VerifyHandler::handle(conn_state, signature).await
        }

        ClientMessage::AuthStatus => AuthStatusHandler::handle(conn_state),

        ClientMessage::UpdateProfile {
            name,
            bio,
            username,
        } => UpdateUserHandler::handle(app_state, conn_state, name, bio, username).await,

        ClientMessage::GetProfile => GetProfileHandler::handle(app_state, conn_state).await,

        ClientMessage::SearchUsers { username } => {
            SearchUserHandler::handle(app_state, conn_state, &username).await
        }
    };

    match response {
        Ok(res) => send(socket, res).await,
        Err(e) => {
            send(
                socket,
                ServerMessage::Error {
                    message: e.to_string(),
                },
            )
            .await
        }
    }
}
