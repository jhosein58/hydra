import { ParticleNetwork } from "@/shared/components/particle-network";

import { Sidebar } from "./sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

export function MessengerLayout({ children }: Props) {
  return (
    <main className="relative h-screen overflow-hidden bg-[#09090B]">
      <ParticleNetwork />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 h-full p-4">
        <div className="flex h-full overflow-hidden rounded-3xl border border-white/10 bg-black/20">
          <Sidebar />

          <section className="flex min-w-0 flex-1 flex-col">{children}</section>
        </div>
      </div>
    </main>
  );
}
