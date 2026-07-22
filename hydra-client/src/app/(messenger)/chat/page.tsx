"use client";
import { authenticate } from "@/shared/lib/websocket/auth/authenticate";
import { socketService } from "@/shared/lib/websocket/socket";
import { useEffect } from "react";

export default function Chat() {
  useEffect(() => {
    const a = socketService;
    a.connect("http://localhost:8080/ws", () => authenticate());
  }, []);
  return <></>;
}
