import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AbstractArt from "@/components/AbstractArt";
import WallLabel from "@/components/WallLabel";
import { artists, getArtist, getArtworksByArtist } from "@/lib/data";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const artist = getArtist(params.slug);
  return { title: artist ? artist.name : "Artist" };
}

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = getArtist(params.slug);
  if (!artist) notFound();
  const works = getArtworksByArtist(artist.slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Link
        href="/artists"
        className="font-mono-label text-[11px] uppercase text-ink-soft hover:text-coral"
      >
        ← All Artists
      </Link>

      <div className="mt-8 grid md:grid-cols-[1fr_1.3fr] gap-14 items-start">
        <div>
          <div className="aspect-square">
            <AbstractArt
              seed={`portrait-${artist.slug}`}
              palette={artist.palette}
              className="w-full h-full"
            />
          </div>
          <div className="mt-6">
            <span
              className="inline-block size-2.5 rounded-full mb-3"
              style={{ backgroundColor: `var(--${artist.palette})` }}
              aria-hidden="true"
            />
            <h1 className="font-display text-4xl">{artist.name}</h1>
            <p className="font-mono-label text-[11px] uppercase text-ink-soft mt-2">
              {artist.artStyle} — {artist.medium}
            </p>
            <p className="mt-5 text-ink-soft">{artist.bio}</p>

            <div className="mt-6 flex gap-4 font-mono-label text-[11px] uppercase">
              {artist.social.instagram && (
                <a href={artist.social.instagram} className="border-b border-ink hover:text-coral hover:border-coral">
                  Instagram
                </a>
              )}
              {artist.social.facebook && (
                <a href={artist.social.facebook} className="border-b border-ink hover:text-coral hover:border-coral">
                  Facebook
                </a>
              )}
              {artist.social.website && (
                <a href={artist.social.website} className="border-b border-ink hover:text-coral hover:border-coral">
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-mono-label text-[11px] uppercase text-ink-soft mb-6">
            Gallery — {works.length} works
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {works.map((art) => (
              <div key={art.id}>
                <div className="aspect-[4/5]">
                  <AbstractArt seed={art.id} palette={art.palette} className="w-full h-full" />
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
        </div>
      </div>
    </div>
  );
}
