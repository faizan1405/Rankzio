import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { serviceHeadScripts } from "@/lib/structured-data";
import img from "@/assets/service-ai.jpg";
import midImg from "@/assets/work-crm.jpg";

import { SITE } from "@/lib/site-url";
const T = "AI Chatbot & Automation";
const desc = "Custom AI agents that qualify leads, answer support and automate ops — trained on your data, integrated with your stack.";

const faq = [
  { q: "What models do you use?", a: "Whichever fits — GPT, Claude, Gemini or open source. We route through Lovable AI Gateway so you can swap anytime." },
  { q: "Will my data be secure?", a: "Yes. We use zero-retention endpoints, private vector stores and role-based access." },
  { q: "Can it integrate with my CRM?", a: "Yes — HubSpot, Salesforce, Zoho, Pipedrive, Airtable and 500+ other tools." },
  { q: "How much does it cost?", a: "Simple bots from ₹80k. Custom agents with integrations start at ₹2.5L." },
];

export const Route = createFileRoute("/services/ai-chatbot-automation")({
  head: () => ({
    meta: [
      { title: `${T} — Custom AI Agents for Growth | Rankzio` },
      { name: "description", content: desc },
      { property: "og:title", content: `${T} — Rankzio` },
      { property: "og:description", content: desc },
      { property: "og:image", content: `${SITE}${img}` },
      { property: "og:url", content: `${SITE}/services/ai-chatbot-automation` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/services/ai-chatbot-automation` }],
    scripts: serviceHeadScripts({ name: T, description: desc, slug: "ai-chatbot-automation", image: img, faq }),
  }),
  component: AiChatbotAutomationPage,
});

function AiChatbotAutomationPage() {
  return (
    <ServicePage
      slug="ai-chatbot-automation"
      title={T}
      eyebrow="AI systems"
      headline="AI that sells, supports and ships."
      description="Custom chatbots, workflow automations and internal AI tools — built on your data, integrated with your CRM, live in weeks."
      image={img}
      midImage={midImg}
      overview="From WhatsApp AI receptionists to internal RAG-powered knowledge bases, we design AI systems your team actually uses and your customers actually love."
      problem="Off-the-shelf bots hallucinate, break at edge cases and never touch your CRM. Most brands abandon them within a quarter."
      solution="We build production-grade AI agents on GPT / Claude / Gemini with retrieval, tool use, evals and human-in-the-loop — wired into your CRM, calendar, WhatsApp and website."
      benefits={[
        "Lead qualification 24/7 across web, WhatsApp and Instagram",
        "Customer support that resolves 60%+ of tickets",
        "Internal RAG knowledge bases for your team",
        "Automated proposal, quote and follow-up flows",
        "Full logs, evals and human-review workflows",
        "Built on Lovable AI Gateway — swap models anytime",
      ]}
      technologies={["OpenAI", "Anthropic", "Google Gemini", "Lovable AI Gateway", "Zapier", "n8n", "Airtable", "HubSpot", "Twilio", "WhatsApp Business API"]}
      process={[
        { step: "01", title: "Discovery", body: "Map the workflow, data sources and success metrics." },
        { step: "02", title: "Prototype", body: "Working prototype in 1–2 weeks, tested on real conversations." },
        { step: "03", title: "Integrate", body: "Wire into CRM, WhatsApp, website and internal tools." },
        { step: "04", title: "Iterate", body: "Weekly evals, prompt tuning and model upgrades." },
      ]}
      faq={faq}
      related={[
        { title: "Website Development", to: "/services/website-development" },
        { title: "AI SEO", to: "/services/ai-seo" },
        { title: "Content Writing", to: "/services/content-writing" },
      ]}
      metaTitle={`${T} — Rankzio`}
      metaDescription={desc}
    />
  );
}
