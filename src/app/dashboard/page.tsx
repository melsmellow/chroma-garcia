import DashboardCard from "@/components/admin/DashboardCard";
import PaletteStrip from "@/components/PaletteStrip";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PaletteStrip className="mb-6" />

      <div className="border-b border-line pb-10">
        <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-coral">
          Overview
        </p>

        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Welcome back,
          <br />
          John Doe.
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
          Manage your artists, artworks, events, and gallery content from one
          place.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          label="Artists"
          value="12"
          description="Manage artist profiles"
        />

        <DashboardCard
          label="Artworks"
          value="48"
          description="Manage artwork collection"
        />

        <DashboardCard
          label="Events"
          value="6"
          description="Upcoming and past events"
        />

        <DashboardCard
          label="Gallery"
          value="84"
          description="Published gallery images"
        />
      </div>
    </div>
  );
}
