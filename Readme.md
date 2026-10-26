# Jobs Mania - Freefund

Recruitment consultancy website and planned recruitment management system under the brand **Jobs Mania - Freefund**.

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
| About Us (FAQ accordion) | `/about` |
| Contact Us | `/contact` |
| Privacy Policy | `/privacy-policy` (alias `/privacy`) |
| Terms & Conditions | `/terms-and-conditions` (alias `/terms`) |
| Not found | anything else |

## Frontend-only rules

- React + JavaScript + Vite + Tailwind CSS (compiled at build time) + React Router + React Icons. No new runtime dependencies were added.
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
- `whatsappCommunityUrl` — WhatsApp Community invitation link used by the home page "Join Our WhatsApp Community" box. Until it is set, the Join Community button explains that the link is coming soon instead of navigating anywhere.
- `whatsappEnquiryNumber` — digits-only number for `wa.me` enquiry links.
- `contact` — public email, phone and region (placeholders are detected and hidden).

Business facts for the About page live in `frontend/src/data/aboutConfig.js` (legal name, address, no-fee policy, LinkedIn URL). Sample programmes live in `frontend/src/data/trainingPrograms.js`.

Content modules — `careerArticles.js`, `practiceQuestions.js`, `trainingPrograms.js`, `navigation.js` — are plain local data files: edit them to change the site, no CMS required.

## Design system

- Tokens in `frontend/src/styles/index.css` as CSS variables + Tailwind theme values.
- Black-and-white palette: `#111111` primary/buttons, `#ffffff` background, `#f7f7f5` / `#f2f2f0` surfaces, `#666666` muted text, `#e5e5e5` borders, `#b42318` destructive. No brand blue or unrelated accent colours.
- Light and Night Mode both supported (`data-theme`), with `prefers-reduced-motion` respected.
- Shared components: Navbar with a Career Resources dropdown, mobile menu, Footer, buttons, section headings, accessible listbox dropdown, FAQ accordion, article card, empty states, WhatsApp CTA, WhatsApp Community section.

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
