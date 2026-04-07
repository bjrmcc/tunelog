export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
      <div className="mb-8">
        <h1
          className="text-2xl font-semibold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          Profile
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Your activity and stats.
        </p>
      </div>

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
