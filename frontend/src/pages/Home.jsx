import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiBriefcase,
  HiCheckCircle,
  HiClipboardDocumentCheck,
  HiCommandLine,
  HiDocumentText,
  HiAcademicCap,
  HiMagnifyingGlass,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import SelectDropdown from "../components/common/SelectDropdown";
import Ticker from "../components/common/Ticker";
import WhatsAppCta from "../components/common/WhatsAppCta";
import DemoNotice from "../components/common/DemoNotice";
import JobCard from "../components/jobs/JobCard";
import JobSearchBar from "../components/jobs/JobSearchBar";
import TypewriterText from "../components/common/TypewriterText";
import {
  BRAND_NAME,
  CATEGORIES,
  CONTACT_PLACEHOLDERS,
  EXPERIENCE_FILTERS,
  IS_DEMO,
  LOCATIONS,
  WORK_MODES,
  isPlaceholder,
} from "../data/constants";
import { getOpenJobs } from "../utils/jobsApi";
import { matchesFilters } from "../utils/filters";

const EMPTY_FILTERS = { q: "", location: "", category: "", workMode: "", experience: "" };

const resources = [
  {
    to: "/resume-builder",
    title: "Resume Builder",
    body: "Fill in a guided form and export a clean, ATS-friendly resume as a PDF — stored only in your browser.",
    icon: HiDocumentText,
  },
  {
    to: "/practice-tools",
    title: "Free Practice Tools",
    body: "Typing speed, English and basic computer tests that run entirely in your browser with instant results.",
    icon: HiClipboardDocumentCheck,
  },
  {
    to: "/career-guidance",
    title: "Career Guidance",
    body: "Short, practical articles on resume writing, job search, interviews and workplace readiness.",
    icon: HiAcademicCap,
  },
  {
    to: "/free-training",
    title: "Free Training",
    body: "Job-readiness programmes run by our team — eligibility, skills covered and how to register.",
    icon: HiCommandLine,
  },
];

const whatWeDo = [
  {
    icon: HiBriefcase,
    title: "Authorised openings, clearly listed",
    body: "Every listing carries a Job ID, a location, a work mode and an application deadline, so you always know exactly what you are applying to.",
  },
  {
    icon: HiCheckCircle,
    title: "Applications tied to the right job",
    body: "Your application carries the Job ID and job title with it, so a submission for one role is never mixed up with another.",
  },
  {
    icon: HiShieldCheck,
    title: "Honest status on every role",
    body: "Roles are marked open, paused or closed. When a role closes, applications stop — no dead forms, no false hope.",
  },
  {
    icon: HiUserGroup,
    title: "Candidate support",
    body: "Questions about a listing, a process or a suspicious offer can be raised through the contact page and will be reviewed.",
  },
];

const commitments = [
  "Only authorised, genuine vacancies are published — sample data is labelled as such.",
  "Closed roles are marked immediately and stop accepting applications.",
  "Your personal details are never displayed publicly on this website.",
  "Career tools and practice tests run in your browser and are not submitted anywhere.",
];

export default function Home() {
  const openJobs = getOpenJobs();
  const openCount = openJobs.length;

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const results = useMemo(
    () => openJobs.filter((job) => matchesFilters(job, filters)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters],
  );
  const shown = results.slice(0, 6);

  const hasFilters = Object.values(filters).some(Boolean);

  const showEmail = !isPlaceholder(CONTACT_PLACEHOLDERS.email);
  const showPhone = !isPlaceholder(CONTACT_PLACEHOLDERS.phone);
  const showRegion = !isPlaceholder(CONTACT_PLACEHOLDERS.region);

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div>
      <PageMeta
        title="Home"
        description={`${BRAND_NAME} is a recruitment consultancy helping candidates find authorised job openings, build a resume and use free career resources.`}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line bg-secondary">
        <div className="page-shell relative grid items-center gap-12 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
          <div>
            <p className="eyebrow">Recruitment consultancy</p>
            <h1 className="hero-title mt-5 max-w-3xl text-balance">
              Find the <span className="text-accent-word">right role</span>. Apply with{" "}
              <span className="relative">
                <TypewriterText words={["Clarity", "Confidence", "Purpose", "Success"]} />
                <noscript>Clarity</noscript>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-[1.7] text-muted">
              {BRAND_NAME} connects candidates with authorised openings across India, and backs that up with a resume
              builder, practice tools and free career guidance — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn-primary btn-lg">
                Find Jobs
                <HiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/resume-builder" className="btn-secondary btn-lg">
                Build Your Resume
              </Link>
              <WhatsAppCta className="btn-secondary btn-lg">
                Join our WhatsApp Channel
              </WhatsAppCta>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <HiCheckCircle className="text-primary" aria-hidden="true" />
                {openCount} open {IS_DEMO ? "sample " : ""}roles
              </li>
              <li className="flex items-center gap-2">
                <HiCheckCircle className="text-primary" aria-hidden="true" />
                {CATEGORIES.length} job categories
              </li>
              <li className="flex items-center gap-2">
                <HiCheckCircle className="text-primary" aria-hidden="true" />
                {WORK_MODES.length} work modes
              </li>
            </ul>
          </div>

          <div className="hero-stage">
            <span className="hero-layer hero-layer-back" aria-hidden="true" />
            <span className="hero-layer hero-layer-mid" aria-hidden="true" />
            <div className="hero-panel">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="icon-tile icon-tile-solid">
                    <HiMagnifyingGlass aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold">Search jobs</p>
                    <p className="text-xs text-muted">Title, location, category, or Job ID</p>
                  </div>
                </div>
                {IS_DEMO ? <span className="badge badge-primary badge-dot">Sample data</span> : null}
              </div>

              <div className="mt-5">
                <JobSearchBar />
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Browse by work mode
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {WORK_MODES.map((mode) => (
                    <Link key={mode} to={`/jobs?workMode=${encodeURIComponent(mode)}`} className="quick-link">
                      {mode}
                      <HiArrowRight aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {openJobs.length ? <Ticker jobs={openJobs} /> : null}

      {/* ── Job discovery with live filters ──────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Opportunities"
            title={IS_DEMO ? "Sample open vacancies" : "Open vacancies"}
            description="Filter by keyword, location, category, work mode and experience. Results update as you type."
            action={
              <Link to="/jobs" className="btn-secondary">
                View all jobs
                <HiArrowRight aria-hidden="true" />
              </Link>
            }
          />

          <div className="surface-panel mt-7 p-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
              <label className="block">
                <span className="field-label">Search</span>
                <input
                  className="field-input"
                  type="search"
                  placeholder="Title, ID, or keyword"
                  value={filters.q}
                  onChange={(event) => updateFilter("q", event.target.value)}
                />
              </label>
              <SelectDropdown
                label="Location"
                value={filters.location}
                onChange={(value) => updateFilter("location", value)}
                options={LOCATIONS}
                placeholder="All locations"
              />
              <SelectDropdown
                label="Category"
                value={filters.category}
                onChange={(value) => updateFilter("category", value)}
                options={CATEGORIES}
                placeholder="All categories"
              />
              <SelectDropdown
                label="Work mode"
                value={filters.workMode}
                onChange={(value) => updateFilter("workMode", value)}
                options={WORK_MODES}
                placeholder="All work modes"
              />
              <SelectDropdown
                label="Experience"
                value={filters.experience}
                onChange={(value) => updateFilter("experience", value)}
                options={EXPERIENCE_FILTERS}
                placeholder="All experience"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <p className="text-sm text-muted" aria-live="polite">
                Showing <span className="font-semibold text-fg">{results.length}</span> of {openCount} open{" "}
                {IS_DEMO ? "sample " : ""}
                {openCount === 1 ? "role" : "roles"}
              </p>
              <button
                type="button"
                className="btn-ghost min-h-0 px-2 py-1"
                onClick={() => setFilters(EMPTY_FILTERS)}
                disabled={!hasFilters}
              >
                Clear filters
              </button>
            </div>
          </div>

          {IS_DEMO ? (
            <div className="mt-5">
              <DemoNotice />
            </div>
          ) : null}

          {shown.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {shown.map((job) => (
                <JobCard key={job.id} job={job} compact />
              ))}
            </div>
          ) : (
            <div className="surface-panel mt-6 px-6 py-12 text-center">
              <span className="icon-tile icon-tile-lg mx-auto">
                <HiMagnifyingGlass aria-hidden="true" size={22} />
              </span>
              <h3 className="mt-5 text-xl">No roles match these filters</h3>
              <p className="mx-auto mt-2 max-w-md text-muted">
                Try a different location or category, or clear the filters to see every open role.
              </p>
              <button type="button" className="btn-primary mt-6" onClick={() => setFilters(EMPTY_FILTERS)}>
                Clear filters
              </button>
            </div>
          )}

          {results.length > shown.length ? (
            <div className="mt-7 flex justify-center">
              <Link to="/jobs" className="btn-secondary">
                View all {results.length} matching roles
                <HiArrowRight aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Career resources preview ─────────────────────────────────── */}
      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Career resources"
            title="Everything around the job search"
            description="Free tools that support the consultancy work — so you arrive at an application better prepared."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.to}
                  to={resource.to}
                  className="surface-card surface-card-hover group flex h-full flex-col p-6"
                >
                  <span className="icon-tile icon-tile-lg">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{resource.body}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                    Open
                    <HiArrowRight
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Consultancy introduction ─────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="About us"
            title="What Jobs Mania – Freefund does"
            description="A recruitment consultancy first: we list authorised vacancies, keep applications tied to the correct job, and give candidates the support they need to prepare properly."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {whatWeDo.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="surface-card surface-card-hover p-6">
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-7">
            <Link to="/about" className="btn-secondary">
              More about us
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust and support ────────────────────────────────────────── */}
      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Trust and support"
            title="What you can count on"
            description="These are things the site does today, not promises about the future."
          />

          <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <ul className="surface-card grid gap-4 p-6 sm:p-8">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted">{item}</p>
                </li>
              ))}
            </ul>

            <div className="surface-card flex flex-col p-6 sm:p-8">
              <p className="eyebrow">Support</p>
              <h3 className="mt-3 text-2xl">Talk to a person</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Questions about a listing, an offer or a process step can be raised on the contact page.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Contact us
                  <HiArrowRight aria-hidden="true" />
                </Link>
                <WhatsAppCta className="btn-secondary">WhatsApp Channel</WhatsAppCta>
              </div>

              {showEmail || showPhone || showRegion ? (
                <ul className="mt-6 grid gap-2 border-t border-line pt-5 text-sm text-muted">
                  {showEmail ? <li className="break-words">{CONTACT_PLACEHOLDERS.email}</li> : null}
                  {showPhone ? <li>{CONTACT_PLACEHOLDERS.phone}</li> : null}
                  {showRegion ? <li>{CONTACT_PLACEHOLDERS.region}</li> : null}
                </ul>
              ) : (
                <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
                  Verified contact details will appear here once confirmed by the owner.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <div className="cta-panel p-8 sm:p-10 lg:p-12">
            <span className="cta-shape cta-shape-lg" aria-hidden="true" />
            <span className="cta-shape cta-shape-sm" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1.25fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="eyebrow">Ready to start</p>
                <h2 className="mt-3 text-balance text-3xl sm:text-4xl">Looking for your next opportunity?</h2>
                <p className="mt-3 text-lg">
                  Browse the open roles, prepare a resume that reads well, and reach out when you are ready to talk.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/jobs" className="btn-inverse btn-lg">
                    Find Jobs
                    <HiArrowRight aria-hidden="true" />
                  </Link>
                  <Link to="/resume-builder" className="btn-outline-inverse btn-lg">
                    Build Your Resume
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <span className="grid h-24 w-24 place-items-center rounded-3xl border border-white/20 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_18px_36px_-18px_rgba(17,17,17,0.45)]">
                  <HiBriefcase size={30} aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
