use crate::{
    AppState,
    models::{device::Device, user::User},
    websocket::{connection::ConnectionState, protocol::ServerMessage},
};

pub struct GetProfileHandler;

impl GetProfileHandler {
    pub async fn handle(
        app_state: &AppState,
        conn_state: &mut ConnectionState,
    ) -> Result<ServerMessage, &'static str> {
        let ConnectionState::Authenticated { device_public_key } = conn_state else {
            return Err("Not authenticated");
        };

        let dev: Option<Device> = app_state
            .db
            .select(("device", device_public_key.to_owned()))
            .await
            .map_err(|_| "Failed to get device")?;

        let dev = dev.ok_or("Device not found")?;

        let user: Option<User> = app_state
            .db
            .select(dev.user)
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
