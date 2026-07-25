import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { ArrowUpRight, Globe, Search, Share2, Megaphone, Bot, FileText } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import svcWebdev from "@/assets/svc-webdev.jpg";
import svcSeo from "@/assets/svc-seo.jpg";
import svcSocial from "@/assets/svc-social.jpg";
import svcAds from "@/assets/svc-ads.jpg";
import svcAutomation from "@/assets/svc-automation.jpg";
import svcContent from "@/assets/svc-content.jpg";

const services = [
  { icon: Globe, image: svcWebdev, slug: "website-development", title: "Website Development", price: "$149", unit: "", desc: "Conversion-first websites engineered for speed, story and search.", features: ["Custom design system", "Blazing Core Web Vitals", "CMS + analytics wired", "SEO-ready architecture"] },
  { icon: Search, image: svcSeo, slug: "ai-seo", title: "AI SEO", price: "$99", unit: "/mo", desc: "Rank for the searches that grow revenue — not vanity keywords.", features: ["Topical authority maps", "AI content briefs", "Technical + on-page fixes", "Monthly growth reporting"] },
  { icon: Share2, image: svcSocial, slug: "social-media-management", title: "Social Media Management", price: "$99", unit: "/mo", desc: "Editorial-grade content, community and consistency across every platform.", features: ["Monthly content calendar", "Reels, carousels, statics", "Community management", "Performance insights"] },
  { icon: Megaphone, image: svcAds, slug: "google-meta-ads", title: "Google & Meta Ads", price: "$49", unit: "/mo", desc: "Full-funnel paid media tuned by data — creative, bidding, landing.", features: ["Campaign architecture", "Creative testing loop", "Conversion tracking", "ROAS-focused reporting"] },
  { icon: Bot, image: svcAutomation, slug: "ai-chatbot-automation", title: "AI Chatbot & Automation", price: "$49", unit: "/mo", desc: "Assistants trained on your business to qualify, answer and book 24/7.", features: ["Custom knowledge base", "Multi-channel deploy", "CRM + calendar sync", "Continuous training"] },
  { icon: FileText, image: svcContent, slug: "content-writing", title: "Content Writing", price: "$0.02", unit: "/word", desc: "Editorial copy that ranks, resonates and converts — at AI-plus-human speed.", features: ["SEO-optimised drafts", "Human editorial pass", "Brand voice tuning", "Fast turnarounds"] },
];

function ServiceCard({ i, s }: { i: number; s: typeof services[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 18 });
  const gx = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const gy = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  const Icon = s.icon;
  const msg = `Hi Rank Zio, I'm interested in ${s.title} (${s.price}${s.unit}). Can we chat?`;

  return (
    <Reveal delay={i * 0.05}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative h-full rounded-3xl p-[1.5px] transition-shadow duration-500 hover:shadow-glow-brand"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, oklch(0.72 0.19 155), oklch(0.62 0.18 245))`,
          }}
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1.5px)] glass p-8">
          {/* Service illustration — pops out & tilts on hover */}
          <div className="relative -mx-2 -mt-2 mb-4 h-40 overflow-visible">
            <motion.img
              src={s.image}
              alt={s.title}
              loading="lazy"
              className="pointer-events-none absolute inset-x-2 top-0 h-40 w-[calc(100%-1rem)] rounded-2xl object-cover shadow-soft transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-[1.08] group-hover:shadow-glow-brand"
              style={{ willChange: "transform" }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: i * 0.3 }}
            />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow-brand transition-transform duration-500 group-hover:-rotate-6">
              <Icon size={26} strokeWidth={1.75} />
            </div>
            <div className="text-right">
              <div className="text-3xl font-semibold tracking-tight text-gradient-brand">{s.price}</div>
              <div className="text-xs text-foreground/50">{s.unit || "one-time"}</div>
            </div>
          </div>

          <a href={`/services/${s.slug}`} className="mt-6 block">
            <h3 className="text-xl font-semibold tracking-tight hover:text-gradient-brand">{s.title}</h3>
          </a>
          <p className="mt-2 text-sm leading-relaxed text-foreground/65">{s.desc}</p>

          <ul className="mt-6 space-y-2 text-sm text-foreground/75">
            {s.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex-1" />

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`/services/${s.slug}`}
              className="relative inline-flex flex-1 items-center justify-between overflow-hidden rounded-full border border-foreground/10 bg-white/50 px-5 py-3 text-sm font-medium transition-all duration-500 hover:border-transparent hover:text-white"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom translate-y-full bg-gradient-brand transition-transform duration-500 group-hover:translate-y-0"
              />
              <span className="relative">Learn more</span>
              <ArrowUpRight size={16} className="relative transition-transform duration-500 group-hover:rotate-45" />
            </a>
            <a
              href={waLink(msg)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Chat about ${s.title}`}
              className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-4 py-3 text-xs font-semibold text-white shadow-glow-brand"
            >
              Chat
            </a>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-32 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal><SectionEyebrow>Services</SectionEyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
                Everything you need to <span className="text-gradient-brand">grow</span>, engineered end-to-end.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-foreground/65">
              One studio. Six growth engines. Priced to start today, built to compound for years.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} i={i} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
