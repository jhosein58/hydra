import React from "react";

type Props = React.HTMLAttributes<HTMLButtonElement>;

export function ContinueButton({ children, ...props }: Props) {
  return (
    <button
      className="
    h-14
    w-full
    rounded-xl
    bg-primary
    font-semibold
    text-primary-foreground
    transition
    hover:opacity-90
    disabled:cursor-not-allowed
    disabled:opacity-50
"
      {...props}
    >
      Continue →
    </button>
  );
}
