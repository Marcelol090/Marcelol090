import { cn } from "@/lib/utils";

function Field({ label, hint, htmlFor, children, className }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">{label}</label>
      {children}
      {hint ? <p className="text-xs leading-5 text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function NativeSelect({ className, ...props }) {
  return <select className={cn("min-h-12 w-full rounded-2xl border border-border bg-input px-4 text-sm text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/15", className)} {...props} />;
}

export { Field, NativeSelect };
