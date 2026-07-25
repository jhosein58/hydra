"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SocketService } from "./socket-service";
import { authenticate } from "./auth/authenticate";

const URL = "ws://localhost:8080/w";

type ConnectionStatus = "connecting" | "connected" | "closed" | "error";

const WebSocketContext = createContext<SocketService | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [ws, setWs] = useState<SocketService | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");

  useEffect(() => {
    const webSocket = new SocketService(URL, {
      onOpen: () => {
        authenticate();
        setStatus("connected");
      },
      onClose: () => setStatus("closed"),
      onError: () => setStatus("error"),
    });

    setWs(webSocket);

    return () => webSocket.disconnect();
  }, []);

  if (status === "connecting") {
    return <p>Connecting...</p>;
  }

  if (status === "error" || status === "closed") {
    throw new Error("WebSocket connection failed");
  }

  return <WebSocketContext value={ws}>{children}</WebSocketContext>;
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
