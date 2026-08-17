"use client";

import { Menu, User } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
  user: {
    name?: string | null;
    role?: string;
  };
}

export default function AdminHeader({
  onMenuClick,
  user,
}: AdminHeaderProps) {
  return (
    <header className="flex h-16 w-full items-center border-b border-black/10 px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex size-10 shrink-0 items-center justify-center lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <div className="ml-3 hidden lg:block">
        {/* <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          Chroma Garcia Admin
        </p> */}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">
            {user.name ?? "Admin"}
          </p>

          <p className="font-mono-label text-[10px] uppercase tracking-wider text-ink-soft">
            {user.role ?? "Admin"}
          </p>
        </div>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10">
          <User className="size-4 text-ink-soft" />
        </div>
      </div>
    </header>
  );
}