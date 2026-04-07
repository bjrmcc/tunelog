import { createClient } from "@/lib/supabase/server";

export default async function AlbumsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          Albums
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          Every album you've rated or logged.
        </p>
      </div>

      {user ? (
        <div className="grid grid-cols-3 gap-3">
          {/* Skeleton grid — will be replaced with real album art */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div
                className="aspect-square w-full rounded-lg"
                style={{ background: "var(--muted)" }}
              />
              <div
                className="h-2.5 w-3/4 rounded"
                style={{ background: "var(--muted)" }}
              />
              <div
                className="h-2 w-1/2 rounded"
                style={{ background: "var(--muted)" }}
              />
            </div>
          ))}
          <p
            className="col-span-3 pt-4 text-center text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            No albums yet. Log an album from your diary to see it here.
          </p>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center rounded-lg border py-24 text-center"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Sign in to see your albums.
          </p>
        </div>
      )}
    </main>
  );
}
