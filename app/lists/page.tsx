import { createClient } from "@/lib/supabase/server";

export default async function ListsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Lists
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            Your curated collections and rankings.
          </p>
        </div>
        {user && (
          <button
            className="rounded px-4 py-2 text-sm font-medium"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            + New list
          </button>
        )}
      </div>

      {user ? (
        <div className="flex flex-col gap-3">
          {/* Skeleton rows — will be replaced with real lists */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg p-4"
              style={{ background: "var(--muted)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <div
                    className="h-3.5 w-2/5 rounded"
                    style={{ background: "var(--border)" }}
                  />
                  <div
                    className="h-2.5 w-3/5 rounded"
                    style={{ background: "var(--border)" }}
                  />
                </div>
                <div
                  className="h-2.5 w-16 rounded"
                  style={{ background: "var(--border)" }}
                />
              </div>
            </div>
          ))}
          <p
            className="pt-4 text-center text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            No lists yet. Create your first collection or ranking.
          </p>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center rounded-lg border py-24 text-center"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Sign in to create lists.
          </p>
        </div>
      )}
    </main>
  );
}
