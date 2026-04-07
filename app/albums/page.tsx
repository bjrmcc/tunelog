export default function AlbumsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <div className="mb-8">
        <h1
          className="text-2xl font-semibold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          Albums
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Every album you've rated or logged.
        </p>
      </div>

      <div
        className="flex flex-col items-center justify-center rounded-lg border py-24 text-center"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          No albums yet. Sign in to get started.
        </p>
      </div>
    </main>
  );
}
