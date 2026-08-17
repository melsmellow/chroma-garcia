import { notFound } from "next/navigation";

import { getArtists } from "@/actions/artists";
import { getArtworkBySlug } from "@/actions/artworks";

import ArtworkForm from "@/components/admin/ArtworkForm";

interface EditArtworkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditArtworkPage({
  params,
}: EditArtworkPageProps) {
  const { slug } = await params;

  const [artworkResponse, artistsResponse] = await Promise.all([
    getArtworkBySlug(slug),
    getArtists({
      page: 1,
      limit: 50,
    }),
  ]);

  const artwork = artworkResponse.artwork;

  if (!artwork) {
    notFound();
  }

  const artistOptions = artistsResponse.artists.map((artist) => ({
    _id: artist._id,
    name: artist.name,
  }));

  return (
    <div className="mx-auto max-w-5xl">
      {/* Page Header */}
      <div className="border-b border-line pb-8">
        <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-coral">
          Management
        </p>

        <h1 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
          Edit Artwork
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
          Update the artwork details, image, availability, and gallery
          information.
        </p>
      </div>

      {/* Artwork Form */}
      <div className="mt-8">
        <ArtworkForm
          mode="edit"
          initialData={artwork}
          artists={artistOptions}
        />
      </div>
    </div>
  );
}
