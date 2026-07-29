"use client";

import { socketService } from "@/shared/lib/websocket/socket-service";
import { Send } from "lucide-react";
import { useState } from "react";

export function ChatInput({ master_public_key }: any) {
  const [message, setMessage] = useState("");

  function sendMessage() {
    socketService.send({
      type: "SendMessage",
      data: {
        to: master_public_key,
        payload: {
          text: message,
        },
      },
    });
  }

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
