import { UserAvatar, Username } from "@/entities/user";

type Props = {
  name: string;
  message: string;
  time: string;
  unread: number;
};

export function ChatItem({ name, message, time, unread }: Props) {
  return (
    <button className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-card">
      {/* Avatar */}
      <UserAvatar title={name[0]} />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <Username name={name} />

          <span className="text-xs text-muted-foreground">{time}</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <p className="truncate text-xs text-muted-foreground">{message}</p>

          {unread > 0 && (
            <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-medium text-primary-foreground">
              {unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
