import { Search } from "lucide-react";

type Props = {
  query: string;
  setQuery: (value: string) => void;
};

export function SidebarSearch({ query, setQuery }: Props) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        placeholder="Search users by ID..."
        className="h-12 w-full rounded-2xl border border-white/10 bg-white/8 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-200 focus:border-[#7B3FFF]/60 focus:bg-white/10 focus:ring-4 focus:ring-[#7B3FFF]/10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
