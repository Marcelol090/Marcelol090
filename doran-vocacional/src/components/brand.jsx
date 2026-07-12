import { cn } from "@/lib/utils";

export function Brand({ className, compact = false }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-[13px] border border-border bg-secondary shadow-inner">
        <img src="/doran-mark.svg" alt="" className="size-8" width="32" height="32" />
      </div>
      <div className={cn("grid", compact && "hidden sm:grid")}>
        <span className="text-sm font-bold tracking-[-0.02em] text-foreground">Doran OP</span>
        <span className="text-[11px] text-muted-foreground">orientação profissional baseada em evidências</span>
      </div>
    </div>
  );
}
