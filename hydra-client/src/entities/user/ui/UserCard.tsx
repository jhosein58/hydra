import { UserAvatar } from "./UserAvatar";
import { UserId } from "./UserId";
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
      <UserAvatar title={title} />

      <div className="flex flex-col">
        <Username name={name} />

        <UserId id={id} />

        <UserStatus status={status} />
      </div>
    </div>
  );
}
