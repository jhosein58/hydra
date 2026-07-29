import { ChatHeader } from "@/features/chat/components/ChatHeader";
import { ChatInput } from "@/features/chat/components/ChatInput";
import { ChatMessages } from "@/features/chat/components/ChatMessages";
import { api } from "@/shared/lib/axios/axios";

export default async function Chat({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { data } = await api(`/user/${username}`);

  console.log(data)

  return (
    <>
      <ChatHeader {...data} />
      <ChatMessages />
      <ChatInput {...data} />
    </>
  );
}
