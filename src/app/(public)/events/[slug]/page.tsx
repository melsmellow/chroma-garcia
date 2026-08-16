import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AbstractArt from "@/components/AbstractArt";
import { events, getEvent } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  return { title: event ? event.title : "Event" };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link
        href="/events"
        className="font-mono-label text-[11px] uppercase text-ink-soft hover:text-coral"
      >
        ← All Events
      </Link>

      <div className="mt-10 grid sm:grid-cols-[1fr_1.2fr] gap-10 items-start">
        <div className="aspect-square">
          <AbstractArt seed={event.slug} palette={event.palette} className="w-full h-full" />
        </div>
        <div>
          <span
            className="font-mono-label text-[11px] uppercase"
            style={{ color: `var(--${event.palette})` }}
          >
            {event.status}
          </span>
          <h1 className="font-display text-4xl mt-2 leading-tight">
            {event.title}
          </h1>
          <p className="mt-6 text-ink-soft text-lg">{event.description}</p>

          <dl className="mt-8 space-y-3 font-mono-label text-[11px] uppercase border-t border-line pt-6">
            <div className="flex gap-4">
              <dt className="text-ink-soft w-24 shrink-0">Date</dt>
              <dd>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-ink-soft w-24 shrink-0">Time</dt>
              <dd>{event.time}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-ink-soft w-24 shrink-0">Location</dt>
              <dd>{event.location}</dd>
            </div>
          </dl>

          {event.status === "Upcoming" && (
            <Link
              href="/contact"
              className="mt-8 inline-flex bg-ink text-gesso px-6 py-3 font-mono-label text-[11px] uppercase hover:bg-coral transition-colors"
            >
              RSVP / Ask a question
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
