import { SendMessageInput } from "@/features/send-message";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";

interface ChatWindowProps {
  username: string;
}

export function ChatWindow({ username }: ChatWindowProps) {
  return (
    <>
      <ChatHeader />
      <ChatMessages />
      <SendMessageInput />
    </>
  );
}
