import { useEffect, useCallback } from "react";
import Lenis from "lenis";

/**
 * Imperative Lenis helpers exposed on `window` so any component can
 * pause / resume / scrollTo without importing the internal instance.
 */
function installLenis() {
  if (typeof window === "undefined") return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  (window as any).__lenis = lenis;
  let raf = 0;
  const loop = (time: number) => {
    lenis.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    lenis.destroy();
    (window as any).__lenis = undefined;
  };
}

export function SmoothScroll() {
  useEffect(() => {
    const cleanup = installLenis();
    return cleanup;
  }, []);

  return null;
}

type LenisAPI = {
  stop: () => void;
  start: () => void;
  scrollTo: (y: number, opts?: { immediate?: boolean }) => Promise<void>;
};

/**
 * Hook that returns a single `pauseScroll` function.
 *
 * When called it:
 *   1. captures the current scroll position,
 *   2. stops Lenis (so it stops intercepting events),
 *   3. sets `body.overflow = "hidden"` to prevent native scroll on trackpad.
 *
 * The returned object also exposes `resumeScroll` which reverses the above.
 */
export function useLenisPause() {
  const pauseScroll = useCallback(() => {
    const lenis = (window as unknown as { __lenis?: LenisAPI }).__lenis;
    const scrollY = window.scrollY;

    lenis?.stop();
    // Never use `position: fixed` on the body — overflow is enough to
    // prevent accidental native scroll while Lenis is paused.
    document.body.style.overflow = "hidden";

    // Store the saved scrollY so resumeScroll can restore it.
    (window as any).__lenisScrollBeforePause = scrollY;
  }, []);

  const resumeScroll = useCallback(() => {
    const lenis = (window as unknown as { __lenis?: LenisAPI }).__lenis;
    const scrollY =
      (window as any).__lenisScrollBeforePause ?? window.scrollY;

    document.body.style.overflow = "";
    (window as any).__lenisScrollBeforePause = undefined;

    // Use `lenis.scrollTo` with `immediate: true` — this is the only
    // safe way to restore scroll when Lenis is managing the virtual
    // scroll position. Never call `window.scrollTo` while Lenis is
    // active (it causes desync / snap-to-top).
    lenis?.scrollTo(scrollY, { immediate: true }).then(() => {
      lenis?.start();
    });
  }, []);

  return { pauseScroll, resumeScroll };
}
