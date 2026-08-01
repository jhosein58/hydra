import { socketService } from "@/shared/lib/websocket/socket-service";
import { useState } from "react";

export function useSendMessage(master_public_key: string) {
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

  return { message, setMessage, sendMessage };
}
