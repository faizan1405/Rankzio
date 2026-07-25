import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setShow(v > 600)), [scrollY]);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-glow-brand"
        >
          <span aria-hidden className="absolute inset-0 rounded-full bg-gradient-brand" />
          <span className="btn-shine absolute inset-0 rounded-full" aria-hidden />
          <ArrowUp size={18} className="relative" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
