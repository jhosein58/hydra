import { ParticleNetwork } from "@/shared/ui";
import { Sidebar } from "@/widgets/messenger-sidebar";
import { ReactNode } from "react";


export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="relative h-screen overflow-hidden bg-background">
      <ParticleNetwork />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 h-full p-4">
        <div className="flex h-full overflow-hidden rounded-3xl border border-border bg-overlay">
          <Sidebar />

          <section className="flex min-w-0 flex-1 flex-col">{children}</section>
        </div>
      </div>
    </main>
  );
}
