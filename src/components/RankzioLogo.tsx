import { motion } from "motion/react";
import logoAsset from "@/assets/rankzio-logo.png.asset.json";

interface Props {
  className?: string;
  animate?: boolean;
  /** Renders logo-only (no separate wordmark) since the uploaded PNG already contains it. */
  markOnly?: boolean;
  /** Height in px (image scales to width automatically). */
  height?: number;
  hover?: boolean;
  floating?: boolean;
}

/**
 * Real Rankzio brand logo (uploaded PNG). Includes wordmark natively.
 * `animate` — reveal animation used by the loader.
 * `hover`   — subtle hover lift/tilt (header).
 * `floating`— slow up/down float (footer).
 */
export function RankzioLogo({
  className,
  animate = false,
  height = 40,
  hover = false,
  floating = false,
}: Props) {
  const img = (
    <img
      src={logoAsset.url}
      alt="Rankzio — AI-first digital growth studio"
      width={height * 3}
      height={height}
      style={{ height, width: "auto", display: "block" }}
      draggable={false}
    />
  );

  if (animate) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {img}
      </motion.div>
    );
  }

  if (hover) {
    return (
      <motion.div
        className={className}
        whileHover={{ y: -2, rotate: -1.5, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {img}
      </motion.div>
    );
  }

  if (floating) {
    return (
      <motion.div
        className={className}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        {img}
      </motion.div>
    );
  }

  return <div className={className}>{img}</div>;
}
