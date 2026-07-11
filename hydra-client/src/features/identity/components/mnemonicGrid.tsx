export function MnemonicGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map(function (_, index) {
        return (
          <div
            key={index}
            className="rounded-2xl border border-border bg-background p-4 transition hover:border-primary"
          >
            <span className="text-xs text-muted-foreground">{index + 1}</span>

            <p className="mt-2 font-semibold tracking-wide">zebra</p>
          </div>
        );
      })}
    </div>
  );
}
