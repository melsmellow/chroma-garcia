import { NextResponse, type NextRequest } from "next/server"

import {
  HEALTHY_TTL_MS,
  WAKING_TTL_MS,
  getCachedApiState,
  isFresh,
  markApiState,
  probeApi,
} from "@/lib/api-health"

/**
 * Cold-start gatekeeper.
 *
 * The backend (chroma-garcia-api on Fly.io) auto-suspends when idle and can
 * take several seconds to boot. Pages that fetch from it at render time
 * would hang until the fetch times out. Instead, this proxy probes the
 * backend's /health endpoint before letting requests through to the
 * API-dependent public pages:
 *
 *   - probe OK     -> request continues (trusted for HEALTHY_TTL_MS)
 *   - probe failed -> redirect to /waking-up (remembered for WAKING_TTL_MS)
 *
 * The /waking-up page polls /api/health (which shares this state), so once
 * the backend recovers, redirects from there to "/" pass straight through.
 */

export async function proxy(request: NextRequest) {
  const state = getCachedApiState()

  // Recently confirmed healthy — pass through with zero added latency.
  if (state?.ok && isFresh(state, HEALTHY_TTL_MS)) {
    return NextResponse.next()
  }

  // Recently confirmed down — bounce to the wake-up page without
  // re-probing while the machine is still booting.
  if (state && !state.ok && isFresh(state, WAKING_TTL_MS)) {
    return NextResponse.redirect(new URL("/waking-up", request.url))
  }

  // Unknown or stale — probe now.
  const ok = await probeApi()
  markApiState(ok)

  if (!ok) {
    return NextResponse.redirect(new URL("/waking-up", request.url))
  }

  return NextResponse.next()
}

// Only the public pages that fetch from the API at render time. This keeps
// the probe off static assets, /waking-up itself (no redirect loop), the
// dashboard, and pages that don't need the backend.
export const config = {
  matcher: ["/", "/artists", "/gallery"],
}
