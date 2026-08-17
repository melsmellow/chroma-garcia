"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

const POLL_INTERVAL_MS = 5000

type PollStatus = "checking" | "waking" | "ready"

// Polls /api/health while the /waking-up page is open and redirects home as
// soon as the backend answers — no manual "Try Again" needed.
export default function WakeUpPoller() {
  const router = useRouter()
  const [status, setStatus] = useState<PollStatus>("checking")
  const redirectedRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    async function check() {
      let healthy = false

      try {
        const response = await fetch("/api/health", { cache: "no-store" })
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

      setStatus("waking")
    }

    check()
    const interval = setInterval(check, POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [router])

  return (
    <div className="mx-auto mt-10 max-w-md border-y border-line py-4">
      <div className="flex items-center justify-between font-mono-label text-xs uppercase tracking-[0.14em]">
        <span className="text-ink-soft">Server status</span>
        {status === "ready" ? (
          <span className="text-ink">Ready — heading home</span>
        ) : (
          <span className="animate-pulse text-coral">
            {status === "checking" ? "Checking" : "Waking up"}
          </span>
        )}
      </div>
    </div>
  )
}
