import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea className={cn("min-h-28 w-full resize-y rounded-2xl border border-border bg-input px-4 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/15", className)} ref={ref} {...props} />
));
Textarea.displayName = "Textarea";

export { Textarea };
