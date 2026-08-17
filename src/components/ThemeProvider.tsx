"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const savedTheme = localStorage.getItem("theme") as Theme | null;

    function applyTheme(nextTheme: Theme) {
      setTheme(nextTheme);

      document.documentElement.classList.toggle(
        "dark",
        nextTheme === "dark",
      );
    }

    // User has previously selected a theme
    if (savedTheme) {
      applyTheme(savedTheme);
      return;
    }

    // Otherwise use system preference
    applyTheme(mediaQuery.matches ? "dark" : "light");

    // Listen for device theme changes
    function handleSystemThemeChange(event: MediaQueryListEvent) {
      const nextTheme = event.matches ? "dark" : "light";

      applyTheme(nextTheme);
    }

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange,
      );
    };
  }, []);

  function toggleTheme() {
    const nextTheme =
      theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark",
    );

    // Once the user manually toggles,
    // this overrides the system preference.
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within a ThemeProvider",
    );
  }

  return context;
}