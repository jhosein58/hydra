"use client";

import { useEffect, useState } from "react";
import { useIdentityFlow } from "../hooks/useIdentityFlow";
import { ContinueButton } from "./continue-button";
import { MnemonicGrid } from "./mnemonic-grid";
import { SecurityAlert } from "./security-alert";
import { SetupAgreement } from "./setup-agreement";
import { SetupBanner } from "./setup-banner";
import { SetupHeader } from "./setup-header";

export function SetupCard() {
  const [checked, setChecked] = useState(false)

  const {confirmMnemonicAndConnect, mnemonic} = useIdentityFlow();

  return (
    <div
      className="w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
    >
      <SetupBanner />

      <div className="space-y-8 p-8 md:p-10">
        <SetupHeader />

        <MnemonicGrid mnemonic={mnemonic} />

        <SecurityAlert />

        <SetupAgreement checked={checked} onChange={setChecked} />

        <ContinueButton
        onClick={confirmMnemonicAndConnect}
          disabled={!checked}
        />
      </div>
    </div>
  );
}
