export function SecurityAlert() {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5">
      <h3 className="font-semibold">Keep this phrase offline</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        Anyone with these words can access your account.
      </p>
    </div>
  );
}

