import { useEffect } from "react";
import { motion } from "motion/react";
import { X, TrendingUp, ArrowUpRight } from "lucide-react";

/**
 * Shared preview data + modal used by both the home page portfolio grid
 * (`components/Portfolio.tsx`) and the dedicated /portfolio route. This is the
 * single source of truth for how a project preview looks — both pages must
 * feed data into <PortfolioPreviewCard /> and <PortfolioPreviewModal />.
 */
export interface PreviewProject {
  id: string;
  category: string;
  meta?: string; // industry / client / year
  title: string;
  image: string;
  badge: string;
  challenge: string;
  solution: string;
  process: string;
  results: { label: string; value: string }[];
  hue?: number;
  ctaLabel?: string;
  ctaHref?: string;
}

// Reusable card shell — uses shared layoutIds so the modal can smoothly
// expand out of the clicked card via motion's shared-element transition.
export function PortfolioPreviewCard({
  project,
  onOpen,
  children,
}: {
  project: PreviewProject;
  onOpen: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      layoutId={`preview-card-${project.id}`}
      onClick={() => onOpen(project.id)}
      whileHover={{ y: -10 }}
      className="group relative block h-full w-full overflow-hidden rounded-3xl text-left shadow-soft transition-all duration-500 hover:shadow-float"
    >
      {children}
    </motion.button>
  );
}

/**
 * Preview modal — always rendered as `position: fixed` and centered in the
 * current viewport. Body scroll is locked while open, and the scrollbar
 * width is compensated so the page never shifts. The modal never forces the
 * page to scroll to the top; when it closes, the visitor sees the exact
 * same scroll position they clicked from.
 */
export function PortfolioPreviewModal({
  project,
  onClose,
}: {
  project: PreviewProject;
  onClose: () => void;
}) {
  useEffect(() => {
    // Lock scroll without shifting the page: compensate for the scrollbar
    // width that disappears when overflow becomes hidden. Also stop Lenis
    // so its virtual scroll loop doesn't fight the locked overflow and
    // yank the page to the top while the modal is open.
    const lenis = (window as any).__lenis as { stop?: () => void; start?: () => void } | undefined;
    lenis?.stop?.();
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      lenis?.start?.();
    };
  }, []);

  const hue = project.hue ?? 220;

  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        aria-hidden
        className="absolute inset-0 backdrop-blur-2xl"
        style={{ background: "oklch(0.12 0.03 240 / 0.55)" }}
      />
      <motion.div
        layoutId={`preview-card-${project.id}`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-background shadow-float"
      >
        <div className="overflow-y-auto">
          {/* Featured hero image (matches home-page preview) */}
          <div className="relative aspect-[16/8] w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, oklch(0.25 0.14 ${hue} / 0.45), transparent 55%), linear-gradient(0deg, oklch(0.1 0.04 ${hue} / 0.65), transparent 55%)`,
              }}
            />
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition hover:bg-white/40"
            >
              <X size={18} />
            </button>
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest opacity-90">
                  {project.category}
                  {project.meta ? ` · ${project.meta}` : ""}
                </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                  {project.title}
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
                <TrendingUp size={14} />
                {project.badge}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3 md:p-10">
            {[
              ["Challenge", project.challenge],
              ["Solution", project.solution],
              ["Process", project.process],
            ].map(([label, body]) => (
              <div key={label}>
                <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">
                  {label}
                </div>
                <p className="mt-2 text-foreground/80">{body}</p>
              </div>
            ))}
          </div>

          <div className="px-8 pb-8 md:px-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">
              Results
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              {project.results.map((r) => (
                <div key={r.label} className="rounded-2xl glass p-5">
                  <div className="text-3xl font-semibold tracking-tight text-gradient-brand">
                    {r.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-foreground/60">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 bg-soft-grey/50 p-8 md:p-10">
            <div className="text-sm text-foreground/70">
              Want a result like this for your brand?
            </div>
            <a
              href={project.ctaHref ?? "/contact"}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow-brand transition hover:opacity-95"
            >
              {project.ctaLabel ?? "Start a similar project"}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
