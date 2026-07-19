"use client";
import { formatPrice, statusColor } from "@/app/gallery/gallery-client";
import { Artist, Artwork } from "@/lib/data";
import Image from "next/image";

export default function ArtistGallery({
  works,
  artist,
}: {
  works: Artwork[];
  artist: Artist;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-8 border-b border-line pb-3 font-mono-label text-[11px] uppercase text-ink-soft">
        Gallery — {works.length} works
      </h2>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((art, index) => {
          const price = formatPrice(art);
          return (
            <div key={art.id}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={art.imageUrl}
                  alt={art.title}
                  fill
                  priority={index < 3} // First row loads immediately
                  loading={index < 3 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4">
                <div className="space-y-1">
                  <h3 className="font-display text-2xl leading-none">
                    {art.title}
                  </h3>

                  <p className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                    {artist.name} · {art.medium} ·{" "}
                    {art.year}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="inline-flex items-center gap-2 font-mono-label text-[11px] uppercase tracking-[0.14em]">
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: statusColor[art.status] }}
                    />
                    {art.status}
                  </span>

                  {price && (
                    <span className="font-display text-xl leading-none">
                      {price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
