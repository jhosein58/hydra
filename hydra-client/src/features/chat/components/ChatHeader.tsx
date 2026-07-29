import { MoreVertical, Search } from "lucide-react";

export function ChatHeader({ name, username }: any) {
  return (
    <header className="flex shrink-0 h-20 items-center justify-between border-b border-white/10 px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7B3FFF]/20 text-sm font-semibold text-[#B794FF]">
          A
        </div>

        <div>
          <p className="text-sm font-medium text-white">{name}</p>

          <p className="text-xs text-zinc-500">@{username}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-xl p-2 text-zinc-400 hover:bg-white/10 hover:text-white">
          <Search size={18} />
        </button>

        <button className="rounded-xl p-2 text-zinc-400 hover:bg-white/10 hover:text-white">
          <MoreVertical size={18} />
        </button>
      </div>
    </header>
  );
}
