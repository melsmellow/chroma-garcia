"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnderDevelopment() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDots((current) => {
        if (current.length >= 3) {
          return "";
        }

        return `${current}.`;
      });
    }, 500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] overflow-hidden border-y border-line">
      {/* Decorative background text */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[28vw] leading-none text-ink/5"
        aria-hidden="true"
      >
        WIP
      </div>

      {/* Decorative lines */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-1/4 w-px bg-line/40"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute top-0 bottom-0 right-1/4 w-px bg-line/40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-6 py-20">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
          {/* Left — Artwork / WIP card */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative -rotate-2">
              {/* Offset paper layer */}
              <div className="absolute top-3 left-3 h-full w-full border border-line bg-gesso/80" />

              <div className="relative border border-line bg-gesso p-3 shadow-[12px_14px_0_var(--ink)]">
                <div className="relative flex aspect-[4/5] w-[min(72vw,360px)] items-center justify-center overflow-hidden bg-gesso-dim">
                  {/* Construction grid */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(var(--line) 1px, transparent 1px),
                        linear-gradient(90deg, var(--line) 1px, transparent 1px)
                      `,
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Main WIP mark */}
                  <div className="relative text-center">
                    <p className="font-mono-label text-[11px] uppercase tracking-[0.25em] text-coral">
                      Work in Progress
                    </p>

                    <div className="mt-6 border-y border-line py-8">
                      <span className="font-display text-7xl leading-none text-ink sm:text-8xl">
                        WIP
                      </span>
                    </div>

                    <p className="mt-6 max-w-48 font-mono-label text-[10px] uppercase leading-5 tracking-[0.16em] text-ink-soft">
                      Something is currently taking shape.
                    </p>
                  </div>

                  {/* Corner marks */}
                  <span className="absolute top-3 left-3 size-2 border-t border-l border-ink" />
                  <span className="absolute top-3 right-3 size-2 border-t border-r border-ink" />
                  <span className="absolute bottom-3 left-3 size-2 border-b border-l border-ink" />
                  <span className="absolute right-3 bottom-3 size-2 border-r border-b border-ink" />
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="relative">
            <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-coral">
              Under Development{dots}
            </p>

            <h1 className="mt-5 max-w-3xl font-display text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
              Still on the
              <br />
              <span className="italic text-ink-soft">easel.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-ink-soft sm:text-lg">
              This part of the gallery is currently being worked on. Like any
              good piece of art, it needs a little more time before it&apos;s
              ready to be shown.
            </p>

            {/* Progress */}
            <div className="mt-12 max-w-md border-y border-line py-5">
              <div className="flex items-center justify-between font-mono-label text-[10px] uppercase tracking-[0.14em]">
                <span className="text-ink-soft">In progress</span>

                <span>Building</span>
              </div>

              <div className="mt-4 h-px w-full bg-line">
                <div className="h-full w-2/3 bg-coral" />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link
                href="/gallery"
                className="border border-ink bg-ink px-6 py-3 font-mono-label text-[11px] uppercase tracking-[0.14em] text-gesso transition-transform hover:-translate-y-0.5"
              >
                Explore Gallery
              </Link>

              <Link
                href="/"
                className="border-b border-ink pb-1 font-mono-label text-[11px] uppercase tracking-[0.14em] transition-colors hover:border-coral hover:text-coral"
              >
                Back Home →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute right-6 bottom-6 hidden font-mono-label text-[10px] uppercase tracking-[0.2em] text-ink-soft sm:block">
        Currently creating — 2026
      </div>
    </main>
  );
}