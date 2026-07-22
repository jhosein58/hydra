export function SetupHeader() {
  return (
    <div className="space-y-2">
      <span className="text-4xl">🔐</span>

      <h1 className="text-4xl font-bold tracking-tight">
        Create your identity
      </h1>

      <p className="max-w-xl text-muted-foreground">
        Your recovery phrase is the only way to restore your identity.
        Keep it somewhere safe.
      </p>
    </div>
  );
}