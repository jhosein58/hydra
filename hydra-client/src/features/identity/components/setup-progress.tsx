export function SetupProgress() {
  return (
    <div className="border-b border-border bg-secondary px-8 py-6">
      <div className="flex items-center gap-4">
        <div className="h-3 w-3 rounded-full bg-primary" />

        <div className="h-px flex-1 bg-border" />

        <div className="h-3 w-3 rounded-full bg-muted" />

        <div className="h-px flex-1 bg-border" />

        <div className="h-3 w-3 rounded-full bg-muted" />
      </div>

      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        <span>Generate</span>
        <span>Secure</span>
        <span>Complete</span>
      </div>
    </div>
  );
}
