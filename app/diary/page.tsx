export default function DiaryPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Diary
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
            A record of everything you've listened to.
          </p>
        </div>
        <button
          className="rounded px-4 py-2 text-sm font-medium opacity-50 cursor-not-allowed"
          style={{ background: "var(--accent)", color: "#fff" }}
          disabled
        >
          Log an album
        </button>
      </div>

      <div
        className="flex flex-col items-center justify-center rounded-lg border py-24 text-center"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Your diary is empty. Sign in to start logging.
        </p>
      </div>
    </main>
  );
}
