import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getArtists } from "@/actions/artists";
import PaletteStrip from "@/components/PaletteStrip";

export const metadata: Metadata = {
  title: "Artists",
};

export default async function ArtistsPage() {
  const { artists } = await getArtists({
    page: 1,
    limit: 50,
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <PaletteStrip className="mb-6" />

      <h1 className="font-display text-4xl leading-none md:text-5xl">
        The Members
      </h1>

      <p className="mt-4 text-xl leading-9 text-ink-soft">
        Four core practices, one shared palette. Click through to see each
        member&apos;s bio, style, and full gallery.
      </p>

      {artists.length > 0 ? (
        <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-4">
          {artists.map((artist, index) => (
            <Link
              key={artist._id}
              href={`/artists/${artist.slug}`}
              className="group block"
            >
              {/* Portrait */}
              <div className="relative mx-auto aspect-[4/5] overflow-hidden max-w-[85%] bg-gesso-dim sm:max-w-none">
                {artist.portraitUrl ? (
                  <Image
                    src={artist.portraitUrl}
                    alt={artist.name}
                    fill
                    priority={index < 2}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gesso-dim">
                    <span className="font-display text-6xl text-ink-soft">
                      {artist.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Artist Info */}
              <div className="mt-4">
                <h2 className="font-display text-2xl transition-colors group-hover:text-coral">
                  {artist.name}
                </h2>

                <p className="mt-1 font-mono-label text-xs uppercase tracking-wider text-ink-soft">
                  {artist.artStyle}
                </p>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">
                  {artist.bio}
                </p>

                {artist.medium && (
                  <p className="mt-2 text-xs text-ink-soft">
                    <span className="font-medium text-ink">Medium:</span>{" "}
                    {artist.medium}
                  </p>
                )}

                <span className="mt-3 hidden sm:inline font-mono-label text-xs uppercase text-ink-soft group-hover:text-coral">
                  Read bio →
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-line bg-gesso px-6 py-16 text-center">
          <p className="font-display text-2xl text-ink">
            No artists available.
          </p>

          <p className="mt-2 text-sm text-ink-soft">
            Check back soon for artist profiles.
          </p>
        </div>
      )}
    </div>
  );
}
