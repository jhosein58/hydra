interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SetupAgreement({
  checked,
  onChange,
}: Props) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-5 accent-primary"
      />

      <span className="text-sm">
        I have written these words down.
      </span>
    </label>
  );
}