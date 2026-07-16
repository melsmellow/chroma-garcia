import type { Metadata } from "next";
import PaletteStrip from "@/components/PaletteStrip";
import { officers, partners } from "@/lib/data";

export const metadata: Metadata = { title: "About Us" };

const history = [
  { year: "2019", text: "Founded by Noel Garcia and three friends painting out of a rented Taguig garage." },
  { year: "2021", text: "First barangay mural completed; Mira Santos joins and launches the youth workshop program." },
  { year: "2023", text: "First charity auction, funding the group's ongoing art-supply scholarship." },
  { year: "2026", text: "Now four core members, a rotating roster of volunteers, and a permanent studio space." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <PaletteStrip className="mb-6" />
      <h1 className="font-display text-5xl">About Us</h1>
      <p className="mt-4 text-ink-soft max-w-xl">
        Chroma Garcia started as four artists sharing studio space. It's
        grown into a working outreach program — this is the story so far.
      </p>

      {/* Story */}
      <div className="mt-16 grid md:grid-cols-2 gap-14">
        <div>
          <span className="font-mono-label text-[11px] uppercase text-coral">Our Story</span>
          <p className="mt-3 text-ink-soft leading-relaxed">
            Chroma Garcia began in a rented garage in Taguig, where Noel
            Garcia and three friends split rent for shared studio space.
            What started as a way to afford canvas and paint turned into a
            standing commitment: every show the group held would put
            something back into the neighborhood around it.
          </p>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Today the group runs on the same principle at a larger scale —
            weekend workshops, community murals, and an annual auction that
            funds an ongoing scholarship for art supplies.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <span className="font-mono-label text-[11px] uppercase text-teal">Mission</span>
            <p className="mt-2 text-sm text-ink-soft">
              Put professional art practice to work in the community.
            </p>
          </div>
          <div>
            <span className="font-mono-label text-[11px] uppercase text-violet">Vision</span>
            <p className="mt-2 text-sm text-ink-soft">
              A Metro Manila where every barangay has working artists in it.
            </p>
          </div>
        </div>
      </div>

      {/* History timeline */}
      <div className="mt-24">
        <h2 className="font-mono-label text-[11px] uppercase text-ink-soft border-b border-line pb-3">
          History
        </h2>
        <div className="mt-2 divide-y divide-line">
          {history.map((h) => (
            <div key={h.year} className="grid sm:grid-cols-[100px_1fr] gap-4 py-6">
              <span className="font-display text-2xl text-coral">{h.year}</span>
              <p className="text-ink-soft">{h.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Officers */}
      <div className="mt-24">
        <h2 className="font-mono-label text-[11px] uppercase text-ink-soft border-b border-line pb-3">
          Officers
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {officers.map((o) => (
            <div key={o.name}>
              <span
                className="inline-block size-2.5 rounded-full mb-3"
                style={{ backgroundColor: `var(--${o.palette})` }}
                aria-hidden="true"
              />
              <h3 className="font-display text-xl">{o.name}</h3>
              <p className="text-sm text-ink-soft mt-1">{o.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div className="mt-24 mb-8">
        <h2 className="font-mono-label text-[11px] uppercase text-ink-soft border-b border-line pb-3">
          Partners
        </h2>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
          {partners.map((p) => (
            <span key={p} className="font-display text-lg text-ink-soft">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
