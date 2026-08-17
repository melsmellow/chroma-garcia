import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "@/components/ui/toast";
import { Providers } from "./provider";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: {
    default: "Chroma Garcia Artist Group",
    template: "%s — Chroma Garcia Artist Group",
  },
  description:
    "A Batangas collective of visual artists creating community outreach, workshops, and exhibitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <Providers>
          <ThemeProvider>
            {children}

            <Toaster />

            <ThemeToggle />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}