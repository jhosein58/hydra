import { SearchUser } from "./SearchUser.type";

export function SearchResults({ users }: { users: SearchUser[] }) {
  if (!users.length) {
    return <div className="p-4 text-sm text-zinc-500">No users found</div>;
  }

  return (
    <div className="space-y-2 p-4">
      {users.map((user) => (
        <div
          key={user.username}
          className="rounded-2xl border border-white/5 bg-white/5 p-4"
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}
