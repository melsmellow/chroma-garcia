import { Loader2 } from "lucide-react";

interface AdminLoadingProps {
  message?: string;
}

export default function AdminLoading({
  message = "Loading...",
}: AdminLoadingProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <Loader2 className="size-8 animate-spin text-coral" />

      <p className="font-mono-label text-xs uppercase tracking-[0.18em] text-ink-soft">
        {message}
      </p>
    </div>
  );
}