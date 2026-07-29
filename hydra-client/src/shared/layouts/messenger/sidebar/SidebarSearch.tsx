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
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <input
        placeholder="Search users by ID..."
        className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
