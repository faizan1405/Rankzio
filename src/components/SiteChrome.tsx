import type { ReactNode } from "react";
import { CinematicLoader } from "./CinematicLoader";
import { CustomCursor } from "./CustomCursor";
import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { BackToTop } from "./BackToTop";
import { PageTransition } from "./PageTransition";

/**
 * Universal chrome wrapping every route:
 * loader (first visit), smooth scroll, cursor, sticky nav, page-transition,
 * footer, floating WhatsApp, back-to-top.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <CinematicLoader />
      <CustomCursor />
      <SmoothScroll />
      <main className="relative min-h-screen w-full overflow-x-hidden">
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </main>
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
