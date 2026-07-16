import type { Metadata } from "next";
import PaletteStrip from "@/components/PaletteStrip";
import ContactForm from "./contact-form";

export const metadata: Metadata = { title: "Contact" };

const details = [
  { label: "Email", value: "hello@chromagarcia.art", href: "mailto:hello@chromagarcia.art" },
  { label: "Instagram", value: "@chromagarcia.art", href: "#" },
  { label: "Facebook", value: "/chromagarciaartistgroup", href: "#" },
  { label: "Location", value: "Taguig, Metro Manila, Philippines", href: undefined },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <PaletteStrip className="mb-6" />
      <h1 className="font-display text-5xl">Contact</h1>
      <p className="mt-4 text-ink-soft max-w-xl">
        Questions about joining, booking a workshop, or supporting the next
        auction — send a message and we'll follow up.
      </p>

      <div className="mt-16 grid md:grid-cols-[1fr_1.2fr] gap-16">
        <dl className="space-y-8">
          {details.map((d) => (
            <div key={d.label}>
              <dt className="font-mono-label text-[11px] uppercase text-ink-soft">
                {d.label}
              </dt>
              <dd className="mt-1 font-display text-xl">
                {d.href ? (
                  <a href={d.href} className="hover:text-coral">
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <ContactForm />
      </div>
    </div>
  );
}
