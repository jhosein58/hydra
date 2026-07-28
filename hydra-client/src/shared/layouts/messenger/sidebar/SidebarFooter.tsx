"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import { SettingsPopover } from "./SettingsPopover";

export function SidebarFooter() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="p-4">
      {open && <SettingsPopover />}

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7B3FFF]/20 text-sm font-semibold text-[#B794FF]">
            F
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Flatrov</span>

            <span className="text-xs text-zinc-500">@flatrov</span>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-[11px] text-emerald-300">Online</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <Settings size={18} />
        </button>
      </div>
    </footer>
  );
}
