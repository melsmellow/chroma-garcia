import Image from "next/image";
import Link from "next/link";

import type { ArtworkDetails as ArtworkDetailsType } from "@/types/artworks";
import { formatPrice, statusColor } from "@/lib/artwork";

interface ArtworkDetailsProps {
  artwork: ArtworkDetailsType;
}

export default function ArtworkDetails({ artwork }: ArtworkDetailsProps) {
  const price = formatPrice(artwork);
  const artist = artwork.artist;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {/* Back */}
        <Link
          href="/gallery"
          className="font-mono-label text-[11px] uppercase text-ink-soft transition-colors hover:text-coral"
        >
          ← Back to Gallery
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        {/* ============================== */}
{/* ARTWORK */}
{/* ============================== */}

<div className="flex justify-center lg:justify-start">
  <div className="relative w-full max-w-3xl -rotate-1">
    <div
      className="border border-ink/10 bg-gesso p-2 sm:p-3"
      style={{
        boxShadow: "12px 14px 0 var(--ink)",
      }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  </div>
</div>
          {/* Artwork Details */}
          <div className="flex flex-col lg:py-8">
            <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-coral">
              Artwork
            </p>

            <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              {artwork.title}
            </h1>

            {/* Artist */}
            <Link
              href={`/artists/${artist.slug}`}
              className="group mt-5 flex items-center gap-4"
            >
              <div className="relative size-14 overflow-hidden rounded-full bg-gesso-dim">
                {artist.portraitUrl ? (
                  <Image
                    src={artist.portraitUrl}
                    alt={artist.name}
                    fill
                    sizes="56px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center font-display text-xl text-ink-soft">
                    {artist.name.charAt(0)}
                  </div>
                )}
              </div>

              <div>
                <p className="font-mono-label text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                  Created by
                </p>

                <p className="font-display text-2xl transition-colors group-hover:text-coral">
                  {artist.name}
                </p>
              </div>
            </Link>

            {/* Status + Price */}
            <div className="mt-10 flex items-center justify-between border-y border-line py-5">
              <span className="inline-flex items-center gap-3 font-mono-label text-[11px] uppercase tracking-[0.14em]">
                <span
                  className="size-3 rounded-full"
                  style={{
                    backgroundColor: statusColor[artwork.status],
                  }}
                />

                {artwork.status}
              </span>

              {price && <span className="font-display text-3xl">{price}</span>}
            </div>

            {/* Details */}
            <div className="mt-10">
              <p className="mb-5 font-mono-label text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                Details
              </p>

              <dl className="divide-y divide-line border-y border-line">
                <DetailRow label="Artist">
                  <span className="font-display text-lg">{artist.name}</span>
                </DetailRow>

                <DetailRow label="Medium">{artwork.medium}</DetailRow>

                <DetailRow label="Category">{artwork.category}</DetailRow>

                <DetailRow label="Year">{artwork.year}</DetailRow>

                {artwork.dimensions && (
                  <DetailRow label="Dimensions">{artwork.dimensions}</DetailRow>
                )}
              </dl>
            </div>

            {/* Artist Info */}
            <div className="mt-12 border-t border-line pt-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-coral">
                    About the Artist
                  </p>

                  <h2 className="mt-2 font-display text-4xl">{artist.name}</h2>
                </div>

                <Link
                  href={`/artists/${artist.slug}`}
                  className="shrink-0 font-mono-label text-[11px] uppercase text-ink-soft transition-colors hover:text-coral"
                >
                  View Profile →
                </Link>
              </div>

              {artist.bio && (
                <p className="mt-6 leading-relaxed text-ink-soft">
                  {artist.bio}
                </p>
              )}

              {(artist.artStyle || artist.medium) && (
                <div className="mt-6 font-mono-label text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                  {[artist.artStyle, artist.medium].filter(Boolean).join(" · ")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DetailRowProps {
  label: string;
  children: React.ReactNode;
}

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <dt className="font-mono-label text-[11px] uppercase text-ink-soft">
        {label}
      </dt>

      <dd className="text-right">{children}</dd>
    </div>
  );
}
