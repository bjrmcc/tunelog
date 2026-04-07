import Link from "next/link";

const features = [
  {
    title: "Diary",
    description:
      "Log every listen. Keep a running record of what you've heard and when, with notes for each session.",
  },
  {
    title: "Ratings",
    description:
      "Rate albums and individual tracks on a half-star scale. Leave a review or just the score.",
  },
  {
    title: "Rankings",
    description:
      "Build ordered lists — your top albums of the year, your favourite records of a decade, whatever you want.",
  },
  {
    title: "Lists",
    description:
      "Curate unranked collections. Themes, moods, recommendations — lists without the pressure of ordering.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-32 text-center">
        <h1
          className="mb-4 text-5xl font-semibold tracking-tight sm:text-6xl"
          style={{ color: "var(--foreground)" }}
        >
          Track every album.
          <br />
          <span style={{ color: "var(--accent)" }}>Rate every listen.</span>
        </h1>
        <p
          className="mb-10 max-w-md text-lg leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          tunelog is a music diary for people who take listening seriously. Log
          albums, rate tracks, build lists and rankings — all in one place.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="rounded px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded border px-5 py-2.5 text-sm transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
            }}
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col gap-2 px-8 py-10"
              style={{
                borderRight:
                  i < features.length - 1
                    ? "1px solid var(--border)"
                    : undefined,
              }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
