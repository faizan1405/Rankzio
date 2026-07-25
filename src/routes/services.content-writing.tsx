import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { serviceHeadScripts } from "@/lib/structured-data";
import img from "@/assets/service-content.jpg";
import midImg from "@/assets/work-interior.jpg";

const SITE = "https://rank-zio-canvas.lovable.app";
const T = "Content Writing";
const desc = "Editorial articles, landing pages and thought-leadership that rank in search, convert visitors and sound distinctly human.";

const faq = [
  { q: "Do you use AI to write?", a: "AI assists with research and outlines. Every published word is written or heavily edited by a human." },
  { q: "How many articles per month?", a: "Most partners publish 4–8 long-form pieces. Quality over volume." },
  { q: "Do you handle publishing?", a: "Yes. We format, upload, add schema and internal links on your CMS." },
  { q: "Can you write in our brand voice?", a: "Yes. We build a voice guide in week one and every piece follows it." },
];

export const Route = createFileRoute("/services/content-writing")({
  head: () => ({
    meta: [
      { title: `${T} — Editorial Content That Ranks | Rankzio` },
      { name: "description", content: desc },
      { property: "og:title", content: `${T} — Rankzio` },
      { property: "og:description", content: desc },
      { property: "og:image", content: `${SITE}${img}` },
      { property: "og:url", content: `${SITE}/services/content-writing` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/services/content-writing` }],
    scripts: serviceHeadScripts({ name: T, description: desc, slug: "content-writing", image: img, faq }),
  }),
  component: ContentWritingPage,
});

function ContentWritingPage() {
  return (
    <ServicePage
      slug="content-writing"
      title={T}
      eyebrow="Words that work"
      headline="Editorial content that ranks and converts."
      description="Long-form articles, landing pages, thought-leadership and email — researched, edited and structured for both search and humans."
      image={img}
      midImage={midImg}
      overview="Human editors, AI-assisted research, subject-matter interviews and rigorous fact-checking. Every piece is designed to rank, convert or both."
      problem="AI has flooded the internet with average content. Google penalizes it, readers ignore it, and it rarely converts."
      solution="Senior editors lead every piece with real research, interviews and point of view — assisted by AI, never replaced by it. Content people actually read."
      benefits={[
        "Original research and subject-matter interviews",
        "Structured for search intent and featured snippets",
        "Human editors on every piece",
        "SEO-optimized without keyword stuffing",
        "Custom illustrations and diagrams",
        "Distribution across newsletter, LinkedIn and PR",
      ]}
      technologies={["Notion", "Google Docs", "Ahrefs", "Frase", "Grammarly", "Beehiiv", "ConvertKit", "Substack"]}
      process={[
        { step: "01", title: "Editorial plan", body: "12-month calendar mapped to SEO and business goals." },
        { step: "02", title: "Research", body: "Original data, interviews, competitor gaps." },
        { step: "03", title: "Write & edit", body: "Draft, structural edit, line edit, fact-check." },
        { step: "04", title: "Publish & promote", body: "Ship on your CMS, distribute across channels." },
      ]}
      faq={faq}
      related={[
        { title: "AI SEO", to: "/services/ai-seo" },
        { title: "Website Development", to: "/services/website-development" },
        { title: "Social Media Management", to: "/services/social-media-management" },
      ]}
      metaTitle={`${T} — Rankzio`}
      metaDescription={desc}
    />
  );
}
