import ArtistForm from "@/components/admin/ArtistForm";

export default function NewArtistPage() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}

      <div className="border-b border-line pb-8">
        <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-coral">
          Management / Artists
        </p>

        <h1 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
          Add Artist
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
          Create a new artist profile and add their biography, artistic style,
          portfolio information, and social links.
        </p>
      </div>

      {/* Form */}

      <div className="mt-8">
        <ArtistForm mode="create" />
      </div>
    </div>
  );
}