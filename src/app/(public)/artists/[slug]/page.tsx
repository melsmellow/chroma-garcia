import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getArtworksByArtistSlug } from "@/actions/artworks";

import WallLabel from "@/components/WallLabel";
import ArtistGallery from "@/components/artist/ArtistGallery";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await getArtworksByArtistSlug(slug, {
      page: 1,
      limit: 10,
    });

    return {
      title: data.artist.name,
    };
  } catch {
    return {
      title: "Artist",
    };
  }
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;

  let data;

  try {
    data = await getArtworksByArtistSlug(slug, {
      page: 1,
      limit: 10,
    });
  } catch (error) {
    console.error(`Failed to load artist "${slug}":`, error);

    notFound();
  }

  const artist = data.artist;
  const works = data.artworks;

  /*
   * Normalize portrait field.
   *
   * Your project has used both `portrait` and `portraitUrl`
   * in different frontend types/components, so support both
   * until the Artist type is made consistent everywhere.
   */

  return (
    <>
      {/* ============================== */}
      {/* HERO */}
      {/* ============================== */}

      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Back */}
          <Link
            href="/artists"
            className="font-mono-label text-[11px] uppercase text-ink-soft transition-colors hover:text-coral"
          >
            ← All Artists
          </Link>

          <div className="relative mt-12 grid items-start gap-16 lg:grid-cols-[340px_1fr]">
            {/* Decorative surname */}
            <h1
              className="pointer-events-none absolute top-0 left-[260px] hidden select-none font-display leading-none text-ink/10 lg:block"
              style={{
                fontSize: "clamp(6rem, 14vw, 11rem)",
              }}
              aria-hidden="true"
            >
              {artist.name.split(" ").slice(-1)}
            </h1>

            {/* ============================== */}
            {/* LEFT */}
            {/* ============================== */}

            <div>
              <div className="relative -rotate-2">
                <div
                  className="border border-ink/10 bg-gesso p-2.5"
                  style={{
                    boxShadow: "10px 12px 0 var(--ink)",
                  }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {artist.portraitUrl ? (
                      <Image
                        src={artist.portraitUrl}
                        alt={artist.name}
                        fill
                        priority
                        sizes="340px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-gesso-dim">
                        <span className="font-display text-6xl text-ink-soft">
                          {artist.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Artist label */}
              <div className="mt-6 inline-block border border-line bg-gesso px-4 py-3">
                <WallLabel
                  eyebrow="Artist"
                  title={artist.artStyle}
                  meta={artist.medium}
                />
              </div>
            </div>

            {/* ============================== */}
            {/* RIGHT */}
            {/* ============================== */}

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

              {/* Biography */}
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft">
                {artist.bio
                  .split(/(?<=\.)\s+/)
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>

              {/* Social links */}
              <div className="mt-10 flex flex-wrap gap-6 font-mono-label text-[11px] uppercase">
                {artist.social?.instagram && (
                  <a
                    href={artist.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-ink transition-colors hover:border-coral hover:text-coral"
                  >
                    Instagram
                  </a>
                )}

                {artist.social?.facebook && (
                  <a
                    href={artist.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-ink transition-colors hover:border-coral hover:text-coral"
                  >
                    Facebook
                  </a>
                )}

                {artist.social?.website && (
                  <a
                    href={artist.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-ink transition-colors hover:border-coral hover:text-coral"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* ARTWORK GALLERY */}
      {/* ============================== */}

      <ArtistGallery
        artist={artist}
        initialWorks={works}
        initialPagination={data.pagination}
      />
    </>
  );
}
