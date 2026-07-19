"use client";

import WallLabel from "@/components/WallLabel";
import { artists, artworks, getArtist, type Artwork } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export const statusColor: Record<Artwork["status"], string> = {
  Available: "var(--teal)",
  Reserved: "var(--ochre)",
  Sold: "var(--ink-soft)",
  "Not for Sale": "var(--violet)",
};

export function formatPrice(art: Artwork) {
  if (!art.price) return null;
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: art.currency ?? "PHP",
    maximumFractionDigits: 0,
  }).format(art.price);
}

export default function GalleryClient() {
  const [query, setQuery] = useState("");
  const [artistFilter, setArtistFilter] = useState("all");
  const [mediumFilter, setMediumFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const mediums = useMemo(
    () => Array.from(new Set(artworks.map((a) => a.medium))).sort(),
    [],
  );
  const categories = useMemo(
    () => Array.from(new Set(artworks.map((a) => a.category))).sort(),
    [],
  );
  const statuses = useMemo(
    () => Array.from(new Set(artworks.map((a) => a.status))).sort(),
    [],
  );

  const filtered = artworks.filter((art) => {
    const matchesQuery = art.title.toLowerCase().includes(query.toLowerCase());
    const matchesArtist =
      artistFilter === "all" || art.artistSlug === artistFilter;
    const matchesMedium = mediumFilter === "all" || art.medium === mediumFilter;
    const matchesCategory =
      categoryFilter === "all" || art.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || art.status === statusFilter;
    return (
      matchesQuery &&
      matchesArtist &&
      matchesMedium &&
      matchesCategory &&
      matchesStatus
    );
  });

  const selectClass =
    "border border-line bg-gesso px-3 py-2 font-mono-label text-[11px] uppercase focus:border-ink";

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center border-y border-line py-5 mb-12">
        <input
          type="search"
          placeholder="Search by title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-line bg-gesso px-3 py-2 text-sm flex-1 min-w-[180px] focus:border-ink"
          aria-label="Search artworks by title"
        />
        <select
          value={artistFilter}
          onChange={(e) => setArtistFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by artist"
        >
          <option value="all">All Artists</option>
          {artists.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.name}
            </option>
          ))}
        </select>
        <select
          value={mediumFilter}
          onChange={(e) => setMediumFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by medium"
        >
          <option value="all">All Mediums</option>
          {mediums.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="font-mono-label text-[11px] uppercase text-ink-soft ml-auto">
          {filtered.length} of {artworks.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-soft py-20 text-center">
          No pieces match those filters. Try clearing one.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((art, index) => {
            const price = formatPrice(art);
            return (
              <Link
                key={art.id}
                href={`/artists/${art.artistSlug}`}
                className="group block"
              >
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
                      {getArtist(art.artistSlug)?.name} · {art.medium} ·{" "}
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
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
