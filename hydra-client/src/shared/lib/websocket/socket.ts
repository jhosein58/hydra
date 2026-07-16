import { handleMessage } from "./handlers";
import { ServerMessage } from "./types";

import { getIdentityKeys } from "@/features/identity/storage/keys";

import { encodeBase58 } from "../crypto/base58";

class SocketService {
  #socket: WebSocket | null = null;

  connect(url: string) {
    if (this.#socket) return this.#socket;

    this.#socket = new WebSocket(url);

    this.#socket.onopen = () => {
      console.log("connected");

      this.authenticate();
    };

    this.#socket.onclose = () => {
      console.log("closed");
      this.#socket = null;
    };

    this.#socket.onerror = (error) => {
      console.log(error);
    };

    this.#socket.onmessage = (event) => {
      const message: ServerMessage = JSON.parse(event.data);

      handleMessage(message);
    };

    return this.#socket;
  }

  disconnect() {
    this.#socket?.close();
    this.#socket = null;
  }

  send(data: any) {
    if (!this.#socket) {
      console.log("socket not exists");
      return;
    }

    if (this.#socket.readyState !== WebSocket.OPEN) {
      console.log("socket not ready");
      return;
    }

    this.#socket.send(JSON.stringify(data));
  }

  async authenticate() {
    const identity = await getIdentityKeys();

    if (!identity) throw new Error("Identity not found");

    this.send({
      type: "Authenticate",
      data: {
        device_public_key: encodeBase58(identity.devicePublicKey),
      },
    });
  }

  checkAuthStatus() {
    this.send({
      type: "AuthStatus",
    });
  }

  get socket() {
    return this.#socket;
  }
}

export const socketService = new SocketService();
