"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  formatPrice,
  statusColor,
} from "@/app/(public)/gallery/gallery-client";

import { getArtworksByArtistSlug } from "@/actions/artworks";

import type { Artist } from "@/actions/artists";
import type { Artwork, ArtworkPagination } from "@/types/artworks";
import Link from "next/link";

interface ArtistGalleryProps {
  artist: Artist;
  initialWorks: Artwork[];
  initialPagination: ArtworkPagination;
}

export default function ArtistGallery({
  artist,
  initialWorks,
  initialPagination,
}: ArtistGalleryProps) {
  const [works, setWorks] = useState<Artwork[]>(initialWorks);

  const [currentPage, setCurrentPage] = useState(initialPagination.page);

  const [hasNextPage, setHasNextPage] = useState(initialPagination.hasNextPage);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  async function loadMoreWorks() {
    if (!hasNextPage || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const nextPage = currentPage + 1;

      const response = await getArtworksByArtistSlug(artist.slug, {
        page: nextPage,
        limit: 10,
      });

      setWorks((previous) => [...previous, ...response.artworks]);

      setCurrentPage(response.pagination.page);

      setHasNextPage(response.pagination.hasNextPage);
    } catch (error) {
      console.error("Failed to load more artist artworks:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    const element = document.getElementById("artist-gallery-load-more");

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMoreWorks();
        }
      },
      {
        rootMargin: "400px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [currentPage, hasNextPage, isLoadingMore]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-8 border-b border-line pb-3 font-mono-label text-[11px] uppercase text-ink-soft">
        Gallery — {works.length} {works.length === 1 ? "work" : "works"}
      </h2>

      {works.length === 0 ? (
        <p className="py-20 text-center text-ink-soft">
          This artist has no artworks yet.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((art, index) => {
            const price = formatPrice(art);

            return (
              <div key={art._id}>
                <div className="group relative aspect-[4/5] overflow-hidden">
                  <Link
                    href={`/gallery/${art.slug}`}
                    className="group block"
                  >
                    <Image
                      src={art.imageUrl}
                      alt={art.title}
                      fill
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>
                </div>

                <div className="mt-4">
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl leading-none">
                      {art.title}
                    </h3>

                    <p className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                      {artist.name} · {art.medium} · {art.year}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                    <span className="inline-flex items-center gap-2 font-mono-label text-[11px] uppercase tracking-[0.14em]">
                      <span
                        className="size-3 rounded-full"
                        style={{
                          backgroundColor: statusColor[art.status],
                        }}
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
      )}

      {/* Lazy-load sentinel */}
      <div
        id="artist-gallery-load-more"
        className="flex min-h-24 items-center justify-center"
        aria-hidden="true"
      >
        {isLoadingMore && (
          <span className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-ink-soft">
            Loading more artworks...
          </span>
        )}

        {!hasNextPage && works.length > 0 && (
          <span className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-ink-soft">
            You&apos;ve reached the end.
          </span>
        )}
      </div>
    </section>
  );
}
