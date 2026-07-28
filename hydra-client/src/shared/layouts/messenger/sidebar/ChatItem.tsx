type Props = {
  name: string;
  message: string;
  time: string;
  unread: number;
};

export function ChatItem({ name, message, time, unread }: Props) {
  return (
    <button className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-white/5">
      {/* Avatar */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7B3FFF]/20 text-sm font-semibold text-[#B794FF]">
        {name[0]}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">{name}</span>

          <span className="text-xs text-zinc-500">{time}</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <p className="truncate text-xs text-zinc-500">{message}</p>

          {unread > 0 && (
            <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7B3FFF] px-1.5 text-[11px] font-medium text-white">
              {unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
