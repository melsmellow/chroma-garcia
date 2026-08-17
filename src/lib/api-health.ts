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

// The proxy and route handlers are bundled separately by Next, so a plain
// module-level variable would exist once per bundle and they'd never see
// each other's probes. Backing the cache with globalThis (keyed via
// Symbol.for so every bundle computes the same key) gives the whole server
// process a single shared view of the backend's health.
const stateKey = Symbol.for("chroma-garcia.api-health")
const globalStore = globalThis as typeof globalThis & {
  [stateKey]?: ApiState
}

function getState(): ApiState | null {
  return globalStore[stateKey] ?? null
}

function setState(state: ApiState) {
  globalStore[stateKey] = state
}

export function isFresh(state: ApiState, ttlMs: number) {
  return Date.now() - state.checkedAt < ttlMs
}

export function getCachedApiState() {
  return getState()
}

export function markApiState(ok: boolean) {
  setState({ ok, checkedAt: Date.now() })
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
