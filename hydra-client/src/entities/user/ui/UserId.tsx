interface UserIdProps {
  id: string;
}

export function UserId({ id }: UserIdProps) {
  return <span className="text-xs text-muted-foreground">@{id}</span>;
}
