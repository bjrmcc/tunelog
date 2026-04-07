"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/diary", label: "Diary" },
  { href: "/albums", label: "Albums" },
  { href: "/lists", label: "Lists" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--background)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            tunelog
          </Link>
          <nav className="flex items-center gap-1">
            {links.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="rounded px-3 py-1.5 text-sm transition-colors"
                  style={{
                    color: active
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                    background: active ? "var(--muted)" : "transparent",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded px-3 py-1.5 text-sm transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
