import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { Providers } from "./provider";

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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Providers>
        <body className="font-body antialiased">{children}</body>
        <Toaster />
      </Providers>
    </html>
  );
}
