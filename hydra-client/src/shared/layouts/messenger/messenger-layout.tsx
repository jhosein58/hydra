import { ReactNode } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { ParticleNetwork } from "@/shared/components/particle-network";

interface Props {
  children: ReactNode;
}

export function MessengerLayout({ children }: Props) {
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
