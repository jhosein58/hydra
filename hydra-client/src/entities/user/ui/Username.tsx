interface UsernameProps {
  value: string;
  withAt?: boolean;
}

export function Username({ value, withAt = true }: UsernameProps) {
  return (
    <span className="text-xs text-muted-foreground">
      {withAt && "@"} {value}
    </span>
  );
}
