import { pigments, type PigmentKey } from "@/lib/data";

// Deterministic pseudo-random generator so each seed always renders the
// same "painting" (stand-in for real Cloudinary artwork images).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

const allPigments: PigmentKey[] = ["coral", "ochre", "teal", "violet"];

export default function AbstractArt({
  seed,
  palette,
  className = "",
}: {
  seed: string;
  palette: PigmentKey;
  className?: string;
}) {
  const rand = mulberry32(hashSeed(seed));
  const others = allPigments.filter((p) => p !== palette);
  const secondary = others[Math.floor(rand() * others.length)];

  const blobs = Array.from({ length: 4 }, (_, i) => {
    const cx = 20 + rand() * 60;
    const cy = 20 + rand() * 60;
    const rx = 20 + rand() * 30;
    const ry = 20 + rand() * 30;
    const rotate = rand() * 180;
    const useSecondary = i % 2 === 1;
    return { cx, cy, rx, ry, rotate, useSecondary, key: i };
  });

  const strokes = Array.from({ length: 3 }, (_, i) => {
    const y = 15 + rand() * 70;
    const key = `s${i}`;
    return { y, key };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label={`Abstract study, ${palette} palette`}
    >
      <rect width="100" height="100" fill="var(--gesso-dim)" />
      {blobs.map((b) => (
        <ellipse
          key={b.key}
          cx={b.cx}
          cy={b.cy}
          rx={b.rx}
          ry={b.ry}
          fill={pigments[b.useSecondary ? secondary : palette]}
          opacity={0.55}
          transform={`rotate(${b.rotate} ${b.cx} ${b.cy})`}
        />
      ))}
      {strokes.map((s) => (
        <rect
          key={s.key}
          x="0"
          y={s.y}
          width="100"
          height={1.5 + rand() * 2}
          fill="var(--ink)"
          opacity={0.08}
        />
      ))}
    </svg>
  );
}
