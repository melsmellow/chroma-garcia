"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

const POLL_INTERVAL_MS = 5000

// Stop auto-checking after this many consecutive failures (initial check
// plus 5s intervals ≈ 45s) so an abandoned tab doesn't poll forever. "Try
// Again" restarts the cycle: it re-enters through the proxy, which re-probes,
// and bounces back here for a fresh round if the backend is still down.
const MAX_POLL_FAILURES = 10

// Client-side ceiling; /api/health answers within the server-side probe
// timeout, but don't let a hung connection stack up on the interval.
const CHECK_TIMEOUT_MS = 10_000

type PollStatus = "checking" | "waking" | "ready" | "paused"

// Polls /api/health while the /waking-up page is open and redirects home as
// soon as the backend answers. Gives up quietly after MAX_POLL_FAILURES
// consecutive failures and hands off to the manual "Try Again" link.
export default function WakeUpPoller() {
  const router = useRouter()
  const [status, setStatus] = useState<PollStatus>("checking")
  const redirectedRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    let failures = 0

    async function check() {
      if (cancelled || redirectedRef.current) {
        return
      }

      let healthy = false

      try {
        const response = await fetch("/api/health", {
          cache: "no-store",
          signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
        })
        healthy = response.ok
      } catch {
        healthy = false
      }

      if (cancelled || redirectedRef.current) {
        return
      }

      if (healthy) {
        redirectedRef.current = true
        setStatus("ready")
        router.replace("/")
        return
      }

      failures += 1

      if (failures >= MAX_POLL_FAILURES) {
        // Backend is properly down, not just cold — stop polling and let
        // the manual "Try Again" link drive any further attempts.
        clearInterval(timer)
        setStatus("paused")
        cancelled = true
        return
      }

      setStatus("waking")
    }

    check()
    const timer = setInterval(check, POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [router])

  return (
    <div className="mx-auto mt-10 max-w-md border-y border-line py-4">
      <div className="flex items-center justify-between font-mono-label text-xs uppercase tracking-[0.14em]">
        <span className="text-ink-soft">Server status</span>
        {status === "ready" ? (
          <span className="text-ink">Ready — heading home</span>
        ) : status === "paused" ? (
          <span className="text-ink-soft">Still napping — try again</span>
        ) : (
          <span className="animate-pulse text-coral">
            {status === "checking" ? "Checking" : "Waking up"}
          </span>
        )}
      </div>
    </div>
  )
}
