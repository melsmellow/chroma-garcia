"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import PaletteStrip from "@/components/PaletteStrip";
import WallLabel from "@/components/WallLabel";
import { HERO_IMAGES } from "@/constants/mockData";
import type { Artwork } from "@/types/artworks";

interface HeroArtwork {
  id: string;
  src: string;
  title: string;
  artistName?: string;
}

// The hero grid is a fixed 3x3 mosaic: one large 2x2 spotlight tile plus
// five small tiles. Anything beyond this cap is never rendered here —
// the plaque below links to the gallery for the rest instead.
const HERO_MAX_WORKS = 6;

const FALLBACK_IMAGES: HeroArtwork[] = HERO_IMAGES.map((image, i) => ({
  id: `hero-${i}`,
  src: image.src,
  title: image.title,
}));

export default function Hero({ artworks }: { artworks: Artwork[] }) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const works = useMemo<HeroArtwork[]>(() => {
    if (artworks.length === 0) {
      return FALLBACK_IMAGES;
    }

    return artworks.map((artwork) => ({
      id: artwork._id,
      src: artwork.imageUrl,
      title: artwork.title,
      artistName: artwork.artist?.name,
    }));
  }, [artworks]);

  const visibleWorks = useMemo(() => {
    if (works.length <= HERO_MAX_WORKS) {
      return works;
    }

    return Array.from(
      { length: HERO_MAX_WORKS },
      (_, index) => works[(featuredIndex + index) % works.length],
    );
  }, [works, featuredIndex]);

  // Featured works past the display cap never render in the hero; the
  // plaque surfaces how many exist as a nudge toward the gallery.
  const hiddenCount = Math.max(0, artworks.length - HERO_MAX_WORKS);

  useEffect(() => {
    if (works.length < 2) {
      return;
    }

    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % works.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [works.length]);

  // The large 2x2 tile is a fixed spotlight: its content crossfades to the
  // currently featured artwork each rotation, while the five small tiles
  // shuffle around it. The wall label always mirrors the spotlight.
  const featuredArtwork = works[featuredIndex] ?? works[0];

  if (!featuredArtwork) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
        {/* LEFT */}
        <div>
          <PaletteStrip className="mb-6" />

          <h1 className="font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight">
            Collaborative, Collective,{" "}
            <span className="italic text-coral">and Connected.</span>
          </h1>

          <p className="mt-6 max-w-lg text-xl leading-9 text-ink-soft">
            Chroma Garcia was formed in Padre Garcia, Batangas in September 2019
            with the goal of promoting and supporting visual arts in the
            community.
          </p>

          <div className="mt-9 flex gap-4 flex-wrap">
            <Link
              href="/contact"
              className="bg-ink text-gesso px-6 py-3 font-mono-label text-xs uppercase hover:bg-coral transition-colors"
            >
              Join Us
            </Link>

            <Link
              href="/contact"
              className="border border-ink px-6 py-3 font-mono-label text-xs uppercase hover:border-coral hover:text-coral transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-3">
            {/* Spotlight — the large 2x2 tile crossfades between featured
                artworks instead of shuffling positions, so each rotation
                reads as a deliberate "now showing" change */}
            <div className="relative col-span-2 row-span-2 border-5 border-amber-600/75 bg-gesso p-2">
              <div className="relative aspect-square overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={featuredArtwork.id}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={featuredArtwork.src}
                      alt={featuredArtwork.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Small tiles — the newly featured work fades out of its slot
                while the previous one fades back in; popLayout pops the
                exiting tile out of the grid flow so no phantom row appears */}
            <AnimatePresence initial={false} mode="popLayout">
              {visibleWorks.slice(1).map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    layout: {
                      duration: 0.8,
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                    },
                    opacity: { duration: 0.4 },
                  }}
                  className="relative aspect-square"
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-3 inline-flex items-center border border-line bg-gesso">
            <div className="px-4 py-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={featuredArtwork.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="flex items-stretch">
                    {/* Chroma palette mark */}
                    <div className="flex w-2 flex-col">
                      <div className="flex-1 bg-amber-600/75" />
                    </div>

                    <div className="px-4 py-3 bg-yellow">
                      <WallLabel
                        eyebrow="Featured Artwork"
                        title={featuredArtwork.title}
                        meta={featuredArtwork.artistName}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {hiddenCount > 0 && (
              <p className="border-l border-line px-4 py-3 font-mono-label text-xs uppercase text-ink-soft hover:text-coral transition-colors">
                +{hiddenCount} more featured artworks
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
