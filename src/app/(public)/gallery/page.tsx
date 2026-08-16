import type { Metadata } from "next";
import PaletteStrip from "@/components/PaletteStrip";
import GalleryClient from "./gallery-client";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <PaletteStrip className="mb-6" />
      <h1 className="font-display text-4xl md:text-5xl leading-none">
        Gallery
      </h1>
      <p className="mt-4 text-xl leading-9 text-ink-soft">
        Every piece, from every member, in one place. Search or filter to find
        your way around.
      </p>
      <div className="mt-12">
        <GalleryClient />
      </div>
    </div>
  );
}
