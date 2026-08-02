interface UserAvatarProps {
  title: string;
}

export function UserAvatar({ title }: UserAvatarProps) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary-hover">
      {title}
    </div>
  );
}
