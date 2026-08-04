import { SendMessageInput } from "@/features/send-message";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";

export function ChatWindow() {
  return (
    <>
      <ChatHeader />
      <ChatMessages />
      <SendMessageInput />
    </>
  );
}
