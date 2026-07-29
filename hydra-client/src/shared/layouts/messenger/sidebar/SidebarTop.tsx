import { SidebarSearch } from "./SidebarSearch";

export function SidebarTop() {
  return (
    <div className="border-b border-white/10 p-6 h-20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Haydra
          </h1>

          <p className="mt-1 text-xs text-zinc-500">Secure Messaging</p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <span className="text-[11px] font-medium text-emerald-300">
            Connected
          </span>
        </div>
      </div>
    </div>
  );
}
