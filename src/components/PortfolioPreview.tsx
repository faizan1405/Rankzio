import { useEffect } from "react";
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

// Reusable card shell — animations disabled for the portfolio page test.
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
    <button
      type="button"
      onClick={() => onOpen(project.id)}
      className="group relative block h-full w-full overflow-hidden rounded-3xl text-left shadow-soft transition-all duration-500 hover:shadow-float"
    >
      {children}
    </button>
  );
}

/**
 * Preview modal — animations disabled for the portfolio page test.
 * The page is pinned using position: fixed so opening the modal never
 * causes a scroll jump.
 */
export function PortfolioPreviewModal({
  project,
  onClose,
}: {
  project: PreviewProject;
  onClose: () => void;
}) {
  useEffect(() => {
    const lenis = (window as any).__lenis as { stop?: () => void; start?: () => void } | undefined;
    lenis?.stop?.();
    const scrollY = window.scrollY;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflowY = "scroll";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
      lenis?.start?.();
    };
  }, []);

  const hue = project.hue ?? 220;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        aria-hidden
        className="absolute inset-0 backdrop-blur-2xl"
        style={{ background: "oklch(0.12 0.03 240 / 0.55)" }}
      />
      <div
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-background shadow-float"
      >
        <div className="overflow-y-auto">
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
      </div>
    </div>
  );
}
