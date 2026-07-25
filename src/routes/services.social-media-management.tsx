import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { serviceHeadScripts } from "@/lib/structured-data";
import img from "@/assets/service-social.jpg";
import midImg from "@/assets/work-skincare.jpg";

const SITE = "https://rank-zio-canvas.lovable.app";
const T = "Social Media Management";
const desc = "Editorial, reels, community and creator partnerships — social that builds real audiences and moves inventory.";

const faq = [
  { q: "Which platforms do you handle?", a: "Instagram, LinkedIn, YouTube Shorts and TikTok. We pick 1–2 based on where your audience is." },
  { q: "Do you shoot content?", a: "Yes. We handle production in Delhi or coordinate remote shoots anywhere." },
  { q: "Do you handle paid social?", a: "We amplify top-performing organic posts. For full-funnel campaigns, pair with our Ads service." },
  { q: "What's the minimum commitment?", a: "3 months to see meaningful traction. Most partners stay 12+ months." },
];

export const Route = createFileRoute("/services/social-media-management")({
  head: () => ({
    meta: [
      { title: `${T} — Instagram, Reels & Community | Rankzio` },
      { name: "description", content: desc },
      { property: "og:title", content: `${T} — Rankzio` },
      { property: "og:description", content: desc },
      { property: "og:image", content: `${SITE}${img}` },
      { property: "og:url", content: `${SITE}/services/social-media-management` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/services/social-media-management` }],
    scripts: serviceHeadScripts({ name: T, description: desc, slug: "social-media-management", image: img, faq }),
  }),
  component: SocialMediaManagementPage,
});

function SocialMediaManagementPage() {
  return (
    <ServicePage
      slug="social-media-management"
      title={T}
      eyebrow="Feed, reels, community"
      headline="Social that sounds like you — and moves numbers."
      description="Strategy, art direction, monthly content and community building for brands who want an audience, not just followers."
      image={img}
      midImage={midImg}
      overview="Content pillars, monthly editorial calendars, reels production, community management, creator collabs and paid amplification — one team, one voice."
      problem="Most brands post beautifully and sell nothing. The rest sell hard and lose the audience."
      solution="We build a brand voice, a monthly editorial engine and a community layer — measured by saves, DMs and revenue, not just likes."
      benefits={[
        "Monthly content calendar aligned to campaigns",
        "In-house reels and static production",
        "Community management within 2 hours",
        "Creator and UGC partnerships",
        "Paid amplification for top posts",
        "Monthly performance and creative reports",
      ]}
      technologies={["Meta Suite", "Later", "Notion", "CapCut", "Figma", "Adobe Premiere", "Airtable", "ChatGPT"]}
      process={[
        { step: "01", title: "Brand voice", body: "Positioning, pillars, tone-of-voice guide and reference boards." },
        { step: "02", title: "Content OS", body: "Monthly calendar, scripts, shot lists and approval workflow." },
        { step: "03", title: "Ship weekly", body: "Static, reels, stories and community — shipped every week." },
        { step: "04", title: "Amplify", body: "Boost winners, iterate creative, report on saves + DMs." },
      ]}
      faq={faq}
      related={[
        { title: "Google & Meta Ads", to: "/services/google-meta-ads" },
        { title: "Content Writing", to: "/services/content-writing" },
        { title: "AI Chatbot & Automation", to: "/services/ai-chatbot-automation" },
      ]}
      metaTitle={`${T} — Rankzio`}
      metaDescription={desc}
    />
  );
}
