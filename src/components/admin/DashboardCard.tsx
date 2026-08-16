interface DashboardCardProps {
  label: string;
  value: string;
  description: string;
}

export default function DashboardCard({
  label,
  value,
  description,
}: DashboardCardProps) {
  return (
    <div className="border border-line bg-gesso p-5 transition-colors hover:bg-ink/5">
      <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </p>

      <p className="mt-4 font-display text-4xl text-ink">
        {value}
      </p>

      <p className="mt-2 text-sm text-ink-soft">
        {description}
      </p>
    </div>
  );
}