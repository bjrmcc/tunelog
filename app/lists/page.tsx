export default function ListsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Lists
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
            Your curated collections and rankings.
          </p>
        </div>
        <button
          className="rounded px-4 py-2 text-sm font-medium opacity-50 cursor-not-allowed"
          style={{ background: "var(--accent)", color: "#fff" }}
          disabled
        >
          New list
        </button>
      </div>

      <div
        className="flex flex-col items-center justify-center rounded-lg border py-24 text-center"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          No lists yet. Sign in to create one.
        </p>
      </div>
    </main>
  );
}
