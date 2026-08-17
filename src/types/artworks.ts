export type ArtworkStatus = "Available" | "Reserved" | "Sold" | "Not for Sale";

export interface ArtworkArtist {
  _id: string;

  name: string;
  slug: string;
}
export interface ArtworkPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ArtworkArtistDetails extends ArtworkArtist {
  portraitUrl?: string;

  artStyle?: string;
  medium?: string;

  bio?: string;

  social?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export interface PaginatedArtworksResponse {
  artworks: Artwork[];
  pagination: ArtworkPagination;
}

export interface ArtworkArtistDetails extends ArtworkArtist {
  portraitUrl?: string;

  artStyle?: string;
  medium?: string;

  bio?: string;

  social?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export interface Artwork {
  _id: string;

  slug: string;
  title: string;

  artist: ArtworkArtist;

  imageUrl: string;

  medium: string;
  category: string;

  tags: string[];

  description: string;

  year: number;
  dimensions: string;

  palette?: string[];

  status: ArtworkStatus;

  price?: number;
  currency?: string;

  isFeatured: boolean;

  likeCount: number;

  createdAt: string;
  updatedAt: string;
}

export interface ArtworkDetails extends Omit<Artwork, "artist"> {
  artist: ArtworkArtistDetails;
}