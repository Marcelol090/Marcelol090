import { CheckCircle2, CloudOff, LoaderCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const STATES = {
  checking: { Icon: LoaderCircle, className: "border-border bg-secondary/80 text-muted-foreground", spin: true },
  ready: { Icon: CheckCircle2, className: "border-success/30 bg-success/10 text-success" },
  limited: { Icon: ShieldAlert, className: "border-warm/30 bg-warm/10 text-warm" },
  offline: { Icon: CloudOff, className: "border-destructive/30 bg-destructive/10 text-destructive-foreground" },
};

export function ApiStatus({ health, compact = false, className }) {
  const state = STATES[health?.status] || STATES.checking;
  const { Icon } = state;
  return (
    <div
      className={cn(
        "inline-flex min-h-8 items-center gap-2 rounded-full border px-3 text-[11px] font-semibold",
        state.className,
        className,
      )}
      title={health?.details?.message || health?.details?.service || health?.label}
      aria-live="polite"
    >
      <Icon className={cn("size-3.5", state.spin && "animate-spin")} aria-hidden="true" />
      {compact ? <span className="sr-only">{health?.label}</span> : health?.label}
    </div>
  );
}
