import { api } from "@/shared/lib";
import { ChatWindow } from "@/widgets/chat-window";

export default async function Chat({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { data } = await api(`/user/${username}`);

  return (
    <>
      <ChatWindow username={data} />
    </>
  );
}
