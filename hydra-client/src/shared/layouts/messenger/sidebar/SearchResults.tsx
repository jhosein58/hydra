import { SearchUser } from "./SearchUser.type";

export function SearchResults({ users }: { users: SearchUser[] }) {
  if (!users.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground">No users found</div>
    );
  }

  return (
    <div className="space-y-2 p-4">
      {users.map((user) => (
        <div
          key={user.username}
          className="rounded-2xl border border-border bg-card p-4"
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}
