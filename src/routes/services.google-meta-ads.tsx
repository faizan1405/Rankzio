import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { serviceHeadScripts } from "@/lib/structured-data";
import img from "@/assets/service-ads.jpg";
import midImg from "@/assets/work-google-ads.jpg";

import { SITE } from "@/lib/site-url";
const T = "Google & Meta Ads";
const desc = "Full-funnel Google and Meta ads engineered for ROAS — search, PMax, YouTube, Instagram, Facebook and remarketing.";

const faq = [
  { q: "What's a typical ad spend?", a: "We work best with brands spending ₹2L+ / month on media. Under that, focus on organic first." },
  { q: "Do you produce creative?", a: "Yes. Static, video and copy — all in-house, tested weekly." },
  { q: "How do you charge?", a: "Flat monthly retainer, not a % of spend. Your incentives, our incentives — same direction." },
  { q: "Can you fix a broken account?", a: "Almost always. Most 'broken' accounts are actually tracking and creative problems, not bidding." },
];

export const Route = createFileRoute("/services/google-meta-ads")({
  head: () => ({
    meta: [
      { title: `${T} — Ads Built for ROAS, Not Vanity | Rankzio` },
      { name: "description", content: desc },
      { property: "og:title", content: `${T} — Rankzio` },
      { property: "og:description", content: desc },
      { property: "og:image", content: `${SITE}${img}` },
      { property: "og:url", content: `${SITE}/services/google-meta-ads` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/services/google-meta-ads` }],
    scripts: serviceHeadScripts({ name: T, description: desc, slug: "google-meta-ads", image: img, faq }),
  }),
  component: GoogleMetaAdsPage,
});

function GoogleMetaAdsPage() {
  return (
    <ServicePage
      slug="google-meta-ads"
      title={T}
      eyebrow="Performance marketing"
      headline="Ads engineered for ROAS."
      description="Google Search, PMax, YouTube, Instagram, Facebook, remarketing and creative — one team owning strategy, creative and media."
      image={img}
      midImage={midImg}
      overview="From account setup to daily optimization, we run performance campaigns as a single system — creative testing, audience research, landing-page CRO and revenue attribution."
      problem="Most ad agencies are creative shops with a media buyer, or media buyers with no creative. Both leak money."
      solution="Our media buyers, copywriters and designers work in the same room, testing creative against audiences daily and reporting on cost-per-acquisition — not impressions."
      benefits={[
        "Weekly creative testing across 6+ concepts",
        "Full-funnel campaign structure (top → bottom)",
        "Server-side tracking with GA4 + GTM",
        "Landing-page CRO handled in-house",
        "Attribution reports tied to revenue",
        "Transparent, ad-spend agnostic pricing",
      ]}
      technologies={["Google Ads", "Meta Ads Manager", "GA4", "GTM", "Server-Side Tracking", "Looker Studio", "Hotjar", "Zapier"]}
      process={[
        { step: "01", title: "Audit", body: "Account, creative and attribution audit against benchmarks." },
        { step: "02", title: "Rebuild", body: "Clean campaign architecture, tracking and creative pipeline." },
        { step: "03", title: "Launch", body: "Ship 6+ creatives across 3+ audiences on day one." },
        { step: "04", title: "Optimize", body: "Daily bid, creative and audience iteration; weekly reports." },
      ]}
      faq={faq}
      related={[
        { title: "Website Development", to: "/services/website-development" },
        { title: "AI SEO", to: "/services/ai-seo" },
        { title: "Social Media Management", to: "/services/social-media-management" },
      ]}
      metaTitle={`${T} — Rankzio`}
      metaDescription={desc}
    />
  );
}
