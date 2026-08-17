"use server";

import { auth } from "@/auth";

import type {
  Artwork,
  ArtworkPagination,
  PaginatedArtworksResponse,
} from "@/types/artworks";
import { Artist } from "./artists";

const API_URL = process.env.API_URL;

interface GetArtworksParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetArtworksByArtistParams {
  page?: number;
  limit?: number;
}

export interface GetArtworkResponse {
  artwork: Artwork;
}

interface ArtworksByArtistResponse {
  artist: Artist;
  artworks: Artwork[];
  pagination: ArtworkPagination;
}

interface ArtworkMutationResponse {
  success: boolean;
  message: string;
  artwork?: Artwork;
}

interface ApiErrorResponse {
  message?: string;
}

function getErrorMessage(data: unknown): string {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }

  return "Something went wrong.";
}

async function getAuthToken(): Promise<string> {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Unauthorized.");
  }

  return session.accessToken;
}

/**
 * GET /api/artworks
 */
export async function getArtworks({
  page = 1,
  limit = 10,
  search = "",
}: GetArtworksParams = {}): Promise<PaginatedArtworksResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const response = await fetch(`${API_URL}/api/artworks?${params.toString()}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}

/**
 * GET /api/artworks/:slug
 */
export async function getArtworkBySlug(slug: string): Promise<GetArtworkResponse> {
  const response = await fetch(`${API_URL}/api/artworks/${slug}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch artwork");
  }

  return data;
}
/**
 * GET /api/artworks/artist/:slug/artworks
 */
export async function getArtworksByArtistSlug(
  slug: string,
  { page = 1, limit = 10 }: GetArtworksByArtistParams = {},
): Promise<ArtworksByArtistResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(
    `${API_URL}/api/artworks/artists/${slug}/artworks?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}

export interface GetFeaturedArtworksResponse {
  artworks: Artwork[];
}

/**
 * GET /api/artworks/featured
 */
export async function getFeaturedArtworks(): Promise<GetFeaturedArtworksResponse> {
  const response = await fetch(`${API_URL}/api/artworks/featured`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}

/**
 * POST /api/admin/artworks
 */
export async function createArtwork(
  formData: FormData,
): Promise<ArtworkMutationResponse> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_URL}/api/admin/artworks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to create artwork.",
      };
    }

    return {
      success: true,
      message: data.message || "Artwork created successfully.",
      artwork: data.artwork,
    };
  } catch (error) {
    console.error("Create artwork action error:", error);

    return {
      success: false,
      message: "Something went wrong while creating the artwork.",
    };
  }
}

/**
 * PATCH /api/admin/artworks/:id
 */
export async function updateArtwork(
  id: string,
  formData: FormData,
): Promise<ArtworkMutationResponse> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_URL}/api/admin/artworks/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log("response", response)

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update artwork.",
      };
    }

    return {
      success: true,
      message: data.message || "Artwork updated successfully.",
      artwork: data.artwork,
    };
  } catch (error) {
    console.error("Update artwork action error:", error);

    return {
      success: false,
      message: "Something went wrong while updating the artwork.",
    };
  }
}

/**
 * DELETE /api/admin/artworks/:id
 */
export async function deleteArtwork(
  id: string,
): Promise<ArtworkMutationResponse> {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_URL}/api/admin/artworks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete artwork.",
      };
    }

    return {
      success: true,
      message: data.message || "Artwork deleted successfully.",
    };
  } catch (error) {
    console.error("Delete artwork action error:", error);

    return {
      success: false,
      message: "Something went wrong while deleting the artwork.",
    };
  }
}
