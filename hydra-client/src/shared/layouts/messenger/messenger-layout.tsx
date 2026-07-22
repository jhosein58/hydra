"use client";

import { ReactNode, useEffect } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { ParticleNetwork } from "@/shared/components/particle-network";
import { socketService } from "@/shared/lib/websocket/socket";
import { authenticate } from "@/shared/lib/websocket/auth/authenticate";

interface Props {
  children: ReactNode;
}

export function MessengerLayout({ children }: Props) {
  useEffect(() => {
    socketService.connect("http://localhost:8080/ws", authenticate);

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <div className="relative h-dvh overflow-hidden">
      <ParticleNetwork />

      <div className="relative z-10 flex h-full">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
