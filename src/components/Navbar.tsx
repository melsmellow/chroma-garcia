"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-gesso/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3">
          <PaletteStrip dotClassName="size-2 transition-transform group-hover:scale-110" />

          <span className="font-display text-lg tracking-tight">
            Chroma Garcia
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative py-1 text-sm transition-all duration-200",
                  active
                    ? "font-semibold text-coral"
                    : "font-medium text-ink-soft hover:text-ink"
                )}
              >
                {link.label}

                <span
                  className={clsx(
                    "absolute -bottom-[18px] left-0 h-[2px] rounded-full bg-coral transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden items-center border border-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-ink hover:text-gesso md:inline-flex"
        >
          Join Us
        </Link>

        <nav className="flex items-center gap-4 md:hidden">
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}