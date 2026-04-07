import SignupForm from "@/components/auth/signup-form";
import Link from "next/link";

export const metadata = { title: "Sign up — tunelog" };

export default function SignupPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            tunelog
          </Link>
          <h1
            className="mt-4 text-2xl font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Create your account
          </h1>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
