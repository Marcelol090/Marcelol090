import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function ScreenShell({ children, className }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.main id="main-content" tabIndex={-1} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className={cn("outline-none", className)}>
      {children}
    </motion.main>
  );
}
