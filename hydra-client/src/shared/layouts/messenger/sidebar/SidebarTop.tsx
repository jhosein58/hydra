export function SidebarTop() {
  return (
    <div className="flex h-20 items-center justify-between border-b border-border px-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Haydra
        </h1>

        <p className="mt-1 text-xs text-muted-foreground">Secure Messaging</p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />

        <span className="text-[11px] font-medium text-emerald-300">
          Connected
        </span>
      </div>
    </div>
  );
}
