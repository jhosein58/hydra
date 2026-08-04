"use client";

import { useState } from "react";
import { useIdentityFlow } from "../model/useIdentityFlow";
import { ContinueButton } from "./ContinueButton";
import { MnemonicGrid } from "./MnemonicGrid";
import { SecurityAlert } from "./SecurityAlert";
import { SetupAgreement } from "./SetupAgreement";
import { SetupBanner } from "./SetupBanner";
import { SetupHeader } from "./SetupHeader";

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
