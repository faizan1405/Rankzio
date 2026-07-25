import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Fades + slides pages in on route change. Keyed by pathname so React
 * remounts the tree and replays entrance animations.
 *
 * NOTE: `filter: blur(...)` is intentionally avoided — it forces
 * expensive compositing layers and can cause layout jitter that Lenis
 * misinterprets as a scroll change. Plain opacity + transform is enough.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
