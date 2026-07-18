import Link from "next/link";

const links = [
  {
    href: "/chat",
    label: "Chats",
  },
  {
    href: "/contacts",
    label: "Contacts",
  },
  {
    href: "/profile",
    label: "Profile",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
      <div className="border-b border-border p-6">
        <h1 className="text-2xl font-bold">
          AhmadGram
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Secure Messenger
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl px-4 py-3 transition hover:bg-secondary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}