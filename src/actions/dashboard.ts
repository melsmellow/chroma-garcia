"use server";

import { auth } from "@/auth";

const API_URL = process.env.API_URL;

export interface DashboardStats {
  artists: number;
  artworks: number;
  events: number;
  outreach: number;
}

export interface GetDashboardStatsResponse {
  stats: DashboardStats;
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
 * GET /api/admin/dashboard/stats
 */
export async function getDashboardStats(): Promise<GetDashboardStatsResponse> {
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}/api/admin/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}
