import { NextResponse } from "next/server"

import {
  HEALTHY_TTL_MS,
  getCachedApiState,
  isFresh,
  markApiState,
  probeApi,
} from "@/lib/api-health"

// Same-origin health endpoint polled by the /waking-up page. Probing our own
// origin keeps API_URL server-side and sidesteps CORS on the backend. A
// successful poll also flips the shared cache the proxy reads, so the
// follow-up navigation to "/" passes straight through.
export const dynamic = "force-dynamic"

export async function GET() {
  const state = getCachedApiState()

  if (state?.ok && isFresh(state, HEALTHY_TTL_MS)) {
    return NextResponse.json({ status: "ok" })
  }

  // Always probe when we're not sitting on a fresh success — the whole point
  // of this endpoint is detecting recovery quickly.
  const ok = await probeApi()
  markApiState(ok)

  if (!ok) {
    return NextResponse.json({ status: "waking-up" }, { status: 503 })
  }

  return NextResponse.json({ status: "ok" })
}
