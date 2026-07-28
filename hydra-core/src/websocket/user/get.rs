use crate::{
    models::user::User,
    state::AppState,
    websocket::{connection::ConnectionState, protocol::ServerMessage},
};

pub struct GetProfileHandler;

impl GetProfileHandler {
    pub async fn handle(
        app_state: &AppState,
        conn_state: &mut ConnectionState,
    ) -> Result<ServerMessage, &'static str> {
        let ConnectionState::Authenticated {
            device_public_key: _,
            master_public_key,
        } = conn_state
        else {
            return Err("Not authenticated");
        };

        let user: Option<User> = app_state
            .db
            .select(("user", master_public_key.to_owned()))
            .await
            .map_err(|_| "Failed to get user")?;

        let user = user.ok_or("User not found")?;

        Ok(ServerMessage::Profile {
            name: user.name,
            bio: user.bio,
            username: user.username,
        })
    }
}
