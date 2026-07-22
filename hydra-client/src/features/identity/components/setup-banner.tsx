import { ShieldCheck } from "lucide-react";

export function SetupBanner() {
  return (
    <div className="border-b border-border bg-secondary/40 px-8 py-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="size-5 text-primary" />
        </div>

        <div>
          <h2 className="font-semibold">
            Identity Setup
          </h2>

          <p className="text-sm text-muted-foreground">
            Your recovery phrase is generated locally and never leaves your
            device.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge text="Recovery Phrase" />
        <Badge text="Local Generation" />
        <Badge text="End-to-End Encryption" />
      </div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
      {text}
    </span>
  );
}