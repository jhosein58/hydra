export function MnemonicGrid({ mnemonic }: any) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {mnemonic?.map(function (item: string, index: number) {
        return (
          <div
            key={index}
            className="rounded-2xl border border-border bg-background p-4 transition hover:border-primary"
          >
            <span className="text-xs text-muted-foreground">{index + 1}</span>

            <p className="mt-2 font-semibold tracking-wide">{item}</p>
          </div>
        );
      })}
    </div>
  );
}
