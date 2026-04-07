"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth/actions";

type NavUser = { id: string; username: string | null } | null;

const tabs = [
  {
    href: "/diary",
    label: "Diary",
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="4" x2="9" y2="9" />
        <line x1="15" y1="4" x2="15" y2="9" />
      </svg>
    ),
  },
  {
    href: "/albums",
    label: "Albums",
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "/lists",
    label: "Lists",
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line
          x1="3"
          y1="6"
          x2="3.01"
          y2="6"
          strokeWidth={active ? 3 : 1.75}
        />
        <line
          x1="3"
          y1="12"
          x2="3.01"
          y2="12"
          strokeWidth={active ? 3 : 1.75}
        />
        <line
          x1="3"
          y1="18"
          x2="3.01"
          y2="18"
          strokeWidth={active ? 3 : 1.75}
        />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

const AUTH_PAGES = ["/login", "/signup"];

export default function Nav({ user }: { user: NavUser }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAuthPage = AUTH_PAGES.includes(pathname);
  const showTabBar = !isHome && !isAuthPage;

  return (
    <>
      {/* Top header */}
      <header
        className="sticky top-0 z-50"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--background)",
        }}
      >
        <div className="mx-auto flex h-12 max-w-2xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            tunelog
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {user.username ?? "account"}
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded px-3 py-1.5 text-sm transition-opacity hover:opacity-70"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Link
                href="/login"
                className="rounded px-3 py-1.5 text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded px-3 py-1.5 text-sm font-medium"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Bottom tab bar */}
      {showTabBar && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{
            background: "var(--background)",
            borderTop: "1px solid var(--border)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="mx-auto flex max-w-2xl">
            {tabs.map(({ href, label, icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-1 flex-col items-center justify-center gap-0.5 py-3"
                  style={{
                    color: active
                      ? "var(--accent)"
                      : "var(--muted-foreground)",
                  }}
                >
                  {icon(active)}
                  <span className="text-[10px] font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
