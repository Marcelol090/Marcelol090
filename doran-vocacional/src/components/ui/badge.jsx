import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]", {
  variants: {
    variant: {
      default: "border-primary/25 bg-primary/10 text-primary",
      secondary: "border-border bg-secondary/80 text-muted-foreground",
      warm: "border-warm/25 bg-warm/10 text-warm",
      success: "border-success/25 bg-success/10 text-success"
    }
  },
  defaultVariants: { variant: "default" }
});

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
