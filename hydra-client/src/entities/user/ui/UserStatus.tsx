interface UserStatusProps {
  value: string;
}

export function UserStatus({ value }: UserStatusProps) {
  return (
    <div className="mt-1 flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-emerald-400" />

      <span className="text-[11px] text-emerald-300">{value}</span>
    </div>
  );
}
