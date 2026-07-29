"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import { SettingsPopover } from "./SettingsPopover";

export function SidebarFooter() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="p-4">
      {open && <SettingsPopover />}

      <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary-hover">
            F
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Flatrov</span>

            <span className="text-xs text-muted-foreground">@flatrov</span>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-[11px] text-emerald-300">Online</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-xl p-2 text-muted-foreground transition hover:bg-card hover:text-foreground"
        >
          <Settings size={18} />
        </button>
      </div>
    </footer>
  );
}
