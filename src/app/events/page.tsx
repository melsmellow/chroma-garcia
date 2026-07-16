import Link from "next/link";
import type { Metadata } from "next";
import PaletteStrip from "@/components/PaletteStrip";
import { events } from "@/lib/data";

export const metadata: Metadata = { title: "Events" };

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventsPage() {
  const upcoming = events
    .filter((e) => e.status === "Upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = events
    .filter((e) => e.status === "Past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <PaletteStrip className="mb-6" />
      <h1 className="font-display text-5xl">Events</h1>
      <p className="mt-4 text-ink-soft max-w-xl">
        Workshops, tree-planting days, exhibits, and the annual auction —
        schedules and locations below.
      </p>

      <h2 className="font-mono-label text-[11px] uppercase text-ink-soft mt-16 mb-6 pb-3 border-b border-line">
        Upcoming
      </h2>
      <div className="divide-y divide-line">
        {upcoming.map((event) => (
          <Link
            key={event.slug}
            href={`/events/${event.slug}`}
            className="group grid sm:grid-cols-[140px_1fr_auto] gap-4 sm:items-center py-7"
          >
            <span
              className="font-mono-label text-xs uppercase"
              style={{ color: `var(--${event.palette})` }}
            >
              {formatDate(event.date)}
            </span>
            <div>
              <h3 className="font-display text-2xl group-hover:text-coral transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-ink-soft mt-1">
                {event.time} — {event.location}
              </p>
            </div>
            <span className="hidden sm:inline font-mono-label text-[11px] uppercase text-ink-soft group-hover:text-coral">
              Details →
            </span>
          </Link>
        ))}
      </div>

      {past.length > 0 && (
        <>
          <h2 className="font-mono-label text-[11px] uppercase text-ink-soft mt-16 mb-6 pb-3 border-b border-line">
            Past
          </h2>
          <div className="divide-y divide-line opacity-70">
            {past.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="grid sm:grid-cols-[140px_1fr] gap-4 sm:items-center py-6"
              >
                <span className="font-mono-label text-xs uppercase text-ink-soft">
                  {formatDate(event.date)}
                </span>
                <h3 className="font-display text-xl">{event.title}</h3>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
