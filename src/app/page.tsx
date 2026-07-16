import Link from "next/link";
import AbstractArt from "@/components/AbstractArt";
import PaletteStrip from "@/components/PaletteStrip";
import WallLabel from "@/components/WallLabel";
import { artworks, outreachPosts, getArtist } from "@/lib/data";

const heroWorks = artworks.slice(0, 5);

export default function Home() {
  const featured = outreachPosts.slice(0, 3);

  return (
    <>
      {/* HERO — a salon-hung wall of work, wordmark as the plaque */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          <div>
            <PaletteStrip className="mb-6" />
            <h1 className="font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight">
              Community, painted{" "}
              <span className="italic text-coral">in the open.</span>
            </h1>
            <p className="mt-6 text-ink-soft text-lg max-w-md">
              Chroma Garcia is a Taguig-based collective of visual artists —
              painting, teaching, and fundraising for the neighborhoods that
              raised us.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-ink text-gesso px-6 py-3 font-mono-label text-[11px] uppercase hover:bg-coral transition-colors"
              >
                Join Us
              </Link>
              <Link
                href="/contact"
                className="border border-ink px-6 py-3 font-mono-label text-[11px] uppercase hover:border-coral hover:text-coral transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-3 gap-3 rotate-[0.4deg]">
              {heroWorks.map((art, i) => (
                <div
                  key={art.id}
                  className={
                    i === 0
                      ? "col-span-2 row-span-2 aspect-square"
                      : "aspect-square"
                  }
                >
                  <AbstractArt
                    seed={art.id}
                    palette={art.palette}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 bg-gesso border border-line px-4 py-3 inline-block">
              <WallLabel
                eyebrow="On the wall"
                title={`${heroWorks[0].title}, ${heroWorks[0].year}`}
                meta={`${getArtist(heroWorks[0].artistSlug)?.name} — ${heroWorks[0].medium}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-14">
        <div>
          <span className="font-mono-label text-[11px] uppercase text-coral">
            Mission
          </span>
          <h2 className="font-display text-3xl mt-3 leading-snug">
            Put professional art practice to work in the community.
          </h2>
          <p className="mt-4 text-ink-soft">
            We give our members a studio to grow in, and ask one thing back:
            every group show, workshop, and auction funds something the
            neighborhood actually needs — supplies, murals, scholarships,
            trees.
          </p>
        </div>
        <div>
          <span className="font-mono-label text-[11px] uppercase text-teal">
            Vision
          </span>
          <h2 className="font-display text-3xl mt-3 leading-snug">
            A Metro Manila where every barangay has working artists in it.
          </h2>
          <p className="mt-4 text-ink-soft">
            Not galleries behind glass — artists teaching on basketball
            courts, painting murals with teenagers, and treating outreach as
            seriously as the work on canvas.
          </p>
        </div>
      </section>

      {/* FEATURED OUTREACH */}
      <section className="bg-gesso-dim border-y border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="font-mono-label text-[11px] uppercase text-ink-soft">
                Latest from the group
              </span>
              <h2 className="font-display text-3xl mt-2">
                Outreach &amp; announcements
              </h2>
            </div>
            <Link
              href="/outreach"
              className="font-mono-label text-[11px] uppercase border-b border-ink hover:text-coral hover:border-coral"
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
                  <p className="mt-3 text-sm text-ink-soft line-clamp-2">
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
          <h2 className="font-display text-3xl sm:text-4xl max-w-lg">
            Artist, teacher, donor, volunteer — there's a seat for you.
          </h2>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/contact"
              className="bg-coral text-gesso px-6 py-3 font-mono-label text-[11px] uppercase hover:opacity-90"
            >
              Join Us
            </Link>
            <Link
              href="/contact"
              className="border border-gesso/40 px-6 py-3 font-mono-label text-[11px] uppercase hover:border-gesso"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
