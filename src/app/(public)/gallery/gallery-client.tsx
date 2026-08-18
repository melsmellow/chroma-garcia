"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getArtworks } from "@/actions/artworks";

import type { Artist } from "@/actions/artists";
import type { Artwork, ArtworkPagination } from "@/types/artworks";

export const statusColor: Record<Artwork["status"], string> = {
  Available: "var(--teal)",
  Reserved: "var(--ochre)",
  Sold: "var(--ink-soft)",
  "Not for Sale": "var(--violet)",
};

export function formatPrice(art: Artwork) {
  if (art.price == null) {
    return null;
  }

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: art.currency ?? "PHP",
    maximumFractionDigits: 0,
  }).format(art.price);
}

interface GalleryClientProps {
  initialArtworks: Artwork[];
  artists: Artist[];
  initialPagination: ArtworkPagination;
}

export default function GalleryClient({
  initialArtworks,
  artists,
  initialPagination,
}: GalleryClientProps) {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);

  const [currentPage, setCurrentPage] = useState(initialPagination.page);

  const [hasNextPage, setHasNextPage] = useState(initialPagination.hasNextPage);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [query, setQuery] = useState("");
  const [artistFilter, setArtistFilter] = useState("all");
  const [mediumFilter, setMediumFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const mediums = useMemo(
    () => Array.from(new Set(artworks.map((artwork) => artwork.medium))).sort(),
    [artworks],
  );

  const categories = useMemo(
    () =>
      Array.from(new Set(artworks.map((artwork) => artwork.category))).sort(),
    [artworks],
  );

  const statuses = useMemo(
    () => Array.from(new Set(artworks.map((artwork) => artwork.status))).sort(),
    [artworks],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return artworks.filter((art) => {
      const matchesQuery =
        !normalizedQuery || art.title.toLowerCase().includes(normalizedQuery);

      const matchesArtist =
        artistFilter === "all" || art.artist._id === artistFilter;

      const matchesMedium =
        mediumFilter === "all" || art.medium === mediumFilter;

      const matchesCategory =
        categoryFilter === "all" || art.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" || art.status === statusFilter;

      return (
        matchesQuery &&
        matchesArtist &&
        matchesMedium &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    artworks,
    query,
    artistFilter,
    mediumFilter,
    categoryFilter,
    statusFilter,
  ]);

  async function loadMoreArtworks() {
    if (!hasNextPage || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const nextPage = currentPage + 1;

      const response = await getArtworks({
        page: nextPage,
        limit: 10,
      });

      setArtworks((previous) => [...previous, ...response.artworks]);

      setCurrentPage(response.pagination.page);
      setHasNextPage(response.pagination.hasNextPage);
    } catch (error) {
      console.error("Failed to load more artworks:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    const element = document.getElementById("gallery-load-more");

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          void loadMoreArtworks();
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

  const selectClass =
    "border border-line bg-gesso px-3 py-2 font-mono-label text-[11px] uppercase focus:border-ink";

  return (
    <div>
      {/* Filters */}
      <div className="mb-12 flex flex-wrap items-center gap-3 border-y border-line py-5">
        <input
          type="search"
          placeholder="Search by title…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-[180px] flex-1 border border-line bg-gesso px-3 py-2 text-sm focus:border-ink"
          aria-label="Search artworks by title"
        />

        <select
          value={artistFilter}
          onChange={(event) => setArtistFilter(event.target.value)}
          className={selectClass}
          aria-label="Filter by artist"
        >
          <option value="all">All Artists</option>

          {artists.map((artist) => (
            <option key={artist._id} value={artist._id}>
              {artist.name}
            </option>
          ))}
        </select>

        <select
          value={mediumFilter}
          onChange={(event) => setMediumFilter(event.target.value)}
          className={selectClass}
          aria-label="Filter by medium"
        >
          <option value="all">All Mediums</option>

          {mediums.map((medium) => (
            <option key={medium} value={medium}>
              {medium}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className={selectClass}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className={selectClass}
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <span className="ml-auto font-mono-label text-[11px] uppercase text-ink-soft">
          {filtered.length} of {artworks.length}
        </span>
      </div>

      {/* Gallery */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink-soft">
          No pieces match those filters. Try clearing one.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((art, index) => {
            const price = formatPrice(art);

            return (
              <Link
                key={art._id}
                href={`/gallery/${art.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    fill
                    priority={index < 3}
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
                      {art.artist?.name} · {art.medium} · {art.year}
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
              </Link>
            );
          })}
        </div>
      )}

      {/* Lazy-load sentinel */}
      <div
        id="gallery-load-more"
        className="flex min-h-24 items-center justify-center"
        aria-hidden="true"
      >
        {isLoadingMore && (
          <span className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-ink-soft">
            Loading more artworks...
          </span>
        )}

        {!hasNextPage && artworks.length > 0 && (
          <span className="font-mono-label text-[11px] uppercase tracking-[0.16em] text-ink-soft">
            You&apos;ve reached the end.
          </span>
        )}
      </div>
    </div>
  );
}
