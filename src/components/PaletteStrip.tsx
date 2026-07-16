import { pigments } from "@/lib/data";

const order: (keyof typeof pigments)[] = ["coral", "ochre", "teal", "violet"];

export default function PaletteStrip({
  className = "",
  dotClassName = "size-2.5",
}: {
  className?: string;
  dotClassName?: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-hidden="true">
      {order.map((key) => (
        <span
          key={key}
          className={`rounded-full inline-block ${dotClassName}`}
          style={{ backgroundColor: pigments[key] }}
        />
      ))}
    </div>
  );
}
