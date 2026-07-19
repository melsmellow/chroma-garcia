"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    const initial =
      saved ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(initial);
    document.documentElement.classList.toggle(
      "dark",
      initial === "dark",
    );
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";

    setTheme(next);

    document.documentElement.classList.toggle(
      "dark",
      next === "dark",
    );

    localStorage.setItem("theme", next);
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        fixed
        bottom-6
        right-6
        z-[999]
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-line
        bg-gesso/90
        backdrop-blur
        shadow-lg
        transition-all
        hover:scale-105
        hover:border-coral
      "
    >
      {theme === "light" ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}