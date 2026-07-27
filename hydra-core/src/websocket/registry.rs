use std::{
    collections::{HashMap, HashSet},
    sync::Arc,
};
use tokio::sync::{RwLock, mpsc};

use crate::websocket::protocol::ServerMessage;

#[derive(Clone)]
pub struct Outbound {
    tx: mpsc::Sender<ServerMessage>,
}

impl Outbound {
    pub fn new(tx: mpsc::Sender<ServerMessage>) -> Self {
        Self { tx }
    }

    pub async fn send(&self, message: ServerMessage) -> bool {
        self.tx.send(message).await.is_ok()
    }

    pub fn try_send(&self, message: ServerMessage) -> bool {
        self.tx.try_send(message).is_ok()
    }
}

#[derive(Clone, Default)]
pub struct Connections {
    inner: Arc<RwLock<Inner>>,
}

#[derive(Default)]
struct Inner {
    devices: HashMap<String, Outbound>,
    users: HashMap<String, HashSet<String>>,
}

impl Connections {
    pub async fn register(
        &self,
        master_public_key: &str,
        device_public_key: &str,
        outbound: Outbound,
    ) -> Option<Outbound> {
        let mut inner = self.inner.write().await;

        let previous = inner
            .devices
            .insert(device_public_key.to_string(), outbound);

        inner
            .users
            .entry(master_public_key.to_string())
            .or_default()
            .insert(device_public_key.to_string());

        previous
    }

    pub async fn unregister(&self, master_public_key: &str, device_public_key: &str) {
        let mut inner = self.inner.write().await;

        inner.devices.remove(device_public_key);

        if let Some(devices) = inner.users.get_mut(master_public_key) {
            devices.remove(device_public_key);

            if devices.is_empty() {
                inner.users.remove(master_public_key);
            }
        }
    }

    pub async fn send_to_device(&self, device_public_key: &str, message: ServerMessage) -> bool {
        let outbound = {
            let inner = self.inner.read().await;
            inner.devices.get(device_public_key).cloned()
        };

        match outbound {
            Some(outbound) => outbound.send(message).await,
            None => false,
        }
    }

    pub async fn send_to_user(&self, master_public_key: &str, message: ServerMessage) -> usize {
        let targets = {
            let inner = self.inner.read().await;

            inner
                .users
                .get(master_public_key)
                .map(|devices| {
                    devices
                        .iter()
                        .filter_map(|device| inner.devices.get(device).cloned())
                        .collect::<Vec<_>>()
                })
                .unwrap_or_default()
        };

        let mut delivered = 0;

        for outbound in targets {
            if outbound.send(message.clone()).await {
                delivered += 1;
            }
        }

        delivered
    }

    pub async fn is_online(&self, master_public_key: &str) -> bool {
        self.inner
            .read()
            .await
            .users
            .contains_key(master_public_key)
    }

    pub async fn online_count(&self) -> usize {
        self.inner.read().await.devices.len()
    }
}
