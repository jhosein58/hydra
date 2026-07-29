import { SearchUser } from "./SearchUser.type";
import Link from "next/link";

type Props = {
  users: SearchUser[];
  onSelect: () => void;
};

export function SearchResults({ users, onSelect }: Props) {
  if (!users.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground">No users found</div>
    );
  }

  return (
    <div className="space-y-2 p-4">
      {users.map((user) => (
        <Link
          key={user.username}
          className="rounded-2xl border border-border bg-card p-4 block"
          onClick={onSelect}
          href={`/messenger/${user.username}`}
        >
          {user.username}
        </Link>
      ))}
    </div>
  );
}
