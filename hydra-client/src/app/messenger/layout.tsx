import { ReactNode } from "react";

import { MessengerLayout } from "@/shared/layouts/messenger/messenger-layout";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <MessengerLayout>{children}</MessengerLayout>;
}