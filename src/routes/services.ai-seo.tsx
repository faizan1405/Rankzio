import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { serviceHeadScripts } from "@/lib/structured-data";
import img from "@/assets/service-seo.jpg";
import midImg from "@/assets/work-analytics.jpg";

import { SITE } from "@/lib/site-url";
const T = "AI SEO";
const desc = "AI-first SEO that ranks in Google and inside ChatGPT, Perplexity and Gemini answers — technical, content and links, done right.";

const faq = [
  { q: "How long until I see results?", a: "Technical wins land in weeks; content and links compound over 3–6 months." },
  { q: "Do you guarantee rankings?", a: "No — anyone who does is lying. We guarantee process, effort and transparency." },
  { q: "Can you help me rank in AI answers?", a: "Yes. Generative-engine optimization (GEO) is now a core part of every SEO engagement." },
  { q: "Do you handle international SEO?", a: "Yes. hreflang, localized content, multi-region hosting — all in scope." },
];

export const Route = createFileRoute("/services/ai-seo")({
  head: () => ({
    meta: [
      { title: `${T} — Rank in Google AND AI Answers | Rankzio` },
      { name: "description", content: desc },
      { property: "og:title", content: `${T} — Rankzio` },
      { property: "og:description", content: desc },
      { property: "og:image", content: `${SITE}${img}` },
      { property: "og:url", content: `${SITE}/services/ai-seo` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/services/ai-seo` }],
    scripts: serviceHeadScripts({ name: T, description: desc, slug: "ai-seo", image: img, faq }),
  }),
  component: AiSeoPage,
});

function AiSeoPage() {
  return (
    <ServicePage
      slug="ai-seo"
      title={T}
      eyebrow="Search you can trust"
      headline="SEO that compounds — in Google and in AI."
      description="Modern SEO is more than keywords. We engineer technical foundations, editorial content and citations so your brand shows up first, whether the searcher is on Google or asking an AI."
      image={img}
      midImage={midImg}
      overview="A full-stack SEO engine: audit, technical fixes, on-page, content, links, digital PR and generative-engine optimization. Reported monthly with metrics that map to revenue."
      problem="Traffic is shifting to AI answer engines faster than most brands realize. Legacy SEO strategies rank pages nobody clicks."
      solution="We build content, schema and citations that appear inside AI answers — while doubling down on Core Web Vitals, entity SEO and topical authority so classic Google traffic keeps growing too."
      benefits={[
        "Rank in ChatGPT, Perplexity, Gemini and Google",
        "Technical SEO health at 95+",
        "Editorial calendar driven by intent and gaps",
        "Digital PR and link acquisition",
        "Entity + schema optimization",
        "Monthly reports tied to revenue",
      ]}
      technologies={["Ahrefs", "SEMrush", "Screaming Frog", "GSC", "GA4", "Surfer", "Frase", "Schema.org", "Cloudflare", "Google BigQuery"]}
      process={[
        { step: "01", title: "Audit", body: "Full technical, content and backlink audit against your top 5 competitors." },
        { step: "02", title: "Roadmap", body: "12-month content and technical roadmap prioritized by ROI." },
        { step: "03", title: "Execute", body: "We ship fixes, publish content and earn links every week." },
        { step: "04", title: "Report", body: "Monthly reports tying rankings and traffic to pipeline." },
      ]}
      faq={faq}
      related={[
        { title: "Content Writing", to: "/services/content-writing" },
        { title: "Website Development", to: "/services/website-development" },
        { title: "Google & Meta Ads", to: "/services/google-meta-ads" },
      ]}
      metaTitle={`${T} — Rankzio`}
      metaDescription={desc}
    />
  );
}
