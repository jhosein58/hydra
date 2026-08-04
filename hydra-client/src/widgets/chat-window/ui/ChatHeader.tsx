import { UserAvatar, UserId, Username } from "@/entities/user";
import { MoreVertical, Search } from "lucide-react";

export function ChatHeader({ name, username }: any) {
  return (
    <header className="flex shrink-0 h-20 items-center justify-between border-b border-white/10 px-6">
      <div className="flex items-center gap-3">
        <UserAvatar title="A" />

        <div>
          <Username name="flatrov" />

          <UserId id="flatrov" />
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
