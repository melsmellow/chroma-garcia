"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AbstractArt from "@/components/AbstractArt";
import WallLabel from "@/components/WallLabel";
import { artists, artworks, getArtist } from "@/lib/data";
import Image from "next/image";
import { SAMPLE_IMAGES_FOR_GALERY } from "@/constants/mockData";

export default function GalleryClient() {
  const [query, setQuery] = useState("");
  const [artistFilter, setArtistFilter] = useState("all");
  const [mediumFilter, setMediumFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const mediums = useMemo(
    () => Array.from(new Set(artworks.map((a) => a.medium))).sort(),
    []
  );
  const categories = useMemo(
    () => Array.from(new Set(artworks.map((a) => a.category))).sort(),
    []
  );

  const filtered = artworks.filter((art) => {
    const matchesQuery = art.title.toLowerCase().includes(query.toLowerCase());
    const matchesArtist = artistFilter === "all" || art.artistSlug === artistFilter;
    const matchesMedium = mediumFilter === "all" || art.medium === mediumFilter;
    const matchesCategory = categoryFilter === "all" || art.category === categoryFilter;
    return matchesQuery && matchesArtist && matchesMedium && matchesCategory;
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
          {filtered.map((art, idx) => (
            <Link key={art.id} href={`/artists/${art.artistSlug}`} className="group block">
          <div className="relative aspect-[4/5] overflow-hidden">
      <Image
        src={SAMPLE_IMAGES_FOR_GALERY[idx]}
        alt={art.title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
      />
    </div>
              <div className="mt-3">
                <WallLabel
                  title={art.title}
                  meta={`${getArtist(art.artistSlug)?.name} — ${art.medium}, ${art.year}`}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
