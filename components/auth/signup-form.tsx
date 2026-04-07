"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp, type AuthState } from "@/lib/auth/actions";

export default function SignupForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signUp,
    undefined
  );

  if (state?.message) {
    return (
      <div
        className="rounded-lg px-5 py-6 text-center text-sm leading-relaxed"
        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
      >
        {state.message}
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      {state?.error && (
        <p
          className="rounded-lg px-4 py-3 text-sm"
          style={{ background: "var(--muted)", color: "#f87171" }}
        >
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="username"
          className="text-xs font-medium"
          style={{ color: "var(--muted-foreground)" }}
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          minLength={3}
          className="h-11 rounded-lg border px-3 text-sm outline-none transition-colors focus:border-white/30"
          style={{
            background: "var(--muted)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-xs font-medium"
          style={{ color: "var(--muted-foreground)" }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-11 rounded-lg border px-3 text-sm outline-none transition-colors focus:border-white/30"
          style={{
            background: "var(--muted)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-xs font-medium"
          style={{ color: "var(--muted-foreground)" }}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="h-11 rounded-lg border px-3 text-sm outline-none transition-colors focus:border-white/30"
          style={{
            background: "var(--muted)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        />
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          At least 8 characters.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-1 flex h-11 items-center justify-center rounded-lg text-sm font-medium transition-opacity disabled:opacity-60"
        style={{ background: "var(--accent)", color: "#fff" }}
      >
        {pending ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium"
          style={{ color: "var(--foreground)" }}
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
