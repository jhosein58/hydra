use crate::{
    models::{
        device::Device,
        user::{UpdateUserFields, User},
    },
    state::AppState,
    websocket::{connection::ConnectionState, protocol::ServerMessage},
};

pub struct UpdateUserHandler;

impl UpdateUserHandler {
    pub async fn handle(
        app_state: &AppState,
        conn_state: &mut ConnectionState,
        name: Option<String>,
        bio: Option<String>,
        username: Option<String>,
    ) -> Result<ServerMessage, &'static str> {
        let ConnectionState::Authenticated { device_public_key } = conn_state else {
            return Err("unauthenticated");
        };

        let device: Option<Device> = app_state
            .db
            .select(("device", device_public_key.to_owned()))
            .await
            .map_err(|_| "failed to select device")?;

        let device = device.ok_or("device not found")?;

        let user_id = device.user;

        let username = username
            .map(|value| value.trim().to_lowercase())
            .filter(|value| !value.is_empty());

        if let Some(ref username) = username {
            let mut response = app_state
                .db
                .query(
                    r#"
                           SELECT id
                           FROM user
                           WHERE username = $username
                             AND id != $user_id
                           LIMIT 1;
                           "#,
                )
                .bind(("username", username.as_str()))
                .bind(("user_id", user_id.clone()))
                .await
                .map_err(|_| "failed to check username")?;

            let existing_users: Vec<User> = response
                .take(0)
                .map_err(|_| "failed to parse username check")?;

            if !existing_users.is_empty() {
                return Err("username already taken");
            }
        }

        let updated: Option<User> = app_state
            .db
            .update(user_id)
            .merge(UpdateUserFields {
                name,
                bio,
                username,
            })
            .await
            .map_err(|_| "failed to update user")?;

        let _updated = updated.ok_or("user not found")?;

        Ok(ServerMessage::ProfileUpdated)
    }
}
