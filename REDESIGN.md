# PP Consultancy — editorial redesign notes

## Stack note

The existing site is **React 19 + Vite 7 + Tailwind CSS v4 + React Router**. That stack is kept.
There is no Next.js in this repository, so the redesign ships as the same client-rendered Vite app
rather than a rewrite. All pages are production-built by `npm run build` in `frontend/`.

Read this alongside:

- Design tokens and the Tailwind v4 theme: `frontend/src/styles/tokens.css`
- Shared editorial primitives: `frontend/src/components/editorial/`
- The layout layer and page archetypes: `frontend/src/styles/editorial.css`

---

## 1. Competitor analysis

Studied on 31 October 2026.

### orricaedge.com

**What works**

1. The hero splits intent immediately: **Explore Jobs** for candidates, **Hire Talent** for employers, with a plain-language "candidates apply free" line underneath.
2. A prominent candidate-fee disclaimer sits above the fold, not buried in a policy page. That is the single strongest trust move on the site.
3. Job cards show salary, work mode and location **above** the role title, so a scan answers the three questions candidates ask first.
4. A numbered "How it works" sequence (Find Jobs → Hire Talent → Join as Recruiter) explains a three-sided business without jargon.
5. Career resources and FAQs are on the home page, giving a cold visitor something to do besides browsing jobs.

**Where it feels generic or cluttered**

1. The visual identity is a stock corporate template: royal blue, a smiling stock-photo duo, floating UI chips and a translucent card over the hero. Nothing about it says *this* consultancy.
2. Four separate carousels (jobs, how it works, services, six "core strengths") plus dot pagination. Important proof points are hidden behind arrows, and the page never settles into a reading rhythm.
3. The hero stock composition carries no information; it takes the largest area on the page and could belong to any staffing firm.
4. The mobile view stacks a full-height hero, a large help card, a disclaimer strip and a floating chat button before the first real job appears.
5. Trust claims ("verified opportunities", "transparent communication") are stated as six equal cards, so none of them lands harder than the others; there is no number, name or artefact behind them.

### rozgarai.com

**What works**

1. It is relentlessly current: last-apply dates, exam-city notices and result links are surfaced as first-class content. Utility beats polish for its audience.
2. WhatsApp and Telegram join buttons are repeated in the header where the audience already lives; channel acquisition is designed in, not bolted on.
3. Coverage is broad and clearly labelled — government jobs, admit cards, results, scholarships, private and remote roles.
4. Listing headlines carry the year, post count and qualification, which is exactly how this audience searches.
5. The volume and freshness give it a strong SEO surface that a thin brochure site cannot match.

**Where it feels generic or cluttered**

1. The first viewport is a wall of near-identical text links: WhatsApp bars, category chips, job headlines, "Read More" repeated five times. There is no single focal point.
2. Every element competes at the same weight; section boundaries are weak, so the eye has nowhere to rest.
3. The brand is an SEO aggregator rather than a product: no consistent type system, no colour logic, no distinctive mark.
4. No verification or "who is behind this listing" signal is visible next to the listings themselves, which matters most on a site carrying government-job claims.
5. It offers no preparation layer — no resume help, practice or guidance — so the visitor leaves the moment they have copied a deadline.

### The gap this redesign takes

- **One accent, one voice.** Near-black and electric lime, with type doing the branding instead of stock photography.
- **A tool, not a catalogue.** Each page has one job and one primary interaction, so the four free resources stop feeling like the same template.
- **Trust as structure.** Fee-free and sample-data labels are part of the layout, not a footer afterthought.
- **Preparation as the differentiator.** Neither competitor helps a candidate get *ready*; this site does, and each resource is a working instrument rather than a landing page.

---

## 2. Design tokens

All values live in `frontend/src/styles/tokens.css`. Tailwind v4 is configured with an `@theme`
block in the same file (no `tailwind.config.js` exists in this stack).

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#1E1E20` | Page background, ink on lime |
| `--surface` | `#26262A` | Cards, panels, drawers |
| `--surface-2` | `#2C2C31` | Raised rows, tabs |
| `--surface-3` | `#333338` | Hover surfaces |
| `--paper` | `#F5F5EF` | Body and display text on dark |
| `--muted` | `#B4B4B8` | Secondary copy (AA on `#1E1E20`) |
| `--lime` | `#DFFF5E` | The only accent: display words, CTAs, focus, active states |
| `--line` | `rgba(255,255,255,.18)` | 1px borders |
| `--danger` | `#FF8A7A` | Errors only, never decorative |

Rules: lime is a surface or large-type colour, never small body text on lime. White/paper is the
default body colour. No second accent hue exists in the redesign layer.

### Type

| Role | Family | Behaviour |
| --- | --- | --- |
| Display | **Anton**, fallback Archivo Narrow / Arial Narrow | Uppercase, `line-height: .8–.86`, tight tracking. Hero sizes are fluid (`clamp`). |
| Body / UI | **Inter** | 16px minimum for body copy; labels are 10–12px uppercase with wide tracking. |
| Data / counters | Inter with tabular numerals | Countdown and scores use `font-variant-numeric: tabular-nums`. |

Type scale: `clamp(3.4rem, 9.4vw, 9.5rem)` for page heroes, `clamp(2.4rem, 5.6vw, 5.4rem)` for
section headings, body `1rem–1.15rem` at 1.6–1.7 line-height.

### Spacing, layout and shape

- 8px rhythm, exposed as `--space-1` … `--space-12` (8px, 16px, 24px, 32px, 40px, 48px, 64px, 80px, 96px).
- Page gutter: `clamp(1rem, 3vw, 3rem)`; content max width 1560px.
- Radii: 2px maximum. No pill buttons, no floating rounded cards.
- Borders are always 1px `--line`; elevation is expressed with contrast and rules, never shadows.
- Sticky header height: 72px; the resume toolbar sticks below it.

### Motion

- Marquee loops (30–38s), pause on hover, static scroll strip under `prefers-reduced-motion`.
- Scroll reveals run once per element via one Intersection Observer (`[data-reveal]`).
- Counters animate once on entry and jump to the final value when reduced motion is set.
- Hover inversions are colour-only; no scale or lift.
- The cursor-follow asterisk is desktop-only, disabled for touch and reduced motion.

### Accessibility constraints encoded in the tokens

- Focus ring: 2px lime, 3px offset, square.
- All interactive controls have a 44px minimum hit area (`.ed-btn` 46px, stepper tabs 44px, chips 40px with padding, stage close 44px).
- Body copy is `--paper` or `--muted`, not lime. Lime text is limited to display sizes and short labels.
- Motion, marquee and cursor effects all honour `prefers-reduced-motion`.

---

## 3. Reusable components

| Component | File | Purpose |
| --- | --- | --- |
| Button | `editorial/Button.jsx` | Router link, anchor or button; lime / outline / ink variants; block and large sizes |
| BracketLink | `editorial/BracketLink.jsx` | `[ LABEL ]` editorial text link with optional arrow |
| LimeCard | `editorial/LimeCard.jsx` | Thin outline card with a lime title bar; link or article |
| Marquee | `editorial/Marquee.jsx` | Seamless duplicated track, hover pause, reduced-motion fallback |
| Counter | `editorial/Counter.jsx` | One-shot eased number animation on viewport entry |
| StatCard | `editorial/StatCard.jsx` | Figure + label + qualifier for the statistics strip |
| SectionLabel | `editorial/SectionLabel.jsx` | Asterisk label, hairline rule, optional right-hand slot |
| Asterisk | `editorial/Asterisk.jsx` | Brand mark, drawn in `currentColor` |
| CursorAsterisk | `editorial/CursorAsterisk.jsx` | Desktop cursor follower; rAF positioning, no re-renders |
| Accordion | `editorial/Accordion.jsx` | One-open module list, keyboard buttons, `aria-expanded` |
| Drawer | `editorial/Drawer.jsx` | Right-side enrolment panel with focus + Escape handling |
| PeopleRow | `editorial/PeopleRow.jsx` | Cut-out silhouette row above the footer bar |

Feature components: `tools/QuizTool.jsx`, `tools/TypingSpeedTest.jsx`, `resume/ResumeForm.jsx`,
`resume/ResumePreview.jsx` (four templates), plus the page-level hero modules.

---

## 4. Page archetypes

| Page | Hero module | Primary interaction | Section order (top to bottom) |
| --- | --- | --- | --- |
| **Home** `/` | Full-bleed two-line wordmark over grayscale image; corner micro-labels | Browse the four lime-title service cards | Wordmark hero → stats strip → 4 service cards → lime marquee → hiring partners → testimonials → lime CTA |
| **Free Training** `/free-training` | Split hero: 3-line editorial title + countdown / seat meter panel | `ENROLL FREE` opens the enrolment drawer | Split cohort hero → marquee → vertical week timeline → syllabus accordion → mentor cards → outcomes + "what you get" + "what this is not" → split FAQ → drawer |
| **Practice Tools** `/practice-tools` | Hub hero: big title, search field, category chips | Start any drill instantly in a full-screen stage | Hub hero (search + chips) → bento tool grid with inline quickfire → progress sidebar (streak, week, attempts) → full-screen tool stage |
| **Resume Builder** `/resume-builder` | No marketing hero; sticky app toolbar + top stepper | Type in the left form, watch the right A4 sheet update | Sticky toolbar → stepper + progress → split editor (step form + live A4) → 4-template switcher → ATS meter and tips |
| **Career Guidance** `/career-guidance` | Split hero: editorial title + one-question-at-a-time quiz card | Answer 5 questions to reveal the roadmap | Split quiz hero → result card → horizontal 4-phase roadmap → roles/skills → booking slot picker → story carousel → reading room |

H1s, titles and descriptions are unique per page and set through `PageMeta`:

| Page | H1 | Meta title |
| --- | --- | --- |
| Home | PP CONSULTANCY (wordmark) | Recruitment Consultancy & Free Career Tools |
| Free Training | Two weeks to a better application. | Free Training Cohorts |
| Practice Tools | The practice floor. | Free Practice Tools — Aptitude, Typing, English |
| Resume Builder | Resume builder | Free A4 Resume Builder with ATS Score |
| Career Guidance | What should you do next? | Career Fit Quiz, Roadmap & 1:1 Guidance |

---

## 5. Layout-uniqueness checklist

Each row is a property that must differ. ✅ means the page has its own treatment; no two rows share
a value in any column.

| Check | Home | Free Training | Practice Tools | Resume Builder | Career Guidance |
| --- | --- | --- | --- | --- | --- |
| Hero archetype | Full-bleed wordmark | Split title + countdown panel | Centred hub + search | App chrome, no hero | Quiz embedded in hero |
| Hero contains an input? | No | No | Search field | Stepper | Radio-style options |
| Primary interaction | Navigate a card | Open drawer + submit request | Launch full-screen tool | Edit text + export | Answer 5 questions |
| Content container | Full-bleed bands | Single 2-col column + vertical rail | Bento grid + sidebar | Split editor | Stacked cards + timeline |
| Repeating unit | Lime-title card | Timeline week + accordion row | Tool tile | Form step | Quiz option / roadmap phase |
| Proof module | Counters, partner wall, quotes | Seats, mentors, outcomes | Streak + attempt log | ATS score + tips | Salary band, demand badge, stories |
| Page ends with | Lime CTA band | FAQ + drawer | Tool stage (no CTA band) | ATS meter | Reading list |
| Section count | 7 | 8 | 4 | 3 | 7 |
| Distinct section order? | Yes | Yes | Yes | Yes | Yes |

Additional checks performed:

- No heading string appears on more than one page (hero, section and CTA headings are all page-specific copy).
- Free Training has no tool cards; Practice Tools has no schedule, syllabus or mentors; Resume Builder has no marketing sections; Career Guidance has no tool grid.
- The only shared patterns are the sticky header, footer and the component primitives — not section order.
- Desktop (1440px) and mobile (390px) checked for horizontal overflow; the quiz result card had a nowrap badge that widened the grid and was fixed.
- All interactive controls meet the 44px target; focus states are visible; marquees and counters respect reduced motion.

---

## 6. Honest-content rules kept from the original build

- Placement numbers, partner names, mentors, schedules, testimonials and success stories are **labelled samples**. They are not presented as verified outcomes.
- The ATS score is described in the UI as a local heuristic, not a real applicant tracking system.
- Training enrolment and counselling requests do not submit anywhere: they prepare a prefilled contact message the visitor sends themselves.
- Resume drafts and practice attempts stay in `localStorage` on the visitor's device.
- No candidate fees, no job guarantees, no invented listings.
