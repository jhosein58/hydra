import { SendMessageInput } from "@/features/send-message";
import { api } from "@/shared/lib";
import { ChatHeader, ChatMessages } from "@/widgets/chat";

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
