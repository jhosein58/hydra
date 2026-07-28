import { SidebarContent } from "./SidebarContent";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarTop } from "./SidebarTop";

export function Sidebar() {
  return (
    <aside className="flex w-90 shrink-0 flex-col border-r border-white/10 bg-black/20 backdrop-blur-xs">
      <SidebarTop />

      <SidebarContent />

      <SidebarFooter />
    </aside>
  );
}
