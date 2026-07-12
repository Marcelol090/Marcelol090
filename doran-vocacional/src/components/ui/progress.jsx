import { cn } from "@/lib/utils";

function Progress({ value = 0, className, indicatorClassName }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(safeValue)} className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}>
      <div className={cn("h-full rounded-full bg-primary transition-transform duration-300 ease-out", indicatorClassName)} style={{ transform: `translateX(-${100 - safeValue}%)` }} />
    </div>
  );
}

export { Progress };
