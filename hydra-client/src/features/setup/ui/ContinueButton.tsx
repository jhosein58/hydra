import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ContinueButton({ ...props }: Props) {
  return (
    <button
      className="
    h-14
    w-full
    rounded-xl
    bg-primary
    font-semibold
    text-primary-foreground
    cursor-pointer
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
