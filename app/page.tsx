import Link from "next/link";

const features = [
  {
    title: "Diary",
    description: "Log every listen with notes and dates.",
    href: "/diary",
  },
  {
    title: "Ratings",
    description: "Rate albums and tracks on a half-star scale.",
    href: "/albums",
  },
  {
    title: "Rankings",
    description: "Build ordered lists of your favourite records.",
    href: "/lists",
  },
  {
    title: "Lists",
    description: "Curate collections without the pressure of ranking.",
    href: "/lists",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1
          className="mb-3 text-4xl font-semibold tracking-tight sm:text-5xl"
          style={{ color: "var(--foreground)" }}
        >
          Track every album.
          <br />
          <span style={{ color: "var(--accent)" }}>Rate every listen.</span>
        </h1>
        <p
          className="mb-8 max-w-sm text-base leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          A music diary for people who take listening seriously.
        </p>
        <div className="flex w-full max-w-xs flex-col gap-2 sm:flex-row sm:max-w-none sm:justify-center">
          <Link
            href="/signup"
            className="flex h-11 items-center justify-center rounded-lg px-6 text-sm font-medium"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="flex h-11 items-center justify-center rounded-lg border px-6 text-sm"
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
        className="border-t px-6 py-8"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-1.5 rounded-lg p-4"
              style={{ background: "var(--muted)" }}
            >
              <h3
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-snug"
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
