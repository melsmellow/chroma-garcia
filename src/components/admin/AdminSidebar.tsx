"use client";

import {
  CalendarDays,
  ExternalLink,
  Images,
  LayoutDashboard,
  Palette,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Artists",
    href: "/dashboard/artists",
    icon: Users,
  },
  {
    name: "Artworks",
    href: "/dashboard/artworks",
    icon: Palette,
  },
  {
    name: "Events",
    href: "/dashboard/events",
    icon: CalendarDays,
  },
  {
    name: "Gallery",
    href: "/dashboard/gallery",
    icon: Images,
  },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      <div aria-hidden="true" onClick={onClose} />

      <aside
        className={`
    fixed left-0 top-0 z-50
    flex h-dvh
    w-[85vw] max-w-72
    flex-col
    border-r border-line
    bg-gesso
    shadow-xl
    transition-transform duration-300 ease-out

    ${isOpen ? "translate-x-0" : "-translate-x-full"}

    lg:w-64
    lg:max-w-none
    lg:translate-x-0
    lg:shadow-none
  `}
      >
        {/* Brand */}
        <div className="border-b border-line px-5 py-5">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <span className="flex gap-1">
                <span className="size-2 rounded-full bg-coral" />
                <span className="size-2 rounded-full bg-ochre" />
                <span className="size-2 rounded-full bg-teal" />
                <span className="size-2 rounded-full bg-lilac" />
              </span>

              <span className="font-display text-lg">Chroma Garcia</span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="flex size-9 items-center justify-center lg:hidden"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          <p className="mt-2 font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            Management
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 rounded-md px-3 py-2.5 text-sm
                    transition-colors
                    ${
                      isActive
                        ? "bg-coral/10 text-coral"
                        : "text-ink-soft hover:bg-black/5 hover:text-ink"
                    }
                  `}
                >
                  <Icon className="size-4 shrink-0" />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-black/10 p-3">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
          >
            <ExternalLink className="size-4 shrink-0" />

            <span>View Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
