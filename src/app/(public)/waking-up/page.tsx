import type { Metadata } from "next";
import Link from "next/link"

import WakeUpPoller from "@/components/WakeUpPoller";

export const metadata: Metadata = {
  title: "Waking Up",
  robots: {
    index: false,
  },
};

export default function WakingUpPage() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden border-y border-line px-6 py-24">
      {/* Decorative background text */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[24vw] leading-none text-ink/5"
        aria-hidden="true"
      >
        Zzz
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="font-mono-label text-xs uppercase tracking-[0.25em] text-coral">
          Welcome to Chroma Garcia
          <span aria-hidden="true" className="ml-1 inline-flex">
            <span className="animate-pulse">.</span>
            <span className="animate-pulse [animation-delay:200ms]">.</span>
            <span className="animate-pulse [animation-delay:400ms]">.</span>
          </span>
        </p>

        <h1 className="mt-6 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
          Please wait while we
          <br />
          <span className="italic text-ink-soft">wake up the server.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-ink-soft sm:text-lg">
          Our backend is warming up its brushes after a little nap — it
          should be ready in a few moments. We keep an eye on it and will
          take you back automatically once it&apos;s up.
        </p>

        {/* Live status — polls /api/health and redirects home when ready */}
        <WakeUpPoller />

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/"
            className="border border-ink bg-ink px-6 py-3 font-mono-label text-xs uppercase tracking-[0.14em] text-gesso transition-transform hover:-translate-y-0.5"
          >
            Try Again
          </Link>

          <Link
            href="/about"
            className="border-b border-ink pb-1 font-mono-label text-xs uppercase tracking-[0.14em] transition-colors hover:border-coral hover:text-coral"
          >
            About Us →
          </Link>
        </div>
      </div>
    </section>
  );
}
