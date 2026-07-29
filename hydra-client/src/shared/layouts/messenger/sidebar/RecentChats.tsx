import { CustomScrollArea } from "@/shared/components/CustomScrollArea";
import { ChatItem } from "./ChatItem";

const chats = [
  {
    id: 1,
    name: "Ali",
    message: "Hey, how are you?",
    time: "12:30",
    unread: 2,
  },
  {
    id: 2,
    name: "Sara",
    message: "See you tomorrow",
    time: "11:20",
    unread: 0,
  },
  {
    id: 3,
    name: "Reza",
    message: "Let's talk later",
    time: "09:45",
    unread: 5,
  },
  {
    id: 3,
    name: "Reza",
    message: "Let's talk later",
    time: "09:45",
    unread: 5,
  },
  {
    id: 3,
    name: "Reza",
    message: "Let's talk later",
    time: "09:45",
    unread: 5,
  },
  {
    id: 3,
    name: "Reza",
    message: "Let's talk later",
    time: "09:45",
    unread: 5,
  },
];

export function RecentChats() {
  return (
    <div className="h-full  py-4">
      <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
        Recent Chats
      </p>

      <CustomScrollArea>
        <div className="space-y-2 px-4">
          {chats.map((chat) => (
            <ChatItem key={chat.id} {...chat} />
          ))}
        </div>
      </CustomScrollArea>
    </div>
  );
}
