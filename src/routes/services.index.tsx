import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { ArrowUpRight, Globe, Search, Instagram, Megaphone, Bot, PenLine } from "lucide-react";
import servicesImg from "@/assets/services-dashboard.jpg";
import svcWebdev from "@/assets/svc-webdev.jpg";
import svcSeo from "@/assets/svc-seo.jpg";
import svcSocial from "@/assets/svc-social.jpg";
import svcAds from "@/assets/svc-ads.jpg";
import svcAutomation from "@/assets/svc-automation.jpg";
import svcContent from "@/assets/svc-content.jpg";

const SITE = "https://rank-zio-canvas.lovable.app";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Rankzio | Websites, SEO, Ads, AI & Content" },
      { name: "description", content: "Everything your brand needs to grow: premium websites, AI-driven SEO, social media, Google and Meta ads, AI chatbots and long-form content — from one senior studio." },
      { property: "og:title", content: "Services — Rankzio | Websites, SEO, Ads, AI & Content" },
      { property: "og:url", content: `${SITE}/services` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/services` }],
  }),
  component: ServicesPage,
});

const services = [
  { Icon: Globe, title: "Website Development", to: "/services/website-development", desc: "Award-worthy, blazing-fast sites engineered to convert.", tint: "245", image: svcWebdev },
  { Icon: Search, title: "AI SEO", to: "/services/ai-seo", desc: "Rank in AI answers and Google — technical, content and links.", tint: "155", image: svcSeo },
  { Icon: Instagram, title: "Social Media Management", to: "/services/social-media-management", desc: "Content, reels and community that builds a real audience.", tint: "195", image: svcSocial },
  { Icon: Megaphone, title: "Google & Meta Ads", to: "/services/google-meta-ads", desc: "Performance ads engineered for ROAS, not vanity clicks.", tint: "258", image: svcAds },
  { Icon: Bot, title: "AI Chatbot & Automation", to: "/services/ai-chatbot-automation", desc: "Custom AI agents that sell, support and automate ops.", tint: "155", image: svcAutomation },
  { Icon: PenLine, title: "Content Writing", to: "/services/content-writing", desc: "Editorial articles that rank, convert and sound human.", tint: "245", image: svcContent },
] as const;

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={<>Six services. <span className="text-gradient-brand text-drift">One growth engine.</span></>}
        description="Every service is designed to plug into the next — so your brand, traffic, conversions and automations compound instead of competing for attention."
        image={servicesImg}
        imageAlt="Holographic marketing analytics dashboard floating in mid-air"
        variant="showcase"
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See our work", href: "/portfolio" }}
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionEyebrow>Our services</SectionEyebrow>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">Choose one, or the whole stack — we're built for both.</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ Icon, title, to, desc, tint, image }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <Link to={to} className="group block h-full [perspective:1200px]">
                  <motion.div
                    whileHover={{ y: -10, rotateX: 4, rotateY: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative h-full overflow-hidden rounded-3xl glass transition-shadow duration-500 hover:shadow-float"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.15]"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `radial-gradient(60% 60% at 50% 50%, oklch(0.72 0.2 ${tint} / 0.55), transparent 70%)` }}
                      />
                      <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 ring-2 ring-inset ring-white/40 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                    <div className="relative p-8">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                        style={{ background: `radial-gradient(closest-side, oklch(0.7 0.2 ${tint} / 0.5), transparent)` }}
                      />
                      <div className="relative flex items-center justify-between">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow-brand transition-transform duration-500 group-hover:-translate-y-1">
                          <Icon size={20} />
                        </div>
                        <ArrowUpRight size={18} className="text-foreground/50 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                      <h3 className="relative mt-6 text-xl font-semibold tracking-tight">{title}</h3>
                      <p className="relative mt-2 text-foreground/70">{desc}</p>
                      <div className="relative mt-6 text-sm font-medium text-brand-blue">Explore service →</div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
