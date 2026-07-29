"use client";

import { User, Shield, Monitor, LogOut } from "lucide-react";
import Link from "next/link";

export function SettingsPopover() {
  return (
    <div className="absolute bottom-16 right-4 z-40 w-56 animate-in rounded-2xl border border-border bg-background p-2 shadow-2xl backdrop-blur-xl fade-in slide-in-from-bottom-2">
      <Link
        href="/messenger/profile"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
      >
        <User size={17} />
        Profile
      </Link>

      <Link
        href="#"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
      >
        <Monitor size={17} />
        Devices
      </Link>

      <Link
        href="#"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
      >
        <Shield size={17} />
        Security
      </Link>

      <div className="my-2 h-px bg-border" />

      <Link
        href="#"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
      >
        <LogOut size={17} />
        Logout
      </Link>
    </div>
  );
}
