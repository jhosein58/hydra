"use client";

import { User, Shield, Monitor, LogOut } from "lucide-react";
import Link from "next/link";

export function SettingsPopover() {
  return (
    <div className="absolute bottom-16 right-4 z-40 w-56 rounded-2xl border border-white/10 bg-black backdrop-blur-xl p-2 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
      <Link href="/messenger/profile" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white">
        <User size={17} />
        Profile
      </Link>

      <Link href="#" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white">
        <Monitor size={17} />
        Devices
      </Link>

      <Link href="#" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white">
        <Shield size={17} />
        Security
      </Link>

      <div className="my-2 h-px bg-white/10" />

      <Link href="#" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10">
        <LogOut size={17} />
        Logout
      </Link>
    </div>
  );
}
