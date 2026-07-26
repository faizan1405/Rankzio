import { useState, useCallback, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, TrendingUp, X } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionEyebrow } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { useLenisPause } from "@/components/SmoothScroll";
import portfolioImg from "@/assets/portfolio-hero.jpg";
import workInterior from "@/assets/work-interior.jpg";
import workSkincare from "@/assets/work-skincare.jpg";
import workFintech from "@/assets/work-fintech.jpg";
import workSeo from "@/assets/work-seo.jpg";
import workAnalytics from "@/assets/work-analytics.jpg";
import workGoogleAds from "@/assets/work-google-ads.jpg";
import workMetaAds from "@/assets/work-meta-ads.jpg";
import workSocial from "@/assets/work-social.jpg";

import { SITE } from "@/lib/site-url";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Selected Client Work | Rankzio" },
      { name: "description", content: "Selected websites, SEO campaigns, ads and social work for premium brands across India, the UAE and beyond." },
      { property: "og:title", content: "Portfolio — Selected Client Work | Rankzio" },
      { property: "og:description", content: "A curated look at recent websites, SEO programs, paid campaigns and social builds — each shipped with premium craft and measurable outcomes." },
      { property: "og:url", content: `${SITE}/portfolio` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/portfolio` }],
  }),
  component: PortfolioPage,
});

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  client: string;
  year: string;
  hue: number;
  image: string;
  badge: string;
  meta: string;
  challenge: string;
  solution: string;
  process: string;
  results: { label: string; value: string }[];
}

const projects: PortfolioItem[] = [
  { id: "atelier-north", category: "Website", title: "Atelier North — Luxury Interiors Site", client: "Atelier North", year: "2025", hue: 245,
    image: workInterior, badge: "6x Enquiries", meta: "Atelier North · 2025",
    challenge: "The existing site loaded in 6s and buried the portfolio 3 clicks deep.",
    solution: "A cinematic, edge-rendered site with case studies as the star of the homepage.",
    process: "Interviewed 12 architect clients, audited 40+ competitor sites, rebuilt design + motion over 8 weeks.",
    results: [{label:"LCP",value:"0.6s"},{label:"Time on page",value:"+312%"},{label:"Enquiries",value:"6x"},{label:"Lighthouse",value:"100/100"}] },
  { id: "loomcraft", category: "Website", title: "Loomcraft — D2C Textile Store", client: "Loomcraft", year: "2024", hue: 155,
    image: workSkincare, badge: "+218% Conversion", meta: "Loomcraft · 2024",
    challenge: "Migrate 400 SKUs from a legacy WooCommerce site with poor conversion.",
    solution: "Editorial storytelling combined with a friction-free checkout on Shopify Hydrogen.",
    process: "12 shopper interviews, heatmap analysis, 10-week custom Shopify build with a bespoke design system.",
    results: [{label:"Conversion",value:"+218%"},{label:"LCP",value:"1.2s"},{label:"Returns",value:"-46%"},{label:"AOV",value:"+31%"}] },
  { id: "orbit-fintech", category: "Website", title: "Orbit — Fintech Marketing Site", client: "Orbit Money", year: "2025", hue: 258,
    image: workFintech, badge: "4.2x Demo Requests", meta: "Orbit Money · 2025",
    challenge: "Complex product, technical audience, tight 6-week timeline.",
    solution: "Dual-narrative site — CFO story on top, engineering docs one click away.",
    process: "Six CFO interviews and dev-team pairing sessions, then sprint-based build with weekly demos.",
    results: [{label:"Demo reqs",value:"4.2x"},{label:"LCP",value:"0.8s"},{label:"Docs traffic",value:"+185%"},{label:"Lighthouse",value:"100/100"}] },
  { id: "coastal-clinic", category: "Website", title: "Coastal Clinic — Healthcare Rebrand", client: "Coastal Clinic", year: "2024", hue: 195,
    image: workAnalytics, badge: "3.1x Bookings", meta: "Coastal Clinic · 2024",
    challenge: "Old site felt clinical and hid the treatment menu.",
    solution: "A calm, editorial site with instant online booking and WhatsApp support.",
    process: "Patient interviews and Google-review theme analysis drove a warm, editorial rebuild.",
    results: [{label:"Bookings",value:"3.1x"},{label:"Mobile leads",value:"+92%"},{label:"LCP",value:"0.7s"},{label:"Booking time",value:"<45s"}] },
  { id: "verdant-mills", category: "Website", title: "Verdant Mills — Sustainable Fashion", client: "Verdant Mills", year: "2025", hue: 155,
    image: workAnalytics, badge: "12 Countries Live", meta: "Verdant Mills · 2025",
    challenge: "Convey material provenance without slowing the shopping experience.",
    solution: "Storytelling built into every PDP, plus a fabric-provenance micro-site.",
    process: "Buyer research across India, UK and UAE informed a multi-currency Shopify build.",
    results: [{label:"Add-to-cart",value:"+167%"},{label:"Countries",value:"12"},{label:"LCP",value:"0.9s"},{label:"Revenue",value:"+142%"}] },
  { id: "orgnaix-seo", category: "SEO", title: "Orgnaix — SaaS SEO Program", client: "Orgnaix", year: "2024–2025", hue: 155,
    image: workSeo, badge: "+412% Organic", meta: "Orgnaix · 2024–2025",
    challenge: "Ranking on page 4 for high-intent keywords in a crowded HR-tech category.",
    solution: "Full-funnel content engine plus digital PR — publishing weekly for 12 months.",
    process: "Competitor gap analysis on 800 keywords + 40 buyer interviews, then technical fixes and 60 articles.",
    results: [{label:"Organic",value:"+412%"},{label:"#1 rankings",value:"48"},{label:"Trials",value:"5.2x"},{label:"AI answers",value:"22"}] },
  { id: "novaeat-seo", category: "SEO", title: "NovaEat — Recipe Vertical Growth", client: "NovaEat", year: "2025", hue: 195,
    image: workSeo, badge: "1.8M Monthly Visits", meta: "NovaEat · 2025",
    challenge: "Google Helpful Content update wiped out 40% of traffic overnight.",
    solution: "Editorial-led rebuild focused on originality, EEAT and structured data.",
    process: "Content quality audit, rewrote 180 top pages with editor voice, cut 400 thin pages.",
    results: [{label:"Visits",value:"1.8M"},{label:"Recovery",value:"+9x"},{label:"Snippets",value:"220"},{label:"Time to recover",value:"5 mo"}] },
  { id: "urbanmov-ads", category: "Ads", title: "UrbanMov — D2C Meta Ads", client: "UrbanMov", year: "2024–2025", hue: 258,
    image: workMetaAds, badge: "4.6x ROAS", meta: "UrbanMov · 2024–2025",
    challenge: "Rising CAC and creative fatigue on Meta.",
    solution: "Creative-led performance: 6 concepts weekly, tested against 3 audiences.",
    process: "Full creative teardown, audience analysis and LP audit, then a weekly test-and-scale cadence.",
    results: [{label:"CAC",value:"-42%"},{label:"ROAS",value:"4.6x"},{label:"Spend",value:"8x"},{label:"CTR",value:"+96%"}] },
  { id: "glowlab-ads", category: "Ads", title: "GlowLab — Google Ads Scale", client: "GlowLab", year: "2025", hue: 245,
    image: workGoogleAds, badge: "6.1x ROAS", meta: "GlowLab · 2025",
    challenge: "PMax was a black box; brand terms were leaking budget.",
    solution: "PMax by product margin, dedicated brand campaign, YouTube retargeting.",
    process: "Auction insights, search-terms and shopping-feed audit, then a rebuild of PMax by margin bands.",
    results: [{label:"ROAS",value:"6.1x"},{label:"Spend",value:"10x"},{label:"New customers",value:"+220%"},{label:"IS top 3",value:"40+"}] },
  { id: "hive-social", category: "Social", title: "Hive Coffee — Instagram Rebuild", client: "Hive Coffee", year: "2024–2025", hue: 155,
    image: workSocial, badge: "+380% Reach", meta: "Hive Coffee · 2024–2025",
    challenge: "Beautiful feed, zero engagement, no attributable revenue.",
    solution: "Editorial reels, weekly community posts, creator seeding.",
    process: "Comment mining, audience polls and competitor teardown built new content pillars.",
    results: [{label:"Reach",value:"+380%"},{label:"Saves",value:"+14x"},{label:"Revenue",value:"+₹28L"},{label:"Followers",value:"+11x"}] },
];

type FilterType = "All" | "Website" | "SEO" | "Ads" | "Social";

function PortfolioPage() {
  const [filter, setFilter] = useState<FilterType>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { pauseScroll, resumeScroll } = useLenisPause();

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const selected = selectedId ? projects.find((p) => p.id === selectedId) : null;

  // Pause Lenis while the overlay is open, restore on close.
  useEffect(() => {
    if (selectedId) {
      pauseScroll();
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    }
    return () => {
      if (selectedId) resumeScroll();
    };
  }, [selectedId, pauseScroll, resumeScroll]);

  // Escape key to close.
  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const openProject = useCallback((id: string) => {
    setSelectedId(id);
    setOverlayVisible(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayVisible(true);
      });
    });
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayVisible(false);
    setTimeout(() => {
      setSelectedId(null);
    }, 300);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={<>Ten projects. <span className="text-gradient-brand text-drift">Zero shortcuts.</span></>}
        description="A curated look at our recent websites, SEO programs, ad accounts and social builds — each shipped with the same craft we'd bring to our own brand."
        image={portfolioImg}
        imageAlt="Premium device mockups showcasing responsive websites"
        variant="showcase"
        crumbs={[{ label: "Home", to: "/" }, { label: "Portfolio" }]}
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "Explore services", href: "/services" }}
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {(["All", "Website", "SEO", "Ads", "Social"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${filter === f ? "bg-gradient-brand text-white shadow-glow-brand" : "glass text-foreground/75 hover:text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => openProject(p.id)}
                className="group relative block h-full w-full overflow-hidden rounded-3xl text-left shadow-soft transition-all duration-500 hover:shadow-float"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.12]"
                  />
                  <div
                    className="absolute inset-0 opacity-70 mix-blend-multiply"
                    style={{ background: `linear-gradient(160deg, oklch(0.35 0.18 ${p.hue ?? 220} / 0.75), transparent 60%)` }}
                  />
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-semibold text-foreground shadow-soft">
                    <TrendingUp size={12} />
                    {p.badge}
                  </div>
                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="text-white drop-shadow-md">
                      <div className="text-xs font-semibold uppercase tracking-widest opacity-90">{p.category} · {p.year}</div>
                      <div className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-5">
                  <div className="text-sm text-foreground/70">{p.client}</div>
                  <ExternalLink size={16} className="text-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <SectionEyebrow>Your project next?</SectionEyebrow>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Let's make something we'll both be proud of.</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/contact" variant="primary" className="px-7 py-4 text-sm">Start a project</MagneticButton>
            <Link to="/services" className="text-sm font-semibold link-underline">Or explore our services →</Link>
          </div>
        </div>
      </section>

      {/* Preview Overlay — uses position:fixed on itself, never touches body styles */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{
            opacity: overlayVisible ? 1 : 0,
            pointerEvents: overlayVisible ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeOverlay();
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: "oklch(0.12 0.03 240 / 0.55)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          />

          {/* Content */}
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-background shadow-float"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto" data-lenis-prevent>
              {/* Hero image */}
              <div className="relative aspect-[16/8] w-full overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, oklch(0.25 0.14 ${selected.hue ?? 220} / 0.45), transparent 55%), linear-gradient(0deg, oklch(0.1 0.04 ${selected.hue ?? 220} / 0.65), transparent 55%)`,
                  }}
                />
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeOverlay}
                  aria-label="Close preview"
                  className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition hover:bg-white/40"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest opacity-90">
                      {selected.category}
                      {selected.meta ? ` · ${selected.meta}` : ""}
                    </div>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                      {selected.title}
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
                    <TrendingUp size={14} />
                    {selected.badge}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3 md:p-10">
                {[
                  ["Challenge", selected.challenge],
                  ["Solution", selected.solution],
                  ["Process", selected.process],
                ].map(([label, body]) => (
                  <div key={label}>
                    <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">
                      {label}
                    </div>
                    <p className="mt-2 text-foreground/80">{body}</p>
                  </div>
                ))}
              </div>

              {/* Results */}
              <div className="px-8 pb-8 md:px-10">
                <div className="text-xs font-semibold uppercase tracking-widest text-gradient-brand">
                  Results
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {selected.results.map((r) => (
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

              {/* CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 bg-soft-grey/50 p-8 md:p-10">
                <div className="text-sm text-foreground/70">
                  Want a result like this for your brand?
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow-brand transition hover:opacity-95"
                >
                  Start a similar project
                  <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
