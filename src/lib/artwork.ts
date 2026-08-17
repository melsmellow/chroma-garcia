import type { Artwork } from "@/types/artworks";

export const statusColor: Record<Artwork["status"], string> = {
  Available: "var(--teal)",
  Reserved: "var(--ochre)",
  Sold: "var(--ink-soft)",
  "Not for Sale": "var(--violet)",
};

export function formatPrice(art: Artwork) {
  if (art.price == null) {
    return null;
  }

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: art.currency ?? "PHP",
    maximumFractionDigits: 0,
  }).format(art.price);
}
