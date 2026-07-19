"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-gesso/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <PaletteStrip dotClassName="size-2 transition-transform group-hover:scale-110" />

          <span className="font-display text-lg tracking-tight">
            Chroma Garcia
          </span>
        </Link>

        {/* Desktop Nav */}
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
                  "relative py-1 text-sm transition-colors",
                  active
                    ? "font-semibold text-coral"
                    : "font-medium text-ink-soft hover:text-ink"
                )}
              >
                {link.label}

                <span
                  className={clsx(
                    "absolute -bottom-[18px] left-0 h-[2px] bg-coral transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center border border-ink px-4 py-2 text-xs font-semibold uppercase tracking-wider transition hover:bg-ink hover:text-gesso"
        >
          Join Us
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? (
            <X size={24} strokeWidth={2} />
          ) : (
            <Menu size={24} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "overflow-hidden border-t border-line bg-gesso transition-all duration-300 md:hidden",
          open ? "max-h-[500px]" : "max-h-0 border-transparent"
        )}
      >
        <nav className="flex flex-col px-6 py-4">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "border-b border-line py-4 text-base transition-colors",
                  active
                    ? "font-semibold text-coral"
                    : "text-ink hover:text-coral"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex justify-center border border-ink px-5 py-3 text-sm font-semibold uppercase tracking-wider transition hover:bg-ink hover:text-gesso"
          >
            Join Us
          </Link>
        </nav>
      </div>
    </header>
  );
}