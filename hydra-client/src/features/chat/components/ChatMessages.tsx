import { MessageBubble } from "./MessageBubble";
import { CustomScrollArea } from "@/shared/components/CustomScrollArea";

const messages = [
  {
    id: 1,
    message: "Hey, welcome to Haydra",
    time: "12:30",
    isMine: false,
  },
  {
    id: 2,
    message: "Nice UI 🔥",
    time: "12:31",
    isMine: true,
  },
];

export function ChatMessages() {
  return (
    <CustomScrollArea>
      <main className="flex-1 px-6 py-6">
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} {...message} />
          ))}
        </div>
      </main>
    </CustomScrollArea>
  );
}
