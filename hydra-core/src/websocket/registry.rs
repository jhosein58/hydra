use std::{
    collections::{HashMap, HashSet},
    sync::{
        Arc,
        atomic::{AtomicU64, Ordering},
    },
};
use tokio::sync::{RwLock, mpsc};

use crate::websocket::protocol::ServerMessage;

static NEXT_SESSION_ID: AtomicU64 = AtomicU64::new(1);

#[derive(Clone)]
pub struct Outbound {
    id: u64,
    tx: mpsc::Sender<ServerMessage>,
}

impl Outbound {
    pub fn new(tx: mpsc::Sender<ServerMessage>) -> Self {
        Self {
            id: NEXT_SESSION_ID.fetch_add(1, Ordering::Relaxed),
            tx,
        }
    }

    pub fn id(&self) -> u64 {
        self.id
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

    pub async fn unregister(
        &self,
        master_public_key: &str,
        device_public_key: &str,
        session_id: u64,
    ) {
        let mut inner = self.inner.write().await;

        match inner.devices.get(device_public_key) {
            Some(current) if current.id != session_id => return,
            Some(_) => {
                inner.devices.remove(device_public_key);
            }
            None => {}
        }

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
            Some(outbound) => outbound.try_send(message),
            None => false,
        }
    }

    pub async fn send_to_user(&self, master_public_key: &str, message: ServerMessage) -> usize {
        self.send_to_user_except(master_public_key, None, message)
            .await
    }

    pub async fn send_to_user_except(
        &self,
        master_public_key: &str,
        except: Option<u64>,
        message: ServerMessage,
    ) -> usize {
        let targets = {
            let inner = self.inner.read().await;

            inner
                .users
                .get(master_public_key)
                .map(|devices| {
                    devices
                        .iter()
                        .filter_map(|device| inner.devices.get(device))
                        .filter(|outbound| Some(outbound.id) != except)
                        .cloned()
                        .collect::<Vec<_>>()
                })
                .unwrap_or_default()
        };

        targets
            .into_iter()
            .filter(|outbound| outbound.try_send(message.clone()))
            .count()
    }

    pub async fn is_online(&self, master_public_key: &str) -> bool {
        self.inner
            .read()
            .await
            .users
            .contains_key(master_public_key)
    }

    pub async fn device_count(&self, master_public_key: &str) -> usize {
        self.inner
            .read()
            .await
            .users
            .get(master_public_key)
            .map_or(0, |devices| devices.len())
    }

    pub async fn presence_of(&self, master_public_keys: &[String]) -> Vec<(String, usize)> {
        let inner = self.inner.read().await;

        master_public_keys
            .iter()
            .map(|key| {
                let count = inner.users.get(key).map_or(0, |devices| devices.len());
                (key.clone(), count)
            })
            .collect()
    }

    pub async fn online_count(&self) -> usize {
        self.inner.read().await.devices.len()
    }
}
