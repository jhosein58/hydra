import { SendMessageInput } from "@/features/send-message";
import { api } from "@/shared/lib/axios/axios";
import { ChatHeader } from "@/widgets/chat/ui/ChatHeader";
import { ChatMessages } from "@/widgets/chat/ui/ChatMessages";

export default async function Chat({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { data } = await api(`/user/${username}`);

  console.log(data);

  return (
    <>
      <ChatHeader {...data} />
      <ChatMessages />
      <SendMessageInput {...data} />
    </>
  );
}
