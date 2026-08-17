import ArtistForm from "@/components/admin/ArtistForm";
import { getArtistBySlug } from "@/actions/artists";
import { notFound } from "next/navigation";

interface EditArtistPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditArtistPage({ params }: EditArtistPageProps) {
  const { slug } = await params;

  const artist = await getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  console.log(artist)

  return (
    <div className="mx-auto max-w-4xl">
      {/* Page Header */}
      <div className="border-b border-line pb-8">
        <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-coral">
          Management / Artists
        </p>

        <h1 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
          Edit Artist
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
          Update the artist&apos;s profile, biography, artistic style, and
          portfolio information.
        </p>
      </div>

      {/* Reusable Form */}
      <div className="mt-8">
        <ArtistForm mode="edit" initialData={artist} />
      </div>
    </div>
  );
}
