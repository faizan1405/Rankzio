import { SITE } from "@/lib/site-url";

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE}/services/${opts.slug}`,
    ...(opts.image ? { image: `${SITE}${opts.image}` } : {}),
    provider: {
      "@type": "Organization",
      name: "Rankzio Digital",
      url: SITE,
    },
    areaServed: "Worldwide",
  };
}

export function serviceHeadScripts(opts: {
  name: string;
  description: string;
  slug: string;
  image?: string;
  faq: { q: string; a: string }[];
}) {
  return [
    {
      type: "application/ld+json",
      children: JSON.stringify(serviceJsonLd(opts)),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify(faqJsonLd(opts.faq)),
    },
  ];
}
