import Link from "next/link";
import type { Metadata } from "next";
import AbstractArt from "@/components/AbstractArt";
import PaletteStrip from "@/components/PaletteStrip";
import { artists, getArtworksByArtist } from "@/lib/data";

export const metadata: Metadata = { title: "Artists" };

export default function ArtistsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <PaletteStrip className="mb-6" />
      <h1 className="font-display text-5xl">The Members</h1>
      <p className="mt-4 text-ink-soft max-w-xl">
        Four core practices, one shared palette. Click through to see each
        member's bio, style, and full gallery.
      </p>

      <div className="mt-16 grid sm:grid-cols-2 gap-x-10 gap-y-16">
        {artists.map((artist) => {
          const cover = getArtworksByArtist(artist.slug)[0];
          return (
            <Link
              key={artist.slug}
              href={`/artists/${artist.slug}`}
              className="group block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <AbstractArt
                  seed={cover?.id ?? artist.slug}
                  palette={artist.palette}
                  className="w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl group-hover:text-coral transition-colors">
                    {artist.name}
                  </h2>
                  <p className="font-mono-label text-[11px] uppercase text-ink-soft mt-1">
                    {artist.artStyle}
                  </p>
                </div>
                <span
                  className="mt-2 size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: `var(--${artist.palette})` }}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 text-sm text-ink-soft line-clamp-2">
                {artist.bio}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
