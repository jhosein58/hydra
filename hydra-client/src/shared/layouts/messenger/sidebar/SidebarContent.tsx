import { RecentChats } from "./RecentChats";
import { SidebarSearch } from "./SidebarSearch";

type Props = {
  searching?: boolean;
};

export function SidebarContent({ searching = false }: Props) {
  return (
    <>
    <div
    className="p-4">

      <SidebarSearch />
    </div>

      <div className="flex-1 overflow-hidden">
        {searching ? (
          <div className="p-4 text-sm text-zinc-500">Search Results</div>
        ) : (
          <RecentChats />
        )}
      </div>
    </>
  );
}
