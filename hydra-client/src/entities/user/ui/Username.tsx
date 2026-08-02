interface UsernameProps {
  name: string;
}

export function Username({ name }: UsernameProps) {
  return <span className="text-sm font-medium text-foreground">{name}</span>;
}
