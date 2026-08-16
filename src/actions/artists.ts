"use server";

import { auth } from "@/auth";

const API_URL = process.env.API_URL;
export interface ArtistSocial {
  instagram?: string;
  facebook?: string;
  website?: string;
}

export interface Artist {
  _id: string;
  slug: string;
  name: string;
  artStyle: string;
  medium: string;
  bio: string;
  palette: string[];
  social?: ArtistSocial;
  portraitUrl?: string;
}

export interface GetArtistsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedArtistsResponse {
  artists: Artist[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateArtistResponse {
  message: string;
  artist: Artist;
}

export type DeleteArtistResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function deleteArtist(
  artistId: string,
): Promise<DeleteArtistResult> {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return {
        success: false,
        message: "You are not authorized to perform this action.",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/api/admin/artists/${artistId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    console.log(response);

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      return {
        success: false,
        message: "The server returned an invalid response.",
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete artist.",
      };
    }

    return {
      success: true,
      message: data.message || "Artist deleted successfully.",
    };
  } catch (error) {
    console.error("Delete artist server action error:", error);

    return {
      success: false,
      message: "Something went wrong while deleting the artist.",
    };
  }
}

export async function createArtist(formData: FormData) {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API_URL}/api/admin/artists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: formData,
  });

  console.log(response);
  const contentType = response.headers.get("content-type");

  console.log("CREATE ARTIST STATUS:", response.status);
  console.log("CREATE ARTIST CONTENT TYPE:", contentType);
  console.log("CREATE ARTIST URL:", response.url);

  const responseText = await response.text();

  console.log("CREATE ARTIST RESPONSE:", responseText);

  let data;

  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error(
      `API returned an invalid response. Status: ${response.status}`,
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to create artist.");
  }

  return data;
}

export async function getArtists(
  params: GetArtistsParams = {},
): Promise<PaginatedArtistsResponse> {
  const { page = 1, limit = 10, search = "" } = params;

  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    searchParams.set("search", search.trim());
  }

  try {
    const session = await auth();

    const response = await fetch(
      `${API_URL}/api/artists?${searchParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(session?.accessToken
            ? {
                Authorization: `Bearer ${session.accessToken}`,
              }
            : {}),
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(errorData?.message || "Failed to fetch artists.");
    }

    return response.json();
  } catch (error) {
    console.error("Get artists error:", error);

    throw error instanceof Error ? error : new Error("Unable to load artists.");
  }
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/artists/${slug}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.artist;
  } catch (error) {
    console.error("Get artist error:", error);

    return null;
  }
}

export async function updateArtist(
  id: string,
  formData: FormData,
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return {
        success: false,
        message: "Unauthorized. Please log in again.",
      };
    }

    const response = await fetch(`${process.env.API_URL}/api/admin/artists/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    console.log(response)
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message ?? "Failed to update artist.",
      };
    }

    return {
      success: true,
      message: data.message ?? "Artist updated successfully.",
    };
  } catch (error) {
    console.error("Update artist server action error:", error);

    return {
      success: false,
      message: "Something went wrong while updating the artist.",
    };
  }
}
