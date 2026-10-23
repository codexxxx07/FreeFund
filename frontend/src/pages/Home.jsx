import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiArrowTrendingUp,
  HiBriefcase,
  HiChatBubbleLeftRight,
  HiCheckCircle,
  HiDocumentCheck,
  HiEnvelope,
  HiMagnifyingGlass,
  HiMapPin,
  HiPhone,
  HiRectangleStack,
  HiShieldCheck,
  HiSparkles,
  HiUserGroup,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import DemoNotice from "../components/common/DemoNotice";
import SectionHeading from "../components/common/SectionHeading";
import JobCard from "../components/jobs/JobCard";
import JobSearchBar from "../components/jobs/JobSearchBar";
import { BRAND_NAME, CATEGORIES, CONTACT_PLACEHOLDERS, WORK_MODES } from "../data/constants";
import { getFeaturedJobs, getJobsByWorkMode, getOpenJobs } from "../utils/jobsApi";

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
    title: "Explore available jobs",
    body: "Browse sample listings filtered by location, category, and work mode with clear Job IDs.",
  },
  {
    title: "Review details & apply",
    body: "Open the job-specific application form. This prototype keeps the Job ID and title linked without sending data to HR.",
  },
  {
    title: "Stay informed",
    body: "Job status is clearly marked. Closed or paused roles are disabled with transparent messaging.",
  },
];

const benefits = [
  {
    icon: HiDocumentCheck,
    title: "Clear, scannable job data",
    body: "Each listing surfaces work mode, salary range, experience, and requirements for faster decisions.",
  },
  {
    icon: HiArrowTrendingUp,
    title: "Purposeful, guided application path",
    body: "Apply directly from the job page with validation and helpful feedback throughout the form.",
  },
  {
    icon: HiShieldCheck,
    title: "Honest demo labels",
    body: "Sample content is clearly labeled. Only open sample roles appear as current vacancies.",
  },
];

function JobStrip({ title, workMode, muted = false, openCount }) {
  const jobs = getJobsByWorkMode(workMode).slice(0, 3);
  if (jobs.length === 0) return null;

  const content = (
    <div className="page-shell">
      <SectionHeading
        eyebrow="Opportunities"
        title={title}
        description={`${openCount} open sample ${openCount === 1 ? "role" : "roles"} with this arrangement. Review the full details before applying.`}
        action={
          <Link to={`/jobs?workMode=${encodeURIComponent(workMode)}`} className="btn-secondary group">
            View all
            <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        }
      />
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} compact />
        ))}
      </div>
    </div>
  );

  if (muted) {
    return <section className="section-band">{content}</section>;
  }

  return <section className="section">{content}</section>;
}

export default function Home() {
  const featured = getFeaturedJobs();
  const openJobs = getOpenJobs();
  const openCount = openJobs.length;

  return (
    <div>
      <PageMeta
        title="Home"
        description={`${BRAND_NAME} is a recruitment website prototype for exploring sample job listings.`}
      />

      <section className="relative overflow-hidden border-b border-line bg-secondary">
        <div className="page-shell relative grid items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div>
            <p className="eyebrow">Recruitment portal · Phase 1</p>
            <h1 className="mt-5 max-w-2xl text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
              Find the <span className="text-accent-word">right role</span>. Apply with clarity.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {BRAND_NAME} helps candidates browse work-from-home, office, and hybrid opportunities with clean job
              cards, precise filters, and a job-specific application flow.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn-primary btn-lg group">
                Explore Jobs
                <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a href="#how-it-works" className="btn-secondary btn-lg">
                How it works
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <HiCheckCircle className="text-primary" aria-hidden="true" />
                {openCount} open demo roles
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

            <div className="mt-7 max-w-xl">
              <DemoNotice compact />
            </div>
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
                    <p className="font-display text-base font-bold">Search sample openings</p>
                    <p className="text-xs text-muted">Title, location, category, or Job ID</p>
                  </div>
                </div>
                <span className="badge badge-primary badge-dot">Demo data</span>
              </div>

              <div className="mt-5">
                <JobSearchBar />
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
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

              <p className="mt-4 flex items-center gap-1.5 text-[0.72rem] text-muted">
                <HiShieldCheck className="text-primary" aria-hidden="true" />
                Sample listings only — no live vacancies are claimed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Featured"
            title="Selected sample openings"
            description="A tight selection of open demo roles. Review the full details before applying."
            action={
              <Link to="/jobs" className="btn-secondary group">
                View all jobs
                <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
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

      <JobStrip
        title="Work From Home opportunities"
        workMode="Work From Home"
        muted
        openCount={openJobs.filter((job) => job.workMode === "Work From Home").length}
      />
      <JobStrip
        title="Work From Office opportunities"
        workMode="Work From Office"
        openCount={openJobs.filter((job) => job.workMode === "Work From Office").length}
      />
      <JobStrip
        title="Hybrid opportunities"
        workMode="Hybrid"
        muted
        openCount={openJobs.filter((job) => job.workMode === "Hybrid").length}
      />

      <section className="section">
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
                      {count} open sample {count === 1 ? "role" : "roles"}
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

      <section id="how-it-works" className="section-band scroll-mt-28">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Process"
            title="How it works"
            description="A clear path from discovery to application. No placement guarantees in this prototype."
          />
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="surface-card p-6">
                <div className="flex items-center justify-between">
                  <span className="icon-tile font-display text-sm font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 mx-4 bg-line" aria-hidden="true" />
                  <HiArrowRight className="text-muted" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl">{step.title}</h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="For candidates"
              title="Designed for confident decisions"
              description="The interface stays out of the way so the role, the details, and the next step are always easy to find."
            />
            <Link to="/about" className="btn-secondary mt-6 inline-flex">
              About the prototype
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="surface-card surface-card-hover flex items-start gap-4 p-5 sm:p-6"
                >
                  <span className="icon-tile icon-tile-lg">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg">{item.title}</h3>
                    <p className="mt-1.5 text-muted">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="page-shell">
          <div className="cta-panel p-8 sm:p-10 lg:p-12">
            <span className="cta-shape cta-shape-lg" aria-hidden="true" />
            <span className="cta-shape cta-shape-sm" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1.25fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="eyebrow">Ready to start</p>
                <h2 className="mt-3 text-balance text-3xl sm:text-4xl">Ready to browse sample roles?</h2>
                <p className="mt-3 text-lg">
                  Open the current jobs page to search, filter, and review Job IDs. Applications submitted here stay in
                  your browser for demonstration only.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/jobs" className="btn-inverse btn-lg group">
                    Explore Jobs
                    <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
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

      <section className="section-band">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Support"
            title="Contact information"
            description="Official details will replace these placeholders before launch."
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              { icon: HiEnvelope, label: "Email", value: CONTACT_PLACEHOLDERS.email },
              { icon: HiPhone, label: "Phone", value: CONTACT_PLACEHOLDERS.phone },
              { icon: HiMapPin, label: "Region", value: CONTACT_PLACEHOLDERS.region },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="surface-card flex items-start gap-3 p-5">
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{item.label}</p>
                    <p className="mt-1 break-words text-sm">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
