import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Fades + slides pages in on route change. Keyed by pathname so React
 * remounts the tree and replays entrance animations.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
