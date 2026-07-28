import { RecentChats } from "./RecentChats";

type Props = {
    searching?: boolean;
};

export function SidebarContent({
    searching = false,
}: Props) {
    return (
        <div className="flex-1 overflow-hidden">
            {searching ? (
                <div className="p-4 text-sm text-zinc-500">
                    Search Results
                </div>
            ) : (
                <RecentChats />
            )}
        </div>
    );
}