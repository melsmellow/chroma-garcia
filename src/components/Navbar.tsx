import Link from "next/link";
import PaletteStrip from "./PaletteStrip";

const links = [
  { href: "/artists", label: "Artists" },
  { href: "/gallery", label: "Gallery" },
  { href: "/outreach", label: "Outreach" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gesso/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <PaletteStrip dotClassName="size-2 group-hover:scale-110 transition-transform" />
          <span className="font-display text-lg tracking-tight">
            Chroma Garcia
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 font-mono-label text-[11px] uppercase">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink-soft hover:text-coral transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center border border-ink px-4 py-2 font-mono-label text-[11px] uppercase hover:bg-ink hover:text-gesso transition-colors"
        >
          Join Us
        </Link>
        {/* Mobile: simple link list, no JS menu needed at this scale */}
        <nav className="md:hidden flex items-center gap-4 font-mono-label text-[10px] uppercase">
          <Link href="/gallery" className="text-ink-soft">Gallery</Link>
          <Link href="/contact" className="text-ink-soft">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
