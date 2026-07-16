export default function WallLabel({
  eyebrow,
  title,
  meta,
}: {
  eyebrow?: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="font-mono-label text-[11px] uppercase text-ink-soft">
      {eyebrow && <div className="mb-0.5 opacity-70">{eyebrow}</div>}
      <div className="text-ink font-medium normal-case font-body tracking-normal text-sm">
        {title}
      </div>
      {meta && <div className="mt-0.5">{meta}</div>}
    </div>
  );
}
