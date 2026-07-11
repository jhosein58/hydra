"use client"

import { ContinueButton } from "./continueButton";
import { MnemonicGrid } from "./mnemonicGrid";
import { SecurityAlert } from "./securityAlert";
import { SetupProgress } from "./setupProgress";

export function SetupCard() {
  async function generateIdentity() {
    
  }

  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
      <SetupProgress />

      <div className="space-y-8 p-8 md:p-10">
        <div className="space-y-2">
          <span className="text-4xl">🔐</span>

          <h1 className="text-4xl font-bold tracking-tight">
            Create your identity
          </h1>

          <p className="max-w-xl text-muted-foreground">
            Your recovery phrase is the only way to restore your identity. Keep
            it somewhere safe.
          </p>
        </div>

        <MnemonicGrid />

        <SecurityAlert />

        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" className="size-5 accent-primary" />

          <span className="text-sm">I have written these words down.</span>
        </label>

        <ContinueButton onClick={generateIdentity} />
      </div>
    </div>
  );
}
