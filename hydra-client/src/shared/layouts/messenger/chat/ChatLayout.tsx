import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

const selectedChat = true;

export function ChatLayout() {
  if (!selectedChat) {
    return null;
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <ChatHeader />

      <ChatMessages />

      <ChatInput />
    </section>
  );
}
