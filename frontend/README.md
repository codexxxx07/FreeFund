# Jobs Mania - Freefund (Phase 1 frontend)

React website for a recruitment consultancy: free career resources, training information and company pages.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run lint
npm run build
```

## What is included

- Home (including the WhatsApp Community section), resume builder, practice tools, career guidance, free training, about, contact, privacy and terms pages
- Frontend-only form validation
- Owner-editable configuration in `src/data/siteConfig.js` (WhatsApp Channel link, WhatsApp Community invitation link, enquiry number, contact details, site URL)
- Editorial dark/lime visual system in `src/styles/tokens.css` and `src/styles/editorial.css`: charcoal surfaces, Anton display type, a single lime accent, and one distinct layout archetype per page (see `../REDESIGN.md`)

Everything runs in the browser. Forms do not email, store, or deliver anything to HR.
