interface UserDisplayNameProps {
  value: string;
}

export function UserDisplayName({ value }: UserDisplayNameProps) {
  return <span className="text-sm font-medium text-foreground">{value}</span>;
}
