import type { Metadata } from "next";
import PaletteStrip from "@/components/PaletteStrip";
import { officers, partners } from "@/lib/data";

export const metadata: Metadata = { title: "About Us" };

const history = [
  {
    year: "2019",
    text: "Founded by Noel Garcia and three friends painting out of a rented Batangas garage.",
  },
  {
    year: "2021",
    text: "First barangay mural completed; Mira Santos joins and launches the youth workshop program.",
  },
  {
    year: "2023",
    text: "First charity auction, funding the group's ongoing art-supply scholarship.",
  },
  {
    year: "2026",
    text: "Now four core members, a rotating roster of volunteers, and a permanent studio space.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Hero */}
      <section className="max-w-3xl">
        <PaletteStrip className="mb-6" />

        <h1 className="font-display text-4xl md:text-5xl leading-none">
          About Us
        </h1>

        <p className="mt-4 text-xl leading-9 text-ink-soft">
          Chroma Garcia started as four artists sharing studio space. It has
          grown into a working outreach program dedicated to nurturing
          creativity, supporting young artists, and giving back to the
          community.
        </p>
      </section>

      {/* Story + Mission/Vision */}
      <section className="mt-24 grid lg:grid-cols-[1.6fr_1fr] gap-20">
        {/* Story */}
        <div>
          <span className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-coral">
            Our Story
          </span>

          <h2 className="mt-4 font-display text-4xl leading-tight">
            Building an artistic community in Batangas since 2019.
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-9 text-ink-soft">
            <p>
              Chroma Garcia was formed in Padre Garcia, Batangas in September
              2019 with the goal of promoting and supporting visual arts in the
              community. It was established by Mr. Joseph Albao, a dedicated
              mentor inspired by the Vice Versa Artist Group.
            </p>

            <p>
              Despite having limited resources, the group came together to build
              a supportive environment where aspiring artists could learn,
              collaborate, and develop their craft. Through workshops,
              exhibitions, outreach projects, and mentorship, members are
              encouraged to discover their potential while sharing their passion
              with others.
            </p>

            <p>
              Today, Chroma Garcia continues to create opportunities for artists
              to gain exposure, strengthen their skills, and contribute to the
              wider community. Respect, humility, collaboration, and service
              remain at the heart of everything the group does.
            </p>
          </div>
        </div>

        {/* Mission + Vision */}
        <div className="space-y-16">
          <div>
            <span className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-teal">
              Mission
            </span>

            <h3 className="mt-3 font-display text-3xl leading-tight">
              Empowering aspiring artists.
            </h3>

            <p className="mt-5 text-lg leading-8 text-ink-soft">
              To gather and support young and aspiring artists who are
              passionate about learning and growing in the field of visual arts.
              Chroma Garcia provides a welcoming community where artists can
              collaborate, discover opportunities, and develop both creatively
              and professionally.
            </p>
          </div>

          <div>
            <span className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-violet">
              Vision
            </span>

            <h3 className="mt-3 font-display text-3xl leading-tight">
              Inspiring creativity through community.
            </h3>

            <p className="mt-5 text-lg leading-8 text-ink-soft">
              To inspire individuals with artistic potential by promoting unity,
              humility, and respect. Every artist is valued equally and belongs
              to a supportive creative community where talent can flourish.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-32">
        <h2 className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-ink-soft border-b border-line pb-3">
          History
        </h2>

        <div className="mt-4 divide-y divide-line">
          {history.map((item) => (
            <div
              key={item.year}
              className="grid md:grid-cols-[140px_1fr] gap-8 py-8"
            >
              <span className="font-display text-4xl text-coral">
                {item.year}
              </span>

              <p className="text-lg leading-8 text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Officers */}
      <section className="mt-32">
        <h2 className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-ink-soft border-b border-line pb-3">
          Officers
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {officers.map((officer) => (
            <div key={officer.name}>
              <span
                className="inline-block size-3 rounded-full mb-4"
                style={{
                  backgroundColor: `var(--${officer.palette})`,
                }}
              />

              <h3 className="font-display text-2xl">{officer.name}</h3>

              <p className="mt-2 text-base text-ink-soft">{officer.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="mt-32">
        <h2 className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-ink-soft border-b border-line pb-3">
          Partners
        </h2>

        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
          {partners.map((partner) => (
            <span key={partner} className="font-display text-2xl text-ink-soft">
              {partner}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
