# PP Consultancy

Recruitment consultancy website and planned recruitment management system under the brand **PP Consultancy**.

This repository ships **Phase 1: Website** — a frontend-only React application combining two purposes:

1. **Recruitment consultancy** — present the business and route candidates and employers to the right contact channel.
2. **Free career resources** — a resume builder, three practice tools, career guidance articles and free training information.

There is no backend, database, authentication, CRM or email/WhatsApp delivery in this release. Every form is honest about where its data actually goes.

## Pages and routes

| Page | Route |
| --- | --- |
| Home | `/` |
| Resume Builder (live preview + PDF export) | `/resume-builder` |
| Free Practice Tools (typing, English, basic computer) | `/practice-tools` |
| Career Guidance (category filter) | `/career-guidance` |
| Career article | `/career-guidance/:slug` |
| Free Training | `/free-training` |
| About Us (founder card, contact details, FAQ accordion) | `/about` |
| Contact Us | `/contact` |
| Privacy Policy | `/privacy-policy` (alias `/privacy`) |
| Terms & Conditions | `/terms-and-conditions` (alias `/terms`) |
| Not found | anything else |

## Frontend-only rules

- React + JavaScript + Vite + Tailwind CSS (compiled at build time) + React Router + React Icons + Lenis (smooth scrolling). Lenis is the only runtime dependency that was added.
- No server, no API keys, no secrets in the bundle. Anything in `src/data/siteConfig.js` is public to every visitor.
- Career tools, practice tests and the resume builder all run in the browser.

### Where data actually goes

| Feature | Behaviour |
| --- | --- |
| Resume Builder | Saved to `localStorage` on the visitor's own device. Erase with "Clear saved data". |
| Practice tools | Calculated locally, never stored or uploaded. |
| Contact form | Nothing is stored. The visitor chooses how to send it (email app or WhatsApp), and the message goes directly from them. |
| PDF export | Browser print dialog → "Save as PDF". |

## Owner configuration

All owner-editable values live in **`frontend/src/data/siteConfig.js`**:

- `siteUrl` — production origin used for canonical URLs, Open Graph tags and the sitemap.
- `whatsappChannelUrl` — official WhatsApp Channel invite link. Until it is set, the navbar, home page and footer show a clearly disabled placeholder instead of a broken link.
- `whatsappCommunityUrl` — WhatsApp Community invitation link used by the home page "Join Our WhatsApp Community" box. Set it back to `""` and the Join Community button explains that the link is coming soon instead of navigating anywhere.
- `whatsappEnquiryNumber` — digits-only number for `wa.me` enquiry links.
- `contact` — public email, phone and region (placeholders are detected and hidden).

Business facts and founder contact details live in `frontend/src/data/aboutConfig.js` (legal name, address, no-fee policy, plus `founder.name`, `founder.designation`, `founder.tagline`, `founder.image`, `founder.email` and `founder.social` — LinkedIn, direct WhatsApp, Instagram). The About page profile card and its contact section both read from that one object, so a link is edited in a single place; the founder's direct WhatsApp contact is deliberately separate from `siteConfig.whatsappCommunityUrl`. Sample programmes live in `frontend/src/data/trainingPrograms.js`.

Content modules — `careerArticles.js`, `practiceQuestions.js`, `trainingPrograms.js`, `navigation.js` — are plain local data files: edit them to change the site, no CMS required.

## Design system

- **Editorial dark/lime system.** Near-black charcoal `#1E1E20`, surfaces `#26262A`, hairlines `rgba(255,255,255,.18)`, one accent `#DFFF5E`, off-white body text `#F5F5EF`. No second accent colour. Details in `REDESIGN.md` and `frontend/src/styles/tokens.css`.
- **Type:** Anton for uppercase display, Inter for body and UI. Fluid `clamp()` scale, body copy never below 16px, lime reserved for large type and short labels.
- **Tokens:** CSS variables plus a Tailwind v4 `@theme` block in `frontend/src/styles/tokens.css`; the hand-written layout layer is `frontend/src/styles/editorial.css`.
- **Shared primitives:** Button, BracketLink, LimeCard, Marquee, Counter, StatCard, SectionLabel, Accordion, Drawer, Asterisk, cursor follower, PeopleRow, plus the QuizTool, TypingSpeedTest and ResumePreview feature components.
- **One layout archetype per page:** wordmark hero (Home), cohort/countdown (Free Training), search + bento hub (Practice Tools), split editor (Resume Builder), quiz + roadmap (Career Guidance). The section-order matrix and uniqueness checklist are in `REDESIGN.md`.
- **Motion:** Lenis smooth scrolling, one-shot scroll reveals, marquees and number counters, all disabled or simplified under `prefers-reduced-motion`.
- **Accessibility:** 44px minimum targets, visible lime focus ring, AA body contrast, grayscale imagery with `alt` text where it carries meaning.

## SEO

- Per-page title, description, canonical URL and Open Graph tags via `PageMeta` (legacy `/privacy` and `/terms` declare the new canonical paths).
- `public/robots.txt` allows crawling; the `noindex` tag from the prototype was removed.
- `npm run build` runs `scripts/seo.mjs`, which writes `dist/sitemap.xml` (all routes plus every article) and appends the `Sitemap:` line to `dist/robots.txt` — but only once `siteUrl` is set. Without it the script warns and removes stale output instead of publishing invented URLs.
- Client-rendered SPA: if search engines under-index it, consider a prerendered deployment later. No ranking guarantees are made or implied.

## Run the website

```bash
cd frontend
npm install
npm run dev
```

```bash
npm run lint
npm run build
```

### Useful test paths

- Deep-linked tool: `/practice-tools?tool=english`
- Filtered guidance: `/career-guidance?category=Interview+Preparation`
- Missing article: `/career-guidance/does-not-exist`

## Not implemented (later phases)

Backend, database, authentication, CRM, HR dashboard, telephony, call recording, WhatsApp/email delivery, real application storage.

Sample training outlines are labelled as such. Prototype submissions are **not** delivered to HR, and practice results are never presented as a certification.

## Remaining roadmap

- **Phase 2 — Application database:** connect forms to a database or CRM, create application IDs, link Job IDs, test duplicate detection.
- **Phase 3 — HR dashboard:** accounts, assignment, permissions, statuses, reporting.
- **Phase 4 — Calling and recording:** compare Indian cloud telephony providers first; prove logs attach to the correct candidate before buying.
- **Phase 5 — Email and WhatsApp:** templates and tracking only after an integration is configured.
- **Phase 6 — Security and audit:** masking, logs, backups, employee deactivation.
- **Phase 7 — Launch:** end-to-end testing from job publication to final selection.

Do not treat any of those as operational until they are built and tested.

## Budget note

Starting budget is ₹0. Phase 1 runs on the local Vite toolchain. Hosting, domains, CRM seats and telephony require a separate cost comparison and owner approval.

[To confirm before launch: legal entity name, address, official email/phone, WhatsApp Channel URL, enquiry number, `siteUrl`, privacy retention period, verified job content, and confirmation of every sample-flagged training programme.]
