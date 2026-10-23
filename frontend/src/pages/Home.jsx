import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiBriefcase,
  HiChatBubbleLeftRight,
  HiCheckCircle,
  HiEnvelope,
  HiMagnifyingGlass,
  HiMapPin,
  HiPhone,
  HiRectangleStack,
  HiSparkles,
  HiUserGroup,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import JobCard from "../components/jobs/JobCard";
import JobSearchBar from "../components/jobs/JobSearchBar";
import {
  BRAND_NAME,
  CATEGORIES,
  CONTACT_PLACEHOLDERS,
  IS_DEMO,
  WORK_MODES,
  isPlaceholder,
} from "../data/constants";
import { getFeaturedJobs, getJobsByWorkMode, getOpenJobs } from "../utils/jobsApi";
import TypewriterText from "../components/common/TypewriterText";

const categoryIcons = {
  "Customer Support": HiChatBubbleLeftRight,
  BPO: HiPhone,
  Sales: HiSparkles,
  "Back Office": HiRectangleStack,
  Recruitment: HiUserGroup,
  "Other Opportunities": HiBriefcase,
};

const steps = [
  {
    title: "Explore jobs",
    body: "Browse listings filtered by location, category, and work mode with clear job details.",
  },
  {
    title: "Review details and apply",
    body: "Open the job page to review responsibilities and apply using the job-specific form.",
  },
  {
    title: "Stay informed",
    body: "Job status is clearly marked. Closed or paused roles are shown accordingly.",
  },
];

export default function Home() {
  const featured = getFeaturedJobs();
  const openJobs = getOpenJobs();
  const openCount = openJobs.length;
  const [activeTab, setActiveTab] = useState(WORK_MODES[0]);
  const tabRefs = useRef([]);
  const tabJobs = getJobsByWorkMode(activeTab).slice(0, 3);

  const showEmail = !isPlaceholder(CONTACT_PLACEHOLDERS.email);
  const showPhone = !isPlaceholder(CONTACT_PLACEHOLDERS.phone);
  const showRegion = !isPlaceholder(CONTACT_PLACEHOLDERS.region);
  const showContactSection = showEmail || showPhone || showRegion;

  function onTabKeyDown(event, index) {
    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % WORK_MODES.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + WORK_MODES.length) % WORK_MODES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = WORK_MODES.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveTab(WORK_MODES[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div>
      <PageMeta
        title="Home"
        description={`${BRAND_NAME} helps candidates browse work-from-home, office, and hybrid job listings.`}
      />

      <section className="relative overflow-hidden border-b border-line bg-secondary">
        <div className="page-shell relative grid items-center gap-12 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
          <div>
            <p className="eyebrow">Recruitment portal</p>
            <h1 className="hero-title mt-5 max-w-3xl text-balance">
              Find the <span className="text-accent-word">right role</span>. Apply with{" "}
              <span className="relative">
                <TypewriterText words={["Clarity", "Confidence", "Purpose", "Success"]} />
                <noscript>Clarity</noscript>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-[1.7] text-muted">
              {BRAND_NAME} helps candidates browse work-from-home, office, and hybrid opportunities with clean job
              cards, precise filters, and a job-specific application flow.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn-primary btn-lg">
                Browse jobs
                <HiArrowRight aria-hidden="true" />
              </Link>
              <a href="#how-it-works" className="btn-secondary btn-lg">
                How it works
              </a>
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

      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Featured"
            title={IS_DEMO ? "Selected sample openings" : "Selected openings"}
            description="A tight selection of open roles. Review the full details before applying."
            action={
              <Link to="/jobs" className="btn-secondary">
                View all jobs
                <HiArrowRight aria-hidden="true" />
              </Link>
            }
          />
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((job) => (
              <JobCard key={job.id} job={job} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Opportunities"
            title="Browse by work mode"
            description="Pick the arrangement that fits you and explore matching roles."
            action={
              <Link
                to={`/jobs?workMode=${encodeURIComponent(activeTab)}`}
                className="btn-secondary"
              >
                View all {activeTab.toLowerCase()}
                <HiArrowRight aria-hidden="true" />
              </Link>
            }
          />

          <div
            role="tablist"
            aria-label="Work mode"
            className="mt-6 flex flex-wrap gap-2"
          >
            {WORK_MODES.map((mode, index) => {
              const selected = mode === activeTab;
              return (
                <button
                  key={mode}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`workmode-tab-${index}`}
                  aria-selected={selected}
                  aria-controls="workmode-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(mode)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className="btn-tab"
                >
                  {mode}
                </button>
              );
            })}
          </div>

          <div
            id="workmode-panel"
            role="tabpanel"
            aria-labelledby={`workmode-tab-${WORK_MODES.indexOf(activeTab)}`}
            className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {tabJobs.length ? (
              tabJobs.map((job) => <JobCard key={job.id} job={job} compact />)
            ) : (
              <p className="text-sm text-muted">No open roles in this work mode right now.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Browse"
            title="Popular job categories"
            description="Jump straight to relevant roles with one click."
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => {
              const Icon = categoryIcons[category] || HiMagnifyingGlass;
              const count = openJobs.filter((job) => job.category === category).length;
              return (
                <Link
                  key={category}
                  to={`/jobs?category=${encodeURIComponent(category)}`}
                  className="surface-card surface-card-hover group flex items-center gap-4 p-5"
                >
                  <span className="icon-tile icon-tile-lg">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <span className="block truncate font-display text-lg font-bold">{category}</span>
                    <span className="text-sm text-muted">
                      {count} open {IS_DEMO ? "sample " : ""}
                      {count === 1 ? "role" : "roles"}
                    </span>
                  </div>
                  <HiArrowRight
                    className="ml-auto shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-band scroll-mt-28 py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Process"
            title="How it works"
            description="A clear path from discovery to application."
          />
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="surface-card p-6">
                <div className="flex items-center justify-between">
                  <span className="icon-tile font-display text-sm font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-4 h-px flex-1 bg-line" aria-hidden="true" />
                  <HiArrowRight className="text-muted" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl">{step.title}</h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <div className="cta-panel p-8 sm:p-10 lg:p-12">
            <span className="cta-shape cta-shape-lg" aria-hidden="true" />
            <span className="cta-shape cta-shape-sm" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1.25fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="eyebrow">Ready to start</p>
                <h2 className="mt-3 text-balance text-3xl sm:text-4xl">Ready to find your next role?</h2>
                <p className="mt-3 text-lg">
                  Open the jobs page to search, filter, and review available roles.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/jobs" className="btn-inverse btn-lg">
                    Browse jobs
                    <HiArrowRight aria-hidden="true" />
                  </Link>
                  <Link to="/about" className="btn-outline-inverse btn-lg">
                    Learn more
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

      {showContactSection ? (
        <section className="section-band py-10 sm:py-12">
          <div className="page-shell">
            <SectionHeading
              eyebrow="Support"
              title="Contact information"
              description="Reach out if you have a question about a role."
            />
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {[
                showEmail ? { icon: HiEnvelope, label: "Email", value: CONTACT_PLACEHOLDERS.email } : null,
                showPhone ? { icon: HiPhone, label: "Phone", value: CONTACT_PLACEHOLDERS.phone } : null,
                showRegion ? { icon: HiMapPin, label: "Region", value: CONTACT_PLACEHOLDERS.region } : null,
              ]
                .filter(Boolean)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="surface-card flex items-start gap-3 p-5">
                      <span className="icon-tile">
                        <Icon aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{item.label}</p>
                        <p className="mt-1 break-words text-sm">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
