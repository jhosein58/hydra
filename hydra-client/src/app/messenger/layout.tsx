import { ReactNode } from "react";

import { MessengerLayout } from "../../widgets/messenger-layout/ui/messenger-layout";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <MessengerLayout>{children}</MessengerLayout>;
}
