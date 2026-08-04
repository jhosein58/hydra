import { UserAvatar } from "./UserAvatar";
import { UserDisplayName } from "./UserDisplayName";
import { Username } from "./Username";
import { UserStatus } from "./UserStatus";

interface UserCardProps {
  title: string;
  name: string;
  id: string;
  status: "online" | "offline";
}

export function UserCard({ title, name, id, status }: UserCardProps) {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar value={title} />

      <div className="flex flex-col">
        <UserDisplayName value={name} />

        <Username value={id} />

        <UserStatus value={status} />
      </div>
    </div>
  );
}
