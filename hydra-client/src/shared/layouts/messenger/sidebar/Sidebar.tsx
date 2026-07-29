import { SidebarContent } from "./SidebarContent";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarTop } from "./SidebarTop";

export function Sidebar() {
  return (
    <aside className="flex w-90 shrink-0 flex-col border-r border-border bg-overlay backdrop-blur-xs">
      <SidebarTop />

      <SidebarContent />

      <SidebarFooter />
    </aside>
  );
}
