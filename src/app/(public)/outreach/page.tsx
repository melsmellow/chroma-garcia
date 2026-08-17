import Link from "next/link";
import type { Metadata } from "next";
import AbstractArt from "@/components/AbstractArt";
import PaletteStrip from "@/components/PaletteStrip";
import { outreachPosts } from "@/lib/data";

export const metadata: Metadata = { title: "Outreach & Community" };

export default function OutreachPage() {
  const sorted = [...outreachPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <PaletteStrip className="mb-6" />
      <h1 className="font-display text-4xl md:text-5xl leading-none">
        Outreach &amp; Community
      </h1>
      <p className="mt-4 text-xl leading-9 text-ink-soft">
        Workshops, murals, exhibitions, and where the fundraising goes — updated
        as it happens.
      </p>

      <div className="mt-16 divide-y divide-line border-t border-line">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/outreach/${post.slug}`}
            className="group grid sm:grid-cols-[220px_1fr] gap-6 py-10 items-start"
          >
            <div className="aspect-[4/3]">
              <AbstractArt
                seed={post.slug}
                palette={post.palette}
                className="w-full h-full"
              />
            </div>
            <div>
              <span className="font-mono-label text-xs uppercase text-ink-soft">
                {post.type} —{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <h2 className="font-display text-2xl mt-1 group-hover:text-coral transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-ink-soft max-w-xl">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
