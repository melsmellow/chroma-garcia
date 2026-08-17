import { getArtists } from "@/actions/artists";

import ArtworkForm from "@/components/admin/ArtworkForm";

export default async function NewArtworkPage() {
  const { artists } = await getArtists({
    page: 1,
    limit: 50,
  });

  const artistOptions = artists.map((artist) => ({
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
          Add Artwork
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
          Add a new artwork to the gallery and assign it to an artist.
        </p>
      </div>

      {/* Artwork Form */}
      <div className="mt-8">
        <ArtworkForm
          mode="create"
          artists={artistOptions}
        />
      </div>
    </div>
  );
}