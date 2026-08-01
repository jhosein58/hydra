import { socketService } from "@/shared/lib/websocket/socket-service";
import { useEffect, useState } from "react";
import { SearchUser } from "./searchUser.type";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePathname } from "next/navigation";

export function useUserSearch() {
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const pathname = usePathname();
  const isSearching = query.trim().length > 0;

  const clearSearch = () => {
    setQuery("");
    setUsers([]);
  };

  useEffect(() => {
    clearSearch();
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

  return { query, setQuery, users, isSearching, clearSearch };
}
