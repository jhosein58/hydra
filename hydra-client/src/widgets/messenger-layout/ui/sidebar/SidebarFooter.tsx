"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import { SettingsPopover } from "./SettingsPopover";
import { UserCard } from "@/entities/user";

export function SidebarFooter() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="p-4">
      {open && <SettingsPopover />}

      <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 backdrop-blur-md">
        <UserCard title="f" name="flatrov" id="flatrov" status="online" />

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
