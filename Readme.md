# Jobs Mania - Freefund

Recruitment website and planned recruitment management system under the brand **Jobs Mania - Freefund**.

The long-term goal is a platform where candidates explore jobs, apply through the website, and enter a recruitment CRM. That CRM, HR accounts, telephony, WhatsApp, and audit tooling are **not** part of the current release.

This repository currently ships **Phase 1: Website Prototype** — a frontend-only React application.

## Phase 1 status

Implemented in `/frontend`:

- Responsive Home, Current Jobs, Job Details, Apply, About, Contact, Privacy Policy, Terms, and Not Found pages
- Reusable header, footer, and mobile navigation
- Central sample job dataset with unique Job IDs
- Search, location, category, work mode, and experience filters
- Closed/paused jobs hidden from the current vacancies list
- Closed jobs show status and disable Apply
- Job-specific application form with frontend validation
- Contact form with frontend validation
- CSS variable colour system and Skewmorphic + minimalist styling

**Not implemented (later phases):** backend, database, authentication, CRM, HR dashboard, telephony, call recording, WhatsApp, email delivery, real application storage.

Sample listings are labelled as demo content. Prototype form submissions stay in the browser session only and are **not** sent to HR.

### Run the website

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

- Open jobs: `/jobs`
- Category filter: `/jobs?category=BPO`
- Closed job (applications disabled): `/jobs/NOI-010`
- Missing job: `/jobs/DOES-NOT-EXIST`
- Apply flow: `/apply/WFH-001`

## Design direction (Phase 1)

Phase 1 follows a light, recruitment-focused palette rather than a black-and-gold theme:

- Backgrounds: `#FFFFFF`, `#F5F6F8`
- Text: `#171717`, `#626262`
- Accents: teal `#1D7874`, yellow `#F4D35E`, orange `#EE964B`
- Visual language: restrained Skewmorphism (layered cards, elevated buttons, skewed decorative shapes) with NuralPath-inspired whitespace and typography

Colours live in `frontend/src/styles/index.css` as CSS variables so they can be adjusted later.

## Project structure

```text
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── jobs/
│   │   └── common/
│   ├── data/
│   │   └── jobs.js
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

Technology: React, JavaScript, Vite, Tailwind CSS (compiled at build time, not CDN), React Router, React Icons.

To replace sample jobs later, edit `frontend/src/data/jobs.js` or swap `frontend/src/utils/jobsApi.js` for an HTTP client. Do not publish fictional vacancies as genuine openings.

## Remaining roadmap

### Phase 2 — Application database

Connect forms to a database or CRM, create application IDs, link Job IDs, and test duplicate detection.

### Phase 3 — HR dashboard

Individual user accounts, assignment, restricted permissions, recruitment statuses, and reporting.

### Phase 4 — Calling and recording

Compare Indian cloud telephony providers. Do not purchase services before proving logs can attach to the correct candidate.

### Phase 5 — Email and WhatsApp

Templates and tracking only after an integration is configured.

### Phase 6 — Security and audit

Masking, logs, backups, and employee deactivation.

### Phase 7 — Launch

End-to-end testing from job publication to final selection.

## Original product requirements (unchanged intent)

The business still needs, in later phases:

- Authorised vacancies only, with unique Job IDs
- Applications linked to the correct job
- CRM stages from new application through interview outcomes
- Role-based HR access and candidate-data protection
- Business calling, recordings, email/WhatsApp history, and performance reports
- Free-first tooling, with paid services approved before purchase

Do not treat any of those systems as operational until they are built and tested.

## Budget note

Starting budget is ₹0. Phase 1 runs on the local Vite toolchain. Hosting, domains, CRM seats, and telephony require a separate cost comparison and owner approval.

[To confirm before launch: legal entity name, address, official email/phone, privacy retention period, and verified job content.]
