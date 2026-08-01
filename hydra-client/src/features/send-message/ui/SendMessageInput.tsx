"use client";

import { Send } from "lucide-react";
import { useSendMessage } from "../model/useSendMessage";

export function SendMessageInput({ master_public_key }: any) {
  const { message, setMessage, sendMessage } =
    useSendMessage(master_public_key);

  return (
    <footer className="p-4">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <input
          placeholder="Write a message..."
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="rounded-xl bg-[#7B3FFF] p-2 text-white transition hover:bg-[#8B5CF6]"
        >
          <Send size={18} />
        </button>
      </div>
    </footer>
  );
}
