import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://rank-zio-digitaly.lovable.app";

const paths = [
  "/",
  "/about",
  "/services",
  "/services/website-development",
  "/services/ai-seo",
  "/services/social-media-management",
  "/services/google-meta-ads",
  "/services/ai-chatbot-automation",
  "/services/content-writing",
  "/portfolio",
  "/blog",
  "/blog/generative-engine-optimization-2026",
  "/blog/why-your-brand-website-is-costing-you-revenue",
  "/blog/meta-ads-creative-testing-2026",
  "/contact",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
