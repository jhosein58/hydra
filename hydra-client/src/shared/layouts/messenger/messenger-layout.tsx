import { ReactNode } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface Props {
  children: ReactNode;
}

export function MessengerLayout({ children }: Props) {
  return (
    <div className="flex h-dvh bg-background text-foreground">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}