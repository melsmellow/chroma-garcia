import AbstractArt from "@/components/AbstractArt";
import MagazinePortrait from "@/components/MagazinePortrait";
import WallLabel from "@/components/WallLabel";
import { artists, getArtist, getArtworksByArtist } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// NOTE: In Next.js 15+, `params` is a Promise — it must be awaited before
// use. Reading `params.slug` synchronously silently resolves to undefined,
// which is why this route was 404-ing before.
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);
  return { title: artist ? artist.name : "Artist" };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();
  const works = getArtworksByArtist(artist.slug);
  const memberNo = String(
    artists.findIndex((a) => a.slug === artist.slug) + 1,
  ).padStart(3, "0");

  console.log(artist);

  return (
    <>
      {/* POSTER HERO */}
      <section className="relative border-b border-line overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-24">
          <Link
            href="/artists"
            className="relative z-10 font-mono-label text-[11px] uppercase text-ink-soft hover:text-coral"
          >
            ← All Artists
          </Link>

          <div className="relative mt-8 min-h-[520px] sm:min-h-[620px]">
            {/* Oversized name, sits behind everything */}
            <h1
              className="absolute -top-2 left-0 right-0 font-display leading-[0.78] tracking-tight text-ink/[0.05] select-none pointer-events-none whitespace-nowrap"
              style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
              aria-hidden="true"
            >
              {artist.name}
            </h1>

            {/* Vertical rotated label along the left edge */}
            <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono-label text-[11px] uppercase text-ink-soft tracking-[0.2em] whitespace-nowrap">
              {artist.artStyle} — {artist.medium}
            </div>

            {/* Sticker-cutout portrait */}
            <div className="relative w-60 sm:w-72 sm:ml-20 -rotate-3">
              <div
                className="bg-gesso p-2.5 border border-ink/10"
                style={{ boxShadow: "10px 12px 0 0 var(--ink)" }}
              >
                <div className="aspect-[4/5]">
                  <MagazinePortrait
                    src={artist.portraitSrc}
                    alt={artist.name}
                    seed={`portrait-${artist.slug}`}
                    palette={artist.palette}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <span
                className="absolute -top-3 -right-3 size-6 rounded-full border-4 border-gesso"
                style={{ backgroundColor: `var(--${artist.palette})` }}
                aria-hidden="true"
              />
            </div>

            {/* Barcode-style ID tag */}
            <div className="mt-7 sm:ml-20 flex items-center gap-3 w-fit bg-gesso/95 px-3 py-2 border border-line">
              <span className="font-mono-label text-[10px] uppercase text-ink-soft whitespace-nowrap">
                No. {memberNo} — Member
              </span>
            </div>

            {/* Manifesto-style bio, stacked short lines */}
            <div className="mt-10 sm:ml-20 max-w-md space-y-3">
              {artist.bio
                .split(/(?<=\.)\s+/)
                .filter(Boolean)
                .map((line, i) => (
                  <p
                    key={i}
                    className="font-display text-xl sm:text-2xl leading-snug text-ink"
                  >
                    {line}
                  </p>
                ))}
            </div>

            {/* Social links */}
            <div className="mt-7 sm:ml-20 flex gap-5 font-mono-label text-[11px] uppercase">
              {artist.social.instagram && (
                <a
                  href={artist.social.instagram}
                  className="border-b border-ink hover:text-coral hover:border-coral"
                >
                  Instagram
                </a>
              )}
              {artist.social.facebook && (
                <a
                  href={artist.social.facebook}
                  className="border-b border-ink hover:text-coral hover:border-coral"
                >
                  Facebook
                </a>
              )}
              {artist.social.website && (
                <a
                  href={artist.social.website}
                  className="border-b border-ink hover:text-coral hover:border-coral"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-mono-label text-[11px] uppercase text-ink-soft mb-8 pb-3 border-b border-line">
          Gallery — {works.length} works
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {works.map((art) => (
            <div key={art.id}>
              <div className="aspect-[4/5]">
                <AbstractArt
                  seed={art.id}
                  palette={art.palette}
                  className="w-full h-full"
                />
              </div>
              <div className="mt-3">
                <WallLabel
                  title={art.title}
                  meta={`${art.medium} — ${art.year}`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
