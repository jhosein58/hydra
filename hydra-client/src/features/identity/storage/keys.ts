import { uint8ToBase64, base64ToUint8 } from "./encoder";

import { openIdentityDB, STORE_NAME } from "./db";

interface StoredKeys {
  masterPrivateKey: string;
  masterPublicKey: string;
  devicePrivateKey: string;
  devicePublicKey: string;
}

export async function savePrivateKeys(
  masterPrivateKey: Uint8Array,
  masterPublicKey: Uint8Array,
  devicePrivateKey: Uint8Array,
  devicePublicKey: Uint8Array,
) {
  const db = await openIdentityDB();

  const data: StoredKeys = {
    masterPrivateKey: uint8ToBase64(masterPrivateKey),
    masterPublicKey: uint8ToBase64(masterPublicKey),
    devicePrivateKey: uint8ToBase64(devicePrivateKey),
    devicePublicKey: uint8ToBase64(devicePublicKey),
  };

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");

    tx.objectStore(STORE_NAME).put(data, "identity-keys");

    tx.oncomplete = () => resolve();

    tx.onerror = () => reject(tx.error);
  });
}

export async function getPrivateKeys() {
  const db = await openIdentityDB();

  return new Promise<
    | {
        masterPrivateKey: Uint8Array;
        devicePrivateKey: Uint8Array;
      }
    | undefined
  >((resolve, reject) => {
    const request = db
      .transaction(STORE_NAME)
      .objectStore(STORE_NAME)
      .get("identity-keys");

    request.onsuccess = () => {
      const result = request.result;

      if (!result) {
        resolve(result ?? null);
        return;
      }

      resolve({
        masterPrivateKey: base64ToUint8(result.masterPrivateKey),

        devicePrivateKey: base64ToUint8(result.devicePrivateKey),
      });
    };

    request.onerror = () => reject(request.error);
  });
}
