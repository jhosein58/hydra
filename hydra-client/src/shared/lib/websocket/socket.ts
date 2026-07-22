import { handleMessage } from "./auth/handlers";
import { ServerMessage } from "./auth/types";

class SocketService {
  #socket: WebSocket | null = null;

  connect(url: string, onOpen?: () => void) {
    if (this.#socket) return this.#socket;

    this.#socket = new WebSocket(url);

    this.#socket.onopen = () => {
      console.log("on open");

      onOpen?.();
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

  get socket() {
    return this.#socket;
  }
}

export const socketService = new SocketService();
