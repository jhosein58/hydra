interface UserAvatarProps {
  value: string;
}

export function UserAvatar({ value }: UserAvatarProps) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary-hover">
      {value}
    </div>
  );
}
