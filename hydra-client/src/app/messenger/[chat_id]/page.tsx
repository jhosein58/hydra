import { api } from "@/shared/lib";
import { ChatWindow } from "@/widgets/chat-window";

export default async function Chat({
  params,
}: {
  params: Promise<{ chat_id: string }>;
}) {
  const { chat_id } = await params;
  const { data } = await api(`/user/${chat_id}`);

  return (
    <>
      <ChatWindow />
    </>
  );
}
