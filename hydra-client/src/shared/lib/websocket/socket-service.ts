import EventEmitter from "events";

export type WSMessage = {
  type: string;
  data?: object;
};

class SocketService {
  #socket: WebSocket | null = null;
  #emitter = new EventEmitter();

  isConnected(): boolean {
    return this.#socket !== null && this.#socket.readyState === WebSocket.OPEN;
  }

  connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected()) return resolve();

      this.#socket = new WebSocket(url);

      this.#socket.onopen = () => {
        resolve();
      };

      this.#socket.onerror = (e) => {
        reject(e);
      };

      this.#socket.onclose = () => {
        this.#socket = null;
      };

      this.#socket.onmessage = (event) => {
        const message: WSMessage = JSON.parse(event.data);
        this.#emitter.emit(message.type, message.data);
      };
    });
  }

  disconnect() {
    this.#socket?.close();
    this.#socket = null;
  }

  on(event: string, callback: (data: any) => void) {
    this.#emitter.on(event, callback);

    return () => this.off(event, callback);
  }

  off(event: string, callback: (data: any) => void) {
    this.#emitter.off(event, callback);
  }

  send(message: WSMessage) {
    if (this.#socket?.readyState === WebSocket.OPEN) {
      this.#socket.send(JSON.stringify(message));
    }
  }

  get socket() {
    return this.#socket;
  }
}

export const socketService = new SocketService();
