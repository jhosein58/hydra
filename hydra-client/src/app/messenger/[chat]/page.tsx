import { ChatHeader } from "@/features/chat/components/ChatHeader";
import { ChatInput } from "@/features/chat/components/ChatInput";
import { ChatMessages } from "@/features/chat/components/ChatMessages";

export default async function Chat({
  params,
}: {
  params: Promise<{ chat: string }>;
}) {
  const { chat } = await params;

  console.log(chat);

  return (
    <>
      <ChatHeader />

      <ChatMessages />

      <ChatInput />
    </>
  );
}
