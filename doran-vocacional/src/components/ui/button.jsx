import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "border-primary/70 bg-primary text-primary-foreground shadow-[0_12px_30px_-16px_rgba(160,190,214,0.75)] hover:bg-primary/90",
        secondary: "border-border bg-secondary text-secondary-foreground hover:border-border-strong hover:bg-secondary/80",
        ghost: "border-transparent bg-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground",
        outline: "border-border bg-transparent text-foreground hover:border-border-strong hover:bg-muted/45",
        danger: "border-destructive/40 bg-destructive/10 text-destructive-foreground hover:bg-destructive/15"
      },
      size: {
        default: "px-5 py-2.5",
        sm: "min-h-9 rounded-lg px-3 py-2 text-xs",
        lg: "min-h-12 rounded-[14px] px-6 py-3 text-base",
        icon: "size-11 p-0"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
