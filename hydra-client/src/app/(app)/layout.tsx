import { WebSocketProvider } from "@/shared/websocket/socket-provider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WebSocketProvider>{children}</WebSocketProvider>;
}
