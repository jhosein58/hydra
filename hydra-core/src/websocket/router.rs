use crate::{
    state::AppState,
    websocket::{
        authentication::{
            auth_status::AuthStatusHandler, challenge::ChallengeHandler, ping::PingHandler,
            verify::VerifyHandler,
        },
        connection::ConnectionState,
        message::send::SendMessageHandler,
        protocol::{ClientMessage, ServerMessage},
        registry::Outbound,
        user::{
            get::GetProfileHandler, presence::PresenceHandler, search::SearchUserHandler,
            update::UpdateUserHandler,
        },
    },
};

pub async fn routing(
    app_state: &AppState,
    conn_state: &mut ConnectionState,
    outbound: &Outbound,
    message: ClientMessage,
) {
    let response = match message {
        ClientMessage::Ping => PingHandler::handle(),

        ClientMessage::Authenticate { device_public_key } => {
            ChallengeHandler::handle(app_state, conn_state, device_public_key).await
        }

        ClientMessage::ChallengeResponse { signature } => {
            VerifyHandler::handle(app_state, conn_state, outbound, signature).await
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

        ClientMessage::SendMessage { to, payload } => {
            SendMessageHandler::handle(app_state, conn_state, outbound.id(), to, payload).await
        }

        ClientMessage::GetPresence { users } => {
            PresenceHandler::handle(app_state, conn_state, users).await
        }
    };

    match response {
        Ok(res) => {
            outbound.send(res).await;
        }
        Err(error) => {
            outbound
                .send(ServerMessage::Error {
                    message: error.to_string(),
                })
                .await;
        }
    }
}
