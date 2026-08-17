import { auth } from "@/auth";

import { getDashboardStats } from "@/actions/dashboard";

import DashboardCard from "@/components/admin/DashboardCard";
import PaletteStrip from "@/components/PaletteStrip";

export default async function DashboardPage() {
  const [session, dashboardResponse] = await Promise.all([
    auth(),
    getDashboardStats(),
  ]);

  const { stats } = dashboardResponse;

  const userName = session?.user?.name ?? "Admin";

  return (
    <div className="mx-auto max-w-7xl">
      <PaletteStrip className="mb-6" />

      <div className="border-b border-line pb-10">
        <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-coral">
          Overview
        </p>

        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Welcome back,
          <br />
          {userName}.
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
          Manage your artists, artworks, events, and gallery content from one
          place.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          label="Artists"
          value={String(stats.artists)}
          description="Manage artist profiles"
        />

        <DashboardCard
          label="Artworks"
          value={String(stats.artworks)}
          description="Manage artwork collection"
        />

        <DashboardCard
          label="Events"
          value={String(stats.events)}
          description="Upcoming and past events"
        />

        <DashboardCard
          label="Outreach"
          value={String(stats.outreach)}
          description="Manage outreach initiatives"
        />
      </div>
    </div>
  );
}
