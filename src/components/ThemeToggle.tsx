"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

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