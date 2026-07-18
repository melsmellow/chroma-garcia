import Image from "next/image";
import AbstractArt from "./AbstractArt";
import type { PigmentKey } from "@/lib/data";

export default function MagazinePortrait({
  src,
  alt,
  palette,
  seed,
  className = "",
}: {
  src?: string;
  alt: string;
  palette: PigmentKey;
  seed: string;
  className?: string;
}) {
  if (!src) {
    return <AbstractArt seed={seed} palette={palette} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden bg-[#d8d3cb] ${className}`}>
      {/* Main Portrait */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width:768px) 320px, 240px"
        className="object-contain object-bottom select-none"
        style={{
          filter: `
    grayscale(.65)
    saturate(.85)
    contrast(1.2)
    brightness(1.04)
    blur(.25px)
  `,
        }}
      />

      {/* Matte Fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,.06), rgba(0,0,0,.08))",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Halftone */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,.3) .8px, transparent .8px)",
          backgroundSize: "4px 4px",
          mixBlendMode: "multiply",
        }}
      />

      {/* Fine Grain */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>

      {/* Dust */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `
            radial-gradient(circle at 12% 22%, rgba(255,255,255,.5) 1px, transparent 2px),
            radial-gradient(circle at 73% 58%, rgba(255,255,255,.35) 1px, transparent 2px),
            radial-gradient(circle at 42% 84%, rgba(255,255,255,.45) 1px, transparent 2px),
            radial-gradient(circle at 80% 15%, rgba(255,255,255,.4) 1px, transparent 2px)
          `,
          mixBlendMode: "screen",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,.18) 100%)",
        }}
      />

      {/* Paper Tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "#ddd7cf",
          opacity: 0.12,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
