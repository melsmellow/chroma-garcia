import Link from "next/link";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-ink">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md items-center">
        <div className="w-full">
          {/* Brand */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-xl"
          >
            <span className="flex gap-1">
              <span className="size-2 rounded-full bg-coral" />
              <span className="size-2 rounded-full bg-ochre" />
              <span className="size-2 rounded-full bg-teal" />
              <span className="size-2 rounded-full bg-lilac" />
            </span>
            Chroma Garcia
          </Link>

          {/* Login Card */}
          <div className="mt-10 border border-white/10 bg-white/[0.02] p-6 sm:p-10">
            <div>
              <p className="font-mono-label text-xs uppercase tracking-[0.2em] text-coral">
                Administration
              </p>

              <h1 className="mt-4 font-display text-4xl leading-none md:text-5xl">
                Welcome back.
              </h1>

              <p className="mt-4 leading-7 text-ink-soft">
                Sign in to manage artists, artworks, and gallery content.
              </p>
            </div>

            <div className="mt-10">
              <LoginForm />
            </div>
          </div>

          {/* Back to website */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="font-mono-label text-xs uppercase tracking-wider text-ink-soft transition-colors hover:text-coral"
            >
              ← Back to Chroma Garcia
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
