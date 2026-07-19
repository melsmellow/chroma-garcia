import Link from "next/link";
import PaletteStrip from "./PaletteStrip";

export default function Footer() {
  return (
    <footer className="bg-ink text-gesso mt-32">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <PaletteStrip className="mb-4" />
            <p className="font-display text-2xl max-w-sm">
              A working collective of Batangas artists, painting for their
              community.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-3 font-mono-label text-[11px] uppercase">
            <div className="flex flex-col gap-2">
              <span className="opacity-50">Visit</span>
              <Link href="/artists" className="hover:text-coral">
                Artists
              </Link>
              <Link href="/gallery" className="hover:text-coral">
                Gallery
              </Link>
              <Link href="/events" className="hover:text-coral">
                Events
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="opacity-50">Group</span>
              <Link href="/outreach" className="hover:text-coral">
                Outreach
              </Link>
              <Link href="/about" className="hover:text-coral">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-coral">
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="opacity-50">Follow</span>
              <a href="#" className="hover:text-coral">
                Instagram
              </a>
              <a href="#" className="hover:text-coral">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-gesso/15 pt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="font-mono-label text-[10px] uppercase opacity-60">
            <p>
              © {new Date().getFullYear()} Chroma Garcia Artist Group —
              Batangas, Philippines
            </p>
            <p className="mt-1">Est. 2019</p>
          </div>

          <div className="md:text-right">
            <p className="font-mono-label text-[10px] uppercase opacity-50">
              Website Developed By
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/melsmellow"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-coral"
              >
                Mel Carlo Iguis
              </a>

              <a
                href="https://melcarlo.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-coral"
              >
                Portfolio
              </a>

              <a
                href="mailto:you@email.com"
                className="transition-colors hover:text-coral"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
