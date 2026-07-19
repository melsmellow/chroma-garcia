import Image from "next/image";
import MagazinePortrait from "@/components/MagazinePortrait";
import WallLabel from "@/components/WallLabel";
import { artists, getArtist, getArtworksByArtist } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, statusColor } from "@/app/gallery/gallery-client";
import ArtistGallery from "@/components/artist/ArtistGallery";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);

  return {
    title: artist ? artist.name : "Artist",
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;

  const artist = getArtist(slug);

  if (!artist) notFound();

  const works = getArtworksByArtist(artist.slug);

  const memberNo = String(
    artists.findIndex((a) => a.slug === artist.slug) + 1,
  ).padStart(3, "0");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/artists"
            className="font-mono-label text-[11px] uppercase text-ink-soft hover:text-coral"
          >
            ← All Artists
          </Link>

          <div className="relative mt-12 grid gap-16 lg:grid-cols-[340px_1fr] items-start">
            {/* Decorative oversized surname */}
            <h1
              className="pointer-events-none absolute top-0 left-[260px] hidden lg:block font-display leading-none text-ink/10 select-none"
              style={{ fontSize: "clamp(6rem,14vw,11rem)" }}
              aria-hidden
            >
              {artist.name.split(" ").slice(-1)}
            </h1>

            {/* LEFT */}
            <div>
              <div className="relative -rotate-2">
                <div
                  className="border border-ink/10 bg-gesso p-2.5"
                  style={{
                    boxShadow: "10px 12px 0 var(--ink)",
                  }}
                >
                  <div className="aspect-[4/5]">
                    <MagazinePortrait
                      src={artist.portraitSrc}
                      alt={artist.name}
                      seed={`portrait-${artist.slug}`}
                      palette={artist.palette}
                      className="h-full w-full"
                    />
                  </div>
                </div>

                <span
                  className="absolute -right-3 -top-3 h-6 w-6 rounded-full border-4 border-gesso"
                  style={{
                    backgroundColor: `var(--${artist.palette})`,
                  }}
                />
              </div>

              <div className="mt-6 inline-block border border-line bg-gesso px-4 py-3">
                <WallLabel
                  eyebrow={`Member No. ${memberNo}`}
                  title={artist.artStyle}
                  meta={artist.medium}
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative z-10 max-w-2xl">
              <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-coral">
                Artist Profile
              </p>

              <h2 className="mt-3 font-display text-5xl leading-none sm:text-7xl">
                {artist.name}
              </h2>

              <p className="mt-4 font-mono-label text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                {artist.artStyle} · {artist.medium}
              </p>

              <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft">
                {artist.bio
                  .split(/(?<=\.)\s+/)
                  .filter(Boolean)
                  .map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-6 font-mono-label text-[11px] uppercase">
                {artist.social.instagram && (
                  <a
                    href={artist.social.instagram}
                    className="border-b border-ink hover:border-coral hover:text-coral"
                  >
                    Instagram
                  </a>
                )}

                {artist.social.facebook && (
                  <a
                    href={artist.social.facebook}
                    className="border-b border-ink hover:border-coral hover:text-coral"
                  >
                    Facebook
                  </a>
                )}

                {artist.social.website && (
                  <a
                    href={artist.social.website}
                    className="border-b border-ink hover:border-coral hover:text-coral"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <ArtistGallery works={works} artist={artist} />
    </>
  );
}
