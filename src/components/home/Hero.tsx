"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import PaletteStrip from "@/components/PaletteStrip";
import WallLabel from "@/components/WallLabel";
import { HERO_IMAGES } from "@/constants/mockData";

export default function Hero() {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const orderedImages = useMemo(() => {
    return [
      HERO_IMAGES[featuredIndex],
      ...HERO_IMAGES.filter((_, i) => i !== featuredIndex),
    ];
  }, [featuredIndex]);

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
              className="bg-ink text-gesso px-6 py-3 font-mono-label text-[11px] uppercase hover:bg-coral transition-colors"
            >
              Join Us
            </Link>

            <Link
              href="/contact"
              className="border border-ink px-6 py-3 font-mono-label text-[11px] uppercase hover:border-coral hover:text-coral transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-3">
            {orderedImages.map((image, i) => (
              <motion.div
                key={image.src}
                layout
                transition={{
                  layout: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                  },
                }}
                className={
                  i === 0
                    ? "relative col-span-2 row-span-2 aspect-square"
                    : "relative aspect-square"
                }
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-3 inline-block border border-line bg-gesso px-4 py-3">
            <WallLabel
              eyebrow="Featured Artwork"
              title={orderedImages[0].title}
              meta="Joseph Albao"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
