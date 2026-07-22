"use client";

import { useState } from "react";
import { useGenerateMnemonic } from "../hooks/useGenerateMnemonic";
import { useRegisterIdentity } from "../hooks/useRegisterIdentity";
import { registerIdentity } from "../services/register-Identity-service";
import { ContinueButton } from "./continue-button";
import { MnemonicGrid } from "./mnemonic-grid";
import { SecurityAlert } from "./security-alert";
import { SetupAgreement } from "./setup-agreement";
import { SetupProgress } from "./setup-progress";
import { SetupHeader } from "./setup-header";

export function SetupCard() {
  const { data: mnemonic = [], isPending } = useGenerateMnemonic();
  const [checked, setChecked] = useState(false);

  const registerMutation = useRegisterIdentity();

  const handleContinue = async () => {
    const identity = await registerIdentity(mnemonic);

    registerMutation.mutate(identity.payload);
  };

  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
      <SetupProgress />

      <div className="space-y-8 p-8 md:p-10">
        <SetupHeader />

        <MnemonicGrid mnemonic={mnemonic} />

        <SecurityAlert />

        <SetupAgreement checked={checked} onChange={setChecked} />

        <ContinueButton
          onClick={handleContinue}
          disabled={isPending || registerMutation.isPending || !checked}
        />
      </div>
    </div>
  );
}
