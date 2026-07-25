// import { handleMessage } from "./handlers";
import { ServerMessage } from "./auth/types";

type SocketServiceOptions = {
  onOpen?: () => void;
  onClose?: () => void;
  onError?: () => void;
};

export class SocketService {
  #socket: WebSocket;

  constructor(url: string, options?: SocketServiceOptions) {
    this.#socket = new WebSocket(url);

    this.#socket.onopen = () => {
      options?.onOpen?.();
    };

    this.#socket.onclose = () => {
      options?.onClose?.();
    };

    this.#socket.onerror = (error) => {
      options?.onError?.();
    };

    this.#socket.onmessage = (event) => {
      const message: ServerMessage = JSON.parse(event.data);

      console.log(message);

      // handleMessage(message);
    };
  }

  disconnect() {
    this.#socket?.close();
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
