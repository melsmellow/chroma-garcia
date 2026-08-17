import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getArtworkBySlug } from "@/actions/artworks";

import type { ArtworkDetails as ArtworkDetailsType } from "@/types/artworks";
import ArtworkDetails from "@/components/admin/ArtworkDetails";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await getArtworkBySlug(slug);

    return {
      title: `${data.artwork.title} — ${data.artwork.artist.name}`,
    };
  } catch {
    return {
      title: "Artwork",
    };
  }
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;

  let artwork: ArtworkDetailsType;

  try {
    const data = await getArtworkBySlug(slug);

    artwork = data.artwork;
  } catch (error) {
    console.error(`Failed to load artwork "${slug}":`, error);

    notFound();
  }

  return <ArtworkDetails artwork={artwork} />;
}
