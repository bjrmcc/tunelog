import { createClient } from "@/lib/supabase/server";

export default async function DiaryPage() {
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
            Diary
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            A record of everything you've listened to.
          </p>
        </div>
        {user && (
          <button
            className="rounded px-4 py-2 text-sm font-medium"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            + Log album
          </button>
        )}
      </div>

      {user ? (
        <div className="flex flex-col gap-2">
          {/* Skeleton rows — will be replaced with real data */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg p-3"
              style={{ background: "var(--muted)" }}
            >
              <div
                className="h-12 w-12 flex-shrink-0 rounded"
                style={{ background: "var(--border)" }}
              />
              <div className="flex flex-1 flex-col gap-1.5">
                <div
                  className="h-3 w-2/5 rounded"
                  style={{ background: "var(--border)" }}
                />
                <div
                  className="h-2.5 w-1/4 rounded"
                  style={{ background: "var(--border)" }}
                />
              </div>
              <div
                className="h-2.5 w-10 rounded"
                style={{ background: "var(--border)" }}
              />
            </div>
          ))}
          <p
            className="pt-4 text-center text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            Your diary is empty. Log your first album to get started.
          </p>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center rounded-lg border py-24 text-center"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Sign in to start logging.
          </p>
        </div>
      )}
    </main>
  );
}
