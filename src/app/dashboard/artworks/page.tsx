import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import Link from "next/link";
import { getArtworks } from "@/actions/artworks";
import ArtworksTable from "@/components/admin/ArtworksTable";

export default async function AdminArtworksPage() {
  const initialData = await getArtworks({
    page: 1,
    limit: 10,
  });

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-coral">
            Management
          </p>

          <h1 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
            Artworks
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
            Manage artwork details, artists, categories, images, and gallery
            information.
          </p>
        </div>

        <Button asChild className="bg-ink text-gesso hover:bg-coral">
          <Link href="/dashboard/artworks/new">
            <Plus className="size-4" />
            Add Artwork
          </Link>
        </Button>
      </div>

      <div className="mt-8">
        <ArtworksTable initialData={initialData} />
      </div>
    </div>
  );
}
