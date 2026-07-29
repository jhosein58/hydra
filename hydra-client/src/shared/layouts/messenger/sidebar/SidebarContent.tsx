"use client";

import { useEffect, useState } from "react";
import { RecentChats } from "./RecentChats";
import { SearchResults } from "./SearchResults";
import { SidebarSearch } from "./SidebarSearch";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { socketService } from "@/shared/lib/websocket/socket-service";
import { SearchUser } from "./SearchUser.type";
import { usePathname } from "next/navigation";

export function SidebarContent() {
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const pathname = usePathname();
  const isSearching = query.trim().length > 0;

  useEffect(() => {
    setQuery("");
    setUsers([]);
  }, [pathname]);

  useEffect(() => {
    const unsubscribe = socketService.on("Users", (data) => {
      setUsers(data.users);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      // error in future //
      setUsers([]);
      return;
    }

    socketService.send({
      type: "SearchUsers",
      data: { username: debouncedQuery },
    });
  }, [debouncedQuery]);

  return (
    <>
      <div className="p-4">
        <SidebarSearch {...{ query, setQuery }} />
      </div>

      <div className="flex-1 overflow-hidden">
        {isSearching ? (
          <SearchResults
            users={users}
            onSelect={() => {
              setQuery("");
              setUsers([]);
            }}
          />
        ) : (
          <RecentChats />
        )}
      </div>
    </>
  );
}
