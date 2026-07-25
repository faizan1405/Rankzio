import blogGeo from "@/assets/blog-geo.jpg";
import blogWebsite from "@/assets/blog-website.jpg";
import blogMetaAds from "@/assets/blog-meta-ads.jpg";
import blogChatbot from "@/assets/blog-chatbot.jpg";
import blogSocial from "@/assets/blog-social.jpg";
import blogAutomation from "@/assets/blog-automation.jpg";
import svcSeo from "@/assets/svc-seo.jpg";
import svcWebdev from "@/assets/svc-webdev.jpg";
import svcAds from "@/assets/svc-ads.jpg";
import svcAutomation from "@/assets/svc-automation.jpg";
import svcSocial from "@/assets/svc-social.jpg";
import svcContent from "@/assets/svc-content.jpg";
import workAnalytics from "@/assets/work-analytics.jpg";
import workCrm from "@/assets/work-crm.jpg";
import workGoogleAds from "@/assets/work-google-ads.jpg";
import workAutomation from "@/assets/work-automation.jpg";
import workSkincare from "@/assets/work-skincare.jpg";
import workInterior from "@/assets/work-interior.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  hue: number;
  cover: string;
  secondary: string;
  midImage: string;
  faq: { q: string; a: string }[];
  body: { heading: string; paragraphs: string[] }[];
}


export const posts: BlogPost[] = [
  {
    slug: "ai-seo-guide",
    title: "Generative Engine Optimization: The New SEO Playbook",
    excerpt: "Google is no longer the only front door. Here's how to rank inside ChatGPT, Perplexity and Gemini answers — while keeping your Google traffic growing.",
    category: "AI SEO",
    author: "Karan Sethi",
    date: "May 14, 2026",
    readTime: "11 min read",
    hue: 245,
    cover: blogGeo,
    secondary: svcSeo,
    midImage: workAnalytics,
    faq: [
      { q: "Is GEO replacing SEO?", a: "No. GEO extends SEO. The same authoritative, structured content that ranks in Google is what AI engines cite — you're doubling the surface area of a single content investment." },
      { q: "How long until GEO shows results?", a: "AI engines re-index far faster than Google. We usually see brand mentions inside answers within 4–8 weeks of a serious GEO program, and stable citation share within a quarter." },
      { q: "Do I need to publish on Reddit and YouTube?", a: "Yes if you want to be cited. Third-party surfaces are heavily weighted in the corpora these engines pull from. A pure owned-media strategy under-indexes badly." },
      { q: "Can I measure GEO?", a: "Yes. Tools like Profound and Peec track your citation share in ChatGPT, Perplexity and Gemini. Pair that with referral traffic from those domains in GA4 for a full picture." },
    ],
    body: [
      { heading: "The shift nobody warned you about", paragraphs: [
        "In the last 18 months, a quiet shift has re-drawn how billions of people find information. AI answer engines like ChatGPT, Perplexity and Gemini now handle over 800 million queries a day. Many of those queries — especially high-intent, research-heavy ones — never touch a Google results page.",
        "For most brands, this is invisible until it isn't. Traffic reports look flat, then they start slipping, and by the time leadership notices, competitors already own the AI answer for the questions your customers ask.",
        "The uncomfortable truth: Google's ten blue links used to be the funnel. Now, half the funnel happens inside a chat interface that never sends the click. If you're not in that answer, you're not in that decision.",
      ]},
      { heading: "What Generative Engine Optimization actually is", paragraphs: [
        "GEO is the practice of structuring your content, citations and site architecture so AI systems select you as their source when generating an answer. It borrows from SEO — but the ranking signals are different.",
        "The three big levers: authoritative structured content, machine-readable citations (schema, hreflang, canonical), and repeated appearances across the corpora these engines train on (industry publications, Wikipedia, Reddit, YouTube).",
        "Where classic SEO optimizes for a click, GEO optimizes for a citation. A citation is worth more than a click when the buyer is doing research — because the AI hands them your name, your credibility and your point of view before they ever click anything.",
      ]},
      { heading: "A practical framework for GEO", paragraphs: [
        "Start with the questions. Interview 20 customers and 5 sales calls; write down every question they ask. These are the queries buyers will type into AI engines.",
        "Then write one canonical answer per question — clean H2/H3 structure, a direct answer in the first 60 words, a short table or list, and 2-3 citations to authoritative sources. Add FAQ schema. Add author schema. Publish once, update every 90 days.",
        "Layer in off-site presence: a Reddit thread that references the answer, a YouTube explainer with the same title, a guest post on a domain the engines already trust. Repetition across surfaces is what compounds citation share.",
      ]},
      { heading: "What it looks like when it works", paragraphs: [
        "Within 4-6 months of a GEO program, we typically see brand mentions in AI answers rise 6-10x, referral traffic from Perplexity and ChatGPT grow into the top 10 sources, and — importantly — Google organic traffic accelerate, because the same content is naturally EEAT-heavy.",
        "The compounding effect matters most. Once an engine cites you three or four times for a topic, you become a defended source. Displacing you gets harder every month, which is exactly the moat SEO used to build a decade ago — before it stopped compounding.",
      ]},
      { heading: "How to start this quarter", paragraphs: [
        "Pick your ten highest-intent buyer questions. Write one exceptional answer per question. Add schema. Distribute on two off-site surfaces per answer. Measure citation share weekly with Profound or a manual audit. Iterate.",
        "That's the whole playbook. It's boring, it's methodical, and it's how you own the next decade of search — no matter which interface the buyer chooses.",
      ]},
    ],
  },
  {
    slug: "website-development-trends",
    title: "Why Your Brand Website Is Quietly Costing You Revenue",
    excerpt: "A 3-second slower site can halve your conversion rate. Here's a walk-through of the technical and design decisions that quietly drain revenue — and the fixes that recover it.",
    category: "Websites",
    author: "Neha Verma",
    date: "April 22, 2026",
    readTime: "9 min read",
    hue: 155,
    cover: blogWebsite,
    secondary: svcWebdev,
    midImage: workCrm,
    faq: [
      { q: "How fast does a modern site need to be?", a: "Sub-1s LCP on 4G mobile is the new bar. Anything above 2.5s starts leaking conversion measurably." },
      { q: "Is Webflow / Wix fast enough?", a: "For content sites, yes — with discipline. For commerce or high-traffic funnels, an edge-rendered custom stack still wins on both speed and conversion." },
      { q: "How do I know my site is losing revenue?", a: "Compare mobile vs desktop conversion. A gap larger than 40% is almost always a speed or UX problem, not a mobile-user problem." },
      { q: "Do I need a full rebuild?", a: "Rarely. The four fixes below (images, fonts, scripts, edge rendering) recover most of the loss without touching design." },
    ],
    body: [
      { heading: "The hidden tax on a slow site", paragraphs: [
        "Every 100ms of latency on your homepage costs you conversion. Amazon quantified this at 1% per 100ms nearly a decade ago; modern e-commerce studies put the number closer to 2%. Yet most brand sites we audit still ship a 4-6 second LCP on mobile.",
        "The reason is almost never the CMS or hosting. It's usually the design system: unoptimized hero images, blocking third-party scripts, and layout thrash from lazy-loaded fonts.",
        "The math is brutal. A brand doing ₹4 crore a year in online revenue at a 2.1% conversion rate loses roughly ₹80 lakh by shipping at 4s instead of 1s — and it never appears on any dashboard, because you can't miss what you never earned.",
      ]},
      { heading: "The four fixes that move the needle", paragraphs: [
        "First, ship images in AVIF or WebP, sized to the viewport, with explicit width/height to prevent CLS. Second, self-host fonts and preload the two you use most. Third, defer every non-critical third-party script. Fourth, move to an edge-rendered stack so HTML arrives in under 200ms globally.",
        "Done together, these routinely move a 5s site to a sub-second one — and lift conversion 20-40% without changing a single word of copy.",
        "The order matters. Fix images first: the LCP element is almost always an image, and getting that one asset right recovers more speed than any other single change.",
      ]},
      { heading: "Design decisions that quietly kill conversion", paragraphs: [
        "Slow is one cost. Confusing is the other. The two most common design mistakes: heroes that don't say what the company does, and navigation that hides the primary action behind three clicks. Both are trivially fixed once you decide to prioritize the buyer over the brand team.",
        "The third mistake is scarier: sites designed for the pitch deck, not the buyer. Beautiful in a case study, unusable on a train. If you can't complete the primary action one-handed in 45 seconds, the design is wrong — no matter how many awards it wins.",
      ]},
      { heading: "The 30-day recovery plan", paragraphs: [
        "Week one: audit. Run Lighthouse on your top ten pages, plot LCP, CLS and INP. Week two: fix images and fonts. Week three: defer scripts and add a service worker. Week four: move to edge rendering if you're not already there.",
        "In our last 20 audits, this plan alone recovered an average of 3.1 seconds of LCP and lifted mobile conversion by 27%. Zero copy changes. Zero redesigns. Just the boring engineering that most agencies skip.",
      ]},
    ],
  },
  {
    slug: "google-ads-roas",
    title: "Meta Ads Creative Testing in 2026: What Actually Works",
    excerpt: "After a year of scaling accounts from ₹5L to ₹40L in monthly spend, here's the creative testing framework we now use for every performance client.",
    category: "Ads",
    author: "Rohit Kapadia",
    date: "March 30, 2026",
    readTime: "10 min read",
    hue: 258,
    cover: blogMetaAds,
    secondary: svcAds,
    midImage: workGoogleAds,
    faq: [
      { q: "How many creatives should I test per week?", a: "Six new concepts is the floor for accounts spending ₹5L+. Below that, three concepts weekly is enough — but consistency matters more than volume." },
      { q: "Is UGC still worth it in 2026?", a: "Yes. Long-form UGC (30–60s) remains the highest hook-rate format on Meta. It's still where most of our new winners come from." },
      { q: "What about Advantage+?", a: "Advantage+ is the default for most accounts under ₹50L monthly. Manual campaigns still beat it for brand campaigns and retargeting, but not for prospecting." },
      { q: "How do I know a creative is winning?", a: "Blended MER at the campaign level plus a 3-second hook rate above 30%. Look at CTR only as a diagnostic, never as a decision metric." },
    ],
    body: [
      { heading: "Why creative is now the whole game", paragraphs: [
        "Meta's algorithm has quietly automated most of the levers media buyers used to obsess over. Bidding, placements, audiences — the platform now does 80% of the work. What it can't do is generate the creative.",
        "That's why we run every performance account like a creative studio, not a media desk. Six new concepts per week, three formats each, tested against three audience buckets.",
        "The teams still winning in 2026 aren't better media buyers — they're better producers. They ship more, kill faster, and treat every ad account as a creative pipeline problem, not a bidding problem.",
      ]},
      { heading: "The concept-first framework", paragraphs: [
        "We start with concepts, not creatives. A concept is an angle — a problem, a promise, a proof, a personality. Each concept then gets three formats: static, short-form video, and long-form UGC.",
        "This gives us 18 assets per week per account. We ship them in batches of 6, kill the bottom 4, iterate the top 2 the following week. Rinse. Repeat. For 52 weeks a year.",
        "The math compounds. In a year, you've tested 300+ concepts. Even if only 10% win, that's 30 evergreen ads that keep spending profitably long after the launch. That library — not the media buyer — is the moat.",
      ]},
      { heading: "The metrics we actually look at", paragraphs: [
        "Not CTR. Not CPM. Hook rate at 3 seconds, hold rate at 15 seconds, click-through to ATC ratio, and blended MER (marketing efficiency ratio) at the account level. These four numbers tell us what to kill, what to scale, and what to iterate.",
        "The account-level MER is the one metric leadership should watch. Everything else is diagnostic. If MER holds while spend triples, you're winning. If it slips as you scale, the creative pipeline is the bottleneck — not the algorithm.",
      ]},
      { heading: "The compounding effect", paragraphs: [
        "Six months into this framework, most of our accounts have a library of 100+ winning concepts and a creative team that ships without waiting for briefs. That library is the moat — and it's why performance keeps improving even as CPMs climb.",
        "A note on cost: producing 18 assets a week sounds expensive. It isn't — most of the ad-spend efficiency you gain in month three pays for the entire studio. Treat production as an investment in the account, not an operating cost.",
      ]},
    ],
  },
  {
    slug: "ai-automation-guide",
    title: "AI Chatbots That Actually Convert (Not Just Answer)",
    excerpt: "Most support bots deflect tickets. The next generation qualifies leads, books calls, and closes trials — here's the pattern we now ship to every services client.",
    category: "Automation",
    author: "Aisha Menon",
    date: "February 18, 2026",
    readTime: "8 min read",
    hue: 195,
    cover: blogChatbot,
    secondary: svcAutomation,
    midImage: workAutomation,
    faq: [
      { q: "Which model should I use?", a: "GPT-4o or Claude Sonnet for conversation, plus a small embedding model for retrieval over your knowledge base. Route via Lovable AI Gateway so you can swap without rewriting." },
      { q: "How much does a sales bot cost to run?", a: "For most services businesses, under ₹15,000/month in inference costs — dwarfed by the pipeline it generates. The bigger cost is the build, not the running." },
      { q: "Will it hallucinate?", a: "Not if you use retrieval + strict system prompts + a small eval suite. We run 200+ scripted evals nightly for every bot we ship." },
      { q: "Can I integrate with WhatsApp?", a: "Yes. WhatsApp Business API + a lightweight orchestration layer (n8n or a custom Node service) is the setup we now ship by default." },
    ],
    body: [
      { heading: "The mistake most teams make", paragraphs: [
        "The default framing for a chatbot is 'answer FAQs.' That's a support tool, not a growth tool. It saves headcount at best and annoys visitors at worst.",
        "The reframing that unlocks value: treat the bot as your best sales development rep. It qualifies, personalises the pitch, and hands off to a human — or a Calendly — the moment intent is clear.",
        "A support bot deflects. A sales bot advances. Every prompt, every retrieval, every response should push the conversation one step closer to a booked meeting or a completed purchase. If a message doesn't do that, cut it.",
      ]},
      { heading: "The four-turn playbook", paragraphs: [
        "Turn one: ask what problem they're trying to solve, not who they are. Turn two: mirror the problem back with one clarifying question. Turn three: name the two most relevant proof points from your case studies. Turn four: propose the next step — a call, a demo, a trial — with a single visible CTA.",
        "Four turns is the ceiling before drop-off spikes. If you can't get to a next step in four, the flow is wrong.",
        "The magic isn't in the model. It's in the discipline. Most 'chatbot' projects fail because they let the model roam. The best ones constrain it — a tight system prompt, a small retrieval set, a fixed path to a CTA. Boring. Effective.",
      ]},
      { heading: "What we measure", paragraphs: [
        "Qualified conversation rate, meeting-booked rate, and cost per meeting. When these three tie back to CRM, the bot stops being a widget and starts being a revenue channel.",
        "Cost per meeting is the number that changes minds. When leadership sees a bot booking meetings at 30% of the cost of a human SDR — with 24/7 coverage across time zones — the conversation stops being about 'do we need AI' and starts being about how fast to scale it.",
      ]},
    ],
  },
  {
    slug: "social-media-growth",
    title: "The Social Content System That Actually Scales",
    excerpt: "Most brand social feeds die on the vine because they're built around inspiration. Here's the systematic content engine we run for every social client.",
    category: "Social",
    author: "Priya Sundar",
    date: "January 27, 2026",
    readTime: "8 min read",
    hue: 25,
    cover: blogSocial,
    secondary: svcSocial,
    midImage: workSkincare,
    faq: [
      { q: "How many posts per month is enough?", a: "20 is our default for Instagram. Consistency of format matters more than volume; two thoughtful Reels a week beats seven forgettable posts." },
      { q: "Do I need to be on LinkedIn too?", a: "If you sell to businesses, yes. LinkedIn organic reach in 2026 is where Instagram was in 2018 — an unfair advantage for consistent posters." },
      { q: "Should I hire a creator or an agency?", a: "A creator for on-camera talent, an agency for the system. The best setups pair both — the agency handles pillars and calendar, the creator delivers the face and voice." },
      { q: "How long until I see results?", a: "Ninety days of consistent posting is the honest floor. Below that, you're rolling dice with the algorithm — and losing." },
    ],
    body: [
      { heading: "Inspiration doesn't scale. Systems do.", paragraphs: [
        "The single biggest reason brand social feeds go quiet: the team runs out of ideas. They start strong on a burst of enthusiasm, and by month three the calendar is a graveyard of empty slots.",
        "The fix is not more creativity. It's fewer decisions. A content system pre-decides the format, the pillar, and the cadence, so weekly production becomes execution — not invention.",
        "Every social team we've ever hired for from scratch has been more productive in month one — not month six. The reason is inevitably the same: they had a system on day one, and lost it as the calendar filled with campaign chaos. Reinstate the system. Productivity returns.",
      ]},
      { heading: "The five-pillar model", paragraphs: [
        "Pick five content pillars that map to your brand's promise. Educate, entertain, prove, humanise, sell. Assign each pillar to a fixed weekday. Assign each weekday a fixed format — Reel, carousel, static, story, live.",
        "Now your calendar writes itself: Monday is 'Educate as a carousel,' Tuesday is 'Prove as a Reel,' and so on. Twenty slots a month, zero what-do-we-post debates.",
        "The pillars aren't a strait-jacket. They're a scaffold. The creative team still owns the specific idea — but the format, the cadence and the tone are pre-decided. That's what turns a burnout job into a repeatable operation.",
      ]},
      { heading: "The 60-30-10 rule", paragraphs: [
        "Sixty percent of the calendar is systematised. Thirty percent responds to whatever is trending this week. Ten percent is experimental — new format, new voice, new angle. That mix keeps the feed both consistent and alive.",
        "Skip the ten percent and the feed goes stale. Skip the sixty and the feed goes silent. The 30 is where the algorithm rewards you, but only if the 60 has bought you the trust to be seen at all.",
      ]},
    ],
  },
  {
    slug: "content-marketing-guide",
    title: "Marketing Automation Without the Mess",
    excerpt: "Most automation stacks are held together with tape. Here's the two-day audit we run to consolidate tools, delete the cruft, and make the whole thing 3x more reliable.",
    category: "Automation",
    author: "Vikram Iyer",
    date: "December 14, 2025",
    readTime: "9 min read",
    hue: 205,
    cover: blogAutomation,
    secondary: svcContent,
    midImage: workInterior,
    faq: [
      { q: "How many tools is too many?", a: "If your marketing ops team can't draw the stack on one whiteboard from memory, it's too many. Ten is the practical ceiling for a mid-market brand." },
      { q: "Should I use n8n or Zapier?", a: "Zapier for simple, business-user flows. n8n (self-hosted) for anything complex, high-volume or data-sensitive. Most mature stacks use both." },
      { q: "Where should leads live?", a: "One system of record — your CRM. Everything else reads from it or writes to it, but the CRM is the source of truth for a lead. No exceptions." },
      { q: "How often should I audit?", a: "Every six months. Automation debt compounds silently, and by month twelve you'll have five tools nobody remembers signing up for." },
    ],
    body: [
      { heading: "How automation stacks rot", paragraphs: [
        "Every marketing team accumulates tools the same way. A new campaign needs a form, so someone adds Typeform. A new campaign needs a nurture sequence, so someone adds ActiveCampaign. Six months later the stack has 14 tools and nobody knows which one owns the source of truth for a lead.",
        "Automation becomes fragile. Leads fall through the cracks. Attribution stops making sense. The team stops trusting the numbers, and every reporting meeting becomes an audit.",
        "The uncomfortable truth: most 'automation problems' are actually inventory problems. You don't have a bad workflow, you have too many. The audit isn't a technology exercise, it's a decluttering exercise.",
      ]},
      { heading: "The two-day consolidation audit", paragraphs: [
        "Day one: map every tool, every trigger, every destination in a single diagram. You will find duplicated triggers, orphaned webhooks, and at least two tools doing the same job.",
        "Day two: pick one system of record for leads (usually the CRM), one for behaviour (usually the product), and one for orchestration (usually one of the two). Route everything through those three. Delete or downgrade the rest.",
        "Two days is the honest ceiling. Any longer and the audit becomes a project, and the project becomes a distraction. Constrain the scope, ship the diagram, cut the tools. The organisation you build after the cut is what matters.",
      ]},
      { heading: "The compounding win", paragraphs: [
        "The immediate payoff is fewer bugs and lower tool spend. The bigger payoff is reporting you can trust. When leads flow through three systems instead of fourteen, attribution stops being an argument and starts being a report.",
        "The unmeasurable payoff is bigger still: morale. A marketing team that trusts its own numbers ships bolder campaigns. A team that doesn't runs safe. Automation hygiene isn't ops work — it's culture work. It's why we start every retainer with this audit before we touch a single ad.",
      ]},
    ],
  },
];
