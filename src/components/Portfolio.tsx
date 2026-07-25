import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import {
  PortfolioPreviewCard,
  PortfolioPreviewModal,
  type PreviewProject,
} from "./PortfolioPreview";
import workSkincare from "@/assets/work-skincare.jpg";
import workInterior from "@/assets/work-interior.jpg";
import workFintech from "@/assets/work-fintech.jpg";
import workSeo from "@/assets/work-seo.jpg";
import workAnalytics from "@/assets/work-analytics.jpg";
import workGoogleAds from "@/assets/work-google-ads.jpg";
import workMetaAds from "@/assets/work-meta-ads.jpg";
import workSocial from "@/assets/work-social.jpg";

interface HomeProject extends PreviewProject {
  overview: string;
  industry: string;
}

const projects: HomeProject[] = [
  { id: "1", title: "Lumen Skincare", category: "Website", industry: "Beauty & DTC", meta: "Beauty & DTC",
    overview: "A cinematic DTC storefront that turned skincare browsing into an editorial experience.",
    badge: "+312% Revenue", image: workSkincare, hue: 155,
    challenge: "A premium brand stuck on a generic template with a 4.2% conversion ceiling.",
    solution: "Custom design system, editorial PDPs and a story-first homepage tied to lifecycle email.",
    process: "Audited 200+ competitor storefronts, mapped 40 UX friction points, rebuilt over 10 weeks.",
    results: [{label:"Traffic",value:"+284%"},{label:"Conversion",value:"+61%"},{label:"AOV",value:"+38%"},{label:"Bounce",value:"-42%"}] },
  { id: "2", title: "Northwind Realty", category: "Website", industry: "Real Estate", meta: "Real Estate",
    overview: "A high-end property discovery experience built for a boutique brokerage.",
    badge: "+220% Leads", image: workInterior, hue: 245,
    challenge: "Listings were buried under a slow, dated MLS-style UI.",
    solution: "Rebuilt around a cinematic map and editorial listing storytelling.",
    process: "Interviewed 12 agents and 30 buyers to map the true discovery journey.",
    results: [{label:"Leads",value:"+220%"},{label:"Time",value:"+3.4x"},{label:"CTR",value:"+58%"},{label:"Bounce",value:"-51%"}] },
  { id: "3", title: "Forge Fitness", category: "Website", industry: "Fitness SaaS", meta: "Fitness SaaS",
    overview: "A member portal + marketing site rebuild for a fast-growing studio brand.",
    badge: "4.8s → 0.9s LCP", image: workAnalytics, hue: 195,
    challenge: "Slow, fragmented member experience blocking growth.",
    solution: "Unified marketing + product design with real-time class booking.",
    process: "Session-replay analysis on 5,000 visits surfaced 18 blockers we systematically removed.",
    results: [{label:"LCP",value:"-81%"},{label:"Signups",value:"+147%"},{label:"Retention",value:"+22%"},{label:"NPS",value:"+34"}] },
  { id: "4", title: "Verdant Bank", category: "Website", industry: "Fintech", meta: "Fintech",
    overview: "Marketing site rebuild for a challenger bank targeting Gen Z.",
    badge: "+189% Signups", image: workFintech, hue: 245,
    challenge: "Trust-heavy category with a boring visual language.",
    solution: "A calm, opinionated design system with product-led storytelling.",
    process: "Brand + UX audit across 40 fintech competitors, then a 6-week rebuild sprint.",
    results: [{label:"Signups",value:"+189%"},{label:"CAC",value:"-34%"},{label:"Session",value:"+2.1x"},{label:"Conv.",value:"+72%"}] },
  { id: "5", title: "Atlas Studios", category: "Website", industry: "Creative Agency", meta: "Creative Agency",
    overview: "A portfolio site that reads like a magazine and moves like a film.",
    badge: "Awwwards Nom.", image: workInterior, hue: 195,
    challenge: "A world-class studio with a portfolio that undersold them.",
    solution: "Editorial-first case studies with heavy motion craft.",
    process: "Interviewed past clients to understand what actually made them buy.",
    results: [{label:"Inbound",value:"+3.2x"},{label:"Deal size",value:"+58%"},{label:"Time",value:"4:20"},{label:"Bounce",value:"-46%"}] },
  { id: "6", title: "Meridian Legal", category: "SEO", industry: "Legal", meta: "Legal Services",
    overview: "Built a topical authority engine that owns 400+ high-intent queries.",
    badge: "+512% Organic", image: workSeo, hue: 155,
    challenge: "A regional firm invisible for its most valuable services.",
    solution: "Programmatic hub-and-spoke content plus a technical SEO overhaul.",
    process: "Mapped 1,200 buyer questions across 8 practice areas, then built content clusters.",
    results: [{label:"Organic",value:"+512%"},{label:"#1s",value:"400+"},{label:"CTR",value:"+64%"},{label:"Leads",value:"+280%"}] },
  { id: "7", title: "Kettle & Co", category: "SEO", industry: "Ecommerce", meta: "Ecommerce",
    overview: "Turned a stagnant food brand's blog into their #1 revenue channel.",
    badge: "6x Organic Rev", image: workSeo, hue: 245,
    challenge: "Blog traffic didn't convert. Category pages didn't rank.",
    solution: "Recipe-to-product internal linking plus PDP content upgrades.",
    process: "Mined 8,000 SERPs for commercial-intent recipe queries, then rebuilt the blog IA.",
    results: [{label:"Rev",value:"+512%"},{label:"Sessions",value:"+340%"},{label:"AOV",value:"+18%"},{label:"Top 3",value:"180+"}] },
  { id: "8", title: "Nova Skincare Ads", category: "Ads", industry: "DTC Beauty", meta: "DTC Beauty",
    overview: "Full-funnel paid rebuild that 4x'd ROAS in a saturated category.",
    badge: "4.2x ROAS", image: workMetaAds, hue: 155,
    challenge: "Rising CPMs eating margin. Creative fatigue everywhere.",
    solution: "Modular creative system plus a weekly test-and-scale cadence.",
    process: "Analysed 6 months of creative + audience data to build a UGC-first system.",
    results: [{label:"ROAS",value:"4.2x"},{label:"CPC",value:"-38%"},{label:"CTR",value:"+112%"},{label:"CVR",value:"+64%"}] },
  { id: "9", title: "Peak Performance Ads", category: "Ads", industry: "Fitness SaaS", meta: "Fitness SaaS",
    overview: "A pipeline-first Google Ads rebuild for a B2C fitness app.",
    badge: "-52% CPA", image: workGoogleAds, hue: 245,
    challenge: "Great product, terrible unit economics on paid.",
    solution: "Rebuilt tracking plus a full search restructure around intent.",
    process: "Attribution audit revealed 40% of conversions were miscredited — we fixed the pipeline first.",
    results: [{label:"CPA",value:"-52%"},{label:"Conv.",value:"+248%"},{label:"CTR",value:"+87%"},{label:"QS",value:"9/10"}] },
  { id: "10", title: "Studio Fern Social", category: "Social", industry: "Interior Design", meta: "Interior Design",
    overview: "Built a distinctive editorial voice that grew IG from 4k to 84k.",
    badge: "20x Followers", image: workSocial, hue: 195,
    challenge: "Beautiful projects, invisible online.",
    solution: "A monthly editorial calendar with a signature visual system.",
    process: "Content audit of 60 top interior brands worldwide to define a unique voice.",
    results: [{label:"Followers",value:"+20x"},{label:"Engage",value:"+340%"},{label:"Inbound",value:"+8x"},{label:"Reach",value:"12M"}] },
];

function CardBody({ p }: { p: HomeProject }) {
  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-t-3xl opacity-0 ring-2 ring-inset ring-white/40 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-semibold text-foreground shadow-soft">
          <TrendingUp size={12} />
          {p.badge}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-foreground/50">
          <span>{p.category}</span>
          <span>{p.industry}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-foreground/60">{p.overview}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground/70 opacity-0 -translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View case study <ArrowUpRight size={16} />
        </div>
      </div>
    </>
  );
}

export function Portfolio() {
  const [open, setOpen] = useState<string | null>(null);
  const active = projects.find((p) => p.id === open);
  return (
    <section id="work" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal><SectionEyebrow>Featured Work</SectionEyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
                Ten brands. One <span className="text-gradient-brand">unfair advantage</span>.
              </h2>
            </Reveal>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.05}>
              <PortfolioPreviewCard project={p} onOpen={setOpen}>
                <CardBody p={p} />
              </PortfolioPreviewCard>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <PortfolioPreviewModal project={active} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
