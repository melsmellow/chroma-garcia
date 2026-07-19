import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ThemeToggle/>
      </body>
    </html>
  );
}
