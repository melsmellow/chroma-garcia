import type { Metadata } from "next";

import { getArtists } from "@/actions/artists";
import { getArtworks } from "@/actions/artworks";

import PaletteStrip from "@/components/PaletteStrip";

import GalleryClient from "./gallery-client";

export const metadata: Metadata = {
  title: "Gallery",
};

export default async function GalleryPage() {
  const [artworksResponse, artistsResponse] = await Promise.all([
    getArtworks({
      page: 1,
      limit: 10,
    }),
    getArtists({
      page: 1,
      limit: 1000,
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <PaletteStrip className="mb-6" />

      <h1 className="font-display text-4xl leading-none md:text-5xl">
        Gallery
      </h1>

      <p className="mt-4 text-xl leading-9 text-ink-soft">
        Every piece, from every member, in one place. Search or filter to find
        your way around.
      </p>

      <div className="mt-12">
         <GalleryClient
          initialArtworks={artworksResponse.artworks}
          artists={artistsResponse.artists}
          initialPagination={artworksResponse.pagination}
        />
      </div>
    </div>
  );
}