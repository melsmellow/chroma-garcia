import { Loader2 } from "lucide-react";

export default function PublicLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="size-8 animate-spin text-coral" />

      <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-ink-soft">
        Loading...
      </p>
    </div>
  );
}
