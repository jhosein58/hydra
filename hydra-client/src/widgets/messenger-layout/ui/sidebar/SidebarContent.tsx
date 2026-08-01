"use client";
import { RecentChats } from "./RecentChats";
import {
  SearchInput,
  SearchResults,
  useUserSearch,
} from "@/features/search-user";

export function SidebarContent() {
  const { query, setQuery, users, isSearching, clearSearch } = useUserSearch();

  return (
    <>
      <div className="p-4">
        <SearchInput {...{ query, setQuery }} />
      </div>

      <div className="flex-1 overflow-hidden">
        {isSearching ? (
          <SearchResults users={users} onSelect={clearSearch} />
        ) : (
          <RecentChats />
        )}
      </div>
    </>
  );
}
