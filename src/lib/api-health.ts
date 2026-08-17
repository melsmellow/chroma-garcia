const HEALTH_PATH = "/health"

// How long a successful probe is trusted before re-checking.
export const HEALTHY_TTL_MS = 60_000

// How long we keep treating the API as down without re-probing after a
// failure, so a cold machine isn't hammered on every request while it boots.
export const WAKING_TTL_MS = 10_000

// Probe budget: long enough to give a cold machine a chance to answer,
// short enough that visitors aren't left hanging.
export const PROBE_TIMEOUT_MS = 8_000

type ApiState = {
  ok: boolean
  checkedAt: number
}

// Best-effort, in-process cache shared by the proxy and /api/health. If the
// process restarts we simply re-probe.
let apiState: ApiState | null = null

export function isFresh(state: ApiState, ttlMs: number) {
  return Date.now() - state.checkedAt < ttlMs
}

export function getCachedApiState() {
  return apiState
}

export function markApiState(ok: boolean) {
  apiState = { ok, checkedAt: Date.now() }
}

export async function probeApi(): Promise<boolean> {
  const apiUrl = process.env.API_URL

  // No API configured (e.g. during CI) — don't block the request.
  if (!apiUrl) {
    return true
  }

  try {
    const response = await fetch(`${apiUrl}${HEALTH_PATH}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    })

    return response.ok
  } catch {
    return false
  }
}
