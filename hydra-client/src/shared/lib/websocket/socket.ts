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

  get socket() {
    return this.#socket;
  }
}

export const socketService = new SocketService();
