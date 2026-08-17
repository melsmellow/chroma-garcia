import { getFeaturedArtworks } from "@/actions/artworks";
import AbstractArt from "@/components/AbstractArt";
import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Vision from "@/components/home/Vision";
import WallLabel from "@/components/WallLabel";
import { outreachPosts } from "@/lib/data";
import type { Artwork } from "@/types/artworks";
import Link from "next/link";

export default async function Home() {
  const featured = outreachPosts.slice(0, 3);

  let featuredArtworks: Artwork[] = [];

  try {
    const response = await getFeaturedArtworks();

    featuredArtworks = response.artworks;
  } catch (error) {
    console.error("Fetch featured artworks error:", error);
  }

  return (
    <>
      {/* HERO — a salon-hung wall of work, wordmark as the plaque */}
      <Hero artworks={featuredArtworks} />

      {/* MISSION & VISION */}
      <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-20">
        <Mission />
        <Vision />
      </section>

      {/* FEATURED OUTREACH */}
      <section className="bg-gesso-dim border-y border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="font-mono-label text-xs uppercase text-ink-soft">
                Latest from the group
              </span>
              <h2 className="mt-2 font-display text-4xl">
                Outreach &amp; announcements
              </h2>
            </div>
            <Link
              href="/outreach"
              className="font-mono-label text-xs uppercase border-b border-ink hover:text-coral hover:border-coral"
            >
              View all
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/outreach/${post.slug}`}
                className="group block bg-gesso border border-line hover:border-ink transition-colors"
              >
                <div className="aspect-[4/3]">
                  <AbstractArt
                    seed={post.slug}
                    palette={post.palette}
                    className="w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <WallLabel
                    eyebrow={`${post.type} — ${new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                    title={post.title}
                  />
                  <p className="mt-3 text-base leading-7 text-ink-soft line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-ink text-gesso">
        <div className="mx-auto max-w-6xl px-6 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <h2 className="font-display text-4xl sm:text-5xl max-w-lg">
            Artist, teacher, donor, volunteer — there's a seat for you.
          </h2>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/contact"
              className="bg-coral text-gesso px-6 py-3 font-mono-label text-xs uppercase hover:opacity-90"
            >
              Join Us
            </Link>
            <Link
              href="/contact"
              className="border border-gesso/40 px-6 py-3 font-mono-label text-xs uppercase hover:border-gesso"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
