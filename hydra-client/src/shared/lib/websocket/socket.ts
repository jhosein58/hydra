import { handleMessage } from "./handlers";
import { ServerMessage } from "./types";

class SocketService {
  #socket: WebSocket | null = null;

  connect(url: string) {
    if (this.#socket) return this.#socket;

    this.#socket = new WebSocket(url);

    this.#socket.onopen = () => {
      console.log("connected");
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
    if (this.#socket?.readyState === WebSocket.OPEN)
      this.#socket.send(JSON.stringify(data));
  }

  authenticate() {}

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
