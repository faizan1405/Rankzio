import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { serviceHeadScripts } from "@/lib/structured-data";
import img from "@/assets/service-webdev.jpg";
import midImg from "@/assets/work-fintech.jpg";

import { SITE } from "@/lib/site-url";
const T = "Website Development";
const desc = "Custom, fast, conversion-focused websites built on modern stacks — engineered for search, speed and story.";

const faq = [
  { q: "How long does a website take?", a: "Marketing sites ship in 4–8 weeks. Complex apps and e-commerce in 8–14 weeks." },
  { q: "Do you work with existing brands?", a: "Yes. We integrate seamlessly with your design system — or build one if you don't have one yet." },
  { q: "Will I be able to edit content?", a: "Absolutely. We build on modern headless CMSs like Sanity or Webflow so your team can move fast." },
  { q: "Do you handle hosting and SEO?", a: "Yes. We handle DNS, hosting, technical SEO and analytics through launch." },
];

export const Route = createFileRoute("/services/website-development")({
  head: () => ({
    meta: [
      { title: `${T} — Premium, Fast, Conversion-First | Rankzio` },
      { name: "description", content: desc },
      { property: "og:title", content: `${T} — Rankzio` },
      { property: "og:description", content: desc },
      { property: "og:image", content: `${SITE}${img}` },
      { property: "og:url", content: `${SITE}/services/website-development` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/services/website-development` }],
    scripts: serviceHeadScripts({ name: T, description: desc, slug: "website-development", image: img, faq }),
  }),
  component: WebsiteDevelopmentPage,
});

function WebsiteDevelopmentPage() {
  return (
    <ServicePage
      slug="website-development"
      title={T}
      eyebrow="Web design & development"
      headline="Websites people remember."
      description="We design and build premium marketing sites, e-commerce and web apps that load in under a second, rank in search, and turn visitors into customers."
      image={img}
      midImage={midImg}
      overview="From strategy to launch, we own every pixel and every millisecond. Custom design systems, motion, SEO foundations, CMS and analytics — shipped in weeks, not quarters."
      problem="Most agency sites are slow, hard to update and forgettable. They win awards on launch day and lose traffic every week after."
      solution="We ship on modern edge-rendered stacks (TanStack Start, Next.js, Astro, Shopify Hydrogen) with baked-in performance, SEO and CMS — plus a design language your brand actually owns."
      benefits={[
        "Sub-1 second largest contentful paint",
        "Core Web Vitals in the green from day one",
        "SEO foundations built into every route",
        "Editable in a CMS non-developers actually enjoy",
        "Design system that scales with your brand",
        "Analytics, tag manager, A/B testing pre-wired",
      ]}
      technologies={["TanStack Start", "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shopify", "Webflow", "Sanity", "Vercel", "Cloudflare"]}
      process={[
        { step: "01", title: "Strategy", body: "Positioning, IA, content and success metrics locked before a pixel moves." },
        { step: "02", title: "Design", body: "Custom art direction, motion and design system in Figma." },
        { step: "03", title: "Build", body: "Engineered on modern edge stacks with SEO and speed baked in." },
        { step: "04", title: "Launch & scale", body: "QA, analytics, CMS training, and ongoing growth iterations." },
      ]}
      faq={faq}
      related={[
        { title: "AI SEO", to: "/services/ai-seo" },
        { title: "Content Writing", to: "/services/content-writing" },
        { title: "Google & Meta Ads", to: "/services/google-meta-ads" },
      ]}
      metaTitle={`${T} — Rankzio`}
      metaDescription={desc}
    />
  );
}
