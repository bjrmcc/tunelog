import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { username: string } | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  if (!user || !profile) {
    return (
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <div
          className="flex flex-col items-center justify-center rounded-lg border py-24 text-center"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Sign in to view your profile.
          </p>
        </div>
      </main>
    );
  }

  const stats = [
    { label: "Listens", value: "0" },
    { label: "Albums", value: "0" },
    { label: "Lists", value: "0" },
  ];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
      {/* Profile header */}
      <div className="mb-8 flex items-center gap-4">
        <div
          className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-xl font-semibold"
          style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
        >
          {profile.username[0].toUpperCase()}
        </div>
        <div>
          <h1
            className="text-xl font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            {profile.username}
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {user.email}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="mb-8 grid grid-cols-3 divide-x rounded-lg"
        style={{
          background: "var(--muted)",
          borderColor: "var(--border)",
        }}
      >
        {stats.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center py-4 gap-0.5">
            <span
              className="text-xl font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {value}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Recent activity — placeholder */}
      <div>
        <h2
          className="mb-3 text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--muted-foreground)" }}
        >
          Recent activity
        </h2>
        <p
          className="text-center py-12 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          Nothing logged yet.
        </p>
      </div>
    </main>
  );
}
