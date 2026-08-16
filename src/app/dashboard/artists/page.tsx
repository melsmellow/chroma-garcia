import { getArtists } from "@/actions/artists";

import { Button } from "@/components/ui/button";
import ArtistsTable from "@/components/admin/ArtistsTable";

import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminArtistsPage() {
  const initialData = await getArtists({
    page: 1,
    limit: 10,
  });

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-coral">
            Management
          </p>

          <h1 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
            Artists
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
            Manage artist profiles, biographies, styles, and portfolio
            information.
          </p>
        </div>

        <Button asChild className="bg-ink text-gesso hover:bg-coral">
          <Link href="/dashboard/artists/new">
            <Plus className="size-4" />
            Add Artist
          </Link>
        </Button>
      </div>

      <div className="mt-8">
        <ArtistsTable initialData={initialData} />
      </div>
    </div>
  );
}
