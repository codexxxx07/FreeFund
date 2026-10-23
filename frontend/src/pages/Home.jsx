import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiBriefcase,
  HiChatBubbleLeftRight,
  HiMagnifyingGlass,
  HiPhone,
  HiRectangleStack,
  HiSparkles,
  HiUserGroup,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import DemoNotice from "../components/common/DemoNotice";
import SectionHeading from "../components/common/SectionHeading";
import JobCard from "../components/jobs/JobCard";
import JobSearchBar from "../components/jobs/JobSearchBar";
import { BRAND_NAME, CATEGORIES, CONTACT_PLACEHOLDERS } from "../data/constants";
import { getFeaturedJobs, getJobsByWorkMode } from "../utils/jobsApi";

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
    body: "Browse curated sample listings filtered by location, category, and work mode with clear Job IDs.",
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
    title: "Clear, scannable job data",
    body: "Each listing surfaces work mode, salary range, experience, and requirements for faster decisions.",
  },
  {
    title: "Purposeful, guided application path",
    body: "Apply directly from the job page with validation and helpful feedback throughout the form.",
  },
  {
    title: "Honest demo labels",
    body: "Sample content is clearly labeled. Only open sample roles appear as current vacancies.",
  },
];

function JobStrip({ title, workMode }) {
  const jobs = getJobsByWorkMode(workMode).slice(0, 3);
  if (jobs.length === 0) return null;
  return (
    <section className="page-shell mt-16">
      <SectionHeading
        eyebrow="Opportunities"
        title={title}
        action={
          <Link to={`/jobs?workMode=${encodeURIComponent(workMode)}`} className="btn-secondary group">
            View all
            <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        }
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} compact />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const featured = getFeaturedJobs();

  return (
    <div>
      <PageMeta
        title="Home"
        description={`${BRAND_NAME} is a recruitment website prototype for exploring sample job listings.`}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-bg-muted via-white to-white" />
        <div className="page-shell relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Recruitment prototype</p>
            <h1 className="mt-4 max-w-2xl text-balance text-4xl sm:text-5xl lg:text-6xl">
              Find the right role. Apply with clarity.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-muted">
              {BRAND_NAME} helps candidates browse work-from-home, office, and hybrid opportunities with clean job
              cards, precise filters, and a job-specific application flow. Designed as a polished Phase 1 prototype.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn-primary group">
                Explore Jobs
                <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                Learn how it works
              </a>
            </div>
            <div className="mt-8">
              <DemoNotice />
            </div>
          </div>
          <div className="skew-wrap">
            <div className="surface-panel relative z-10 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Search openings</p>
                  <p className="mt-1 text-sm text-ink-muted">Filter by title, category, location, or ID.</p>
                </div>
                <span className="badge badge-teal">Live demo filters</span>
              </div>
              <div className="mt-5">
                <JobSearchBar />
              </div>
            </div>
          </div>
        </div>
        <span className="skew-decor -left-16 top-10 h-40 w-40 opacity-40" aria-hidden="true" />
      </section>

      <section className="page-shell mt-16">
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
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} compact />
          ))}
        </div>
      </section>

      <JobStrip title="Work From Home opportunities" workMode="Work From Home" />
      <JobStrip title="Work From Office opportunities" workMode="Work From Office" />
      <JobStrip title="Hybrid opportunities" workMode="Hybrid" />

      <section className="page-shell mt-16">
        <SectionHeading
          eyebrow="Browse"
          title="Popular job categories"
          description="Jump straight to relevant roles with one click."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = categoryIcons[category] || HiMagnifyingGlass;
            return (
              <Link
                key={category}
                to={`/jobs?category=${encodeURIComponent(category)}`}
                className="surface-card surface-card-hover flex items-center gap-4 p-5"
              >
                <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-bg-muted text-accent">
                  <span className="absolute -right-2 -top-2 h-6 w-6 skew-x-[-12deg] rounded-md bg-highlight/70" aria-hidden="true" />
                  <Icon size={22} aria-hidden="true" className="relative" />
                </span>
                <div>
                  <span className="block font-display text-lg font-bold">{category}</span>
                  <span className="text-sm text-ink-muted">View matching sample jobs</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="page-shell mt-16 scroll-mt-28">
        <SectionHeading
          eyebrow="Process"
          title="How it works"
          description="A clear path from discovery to application. No placement guarantees in this prototype."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="surface-panel relative overflow-hidden p-6">
              <div className="relative">
                <p className="font-display text-4xl text-accent/25">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl">{step.title}</h3>
                <p className="mt-2 text-ink-muted">{step.body}</p>
              </div>
              <span className="skew-decor -bottom-10 -right-12 h-24 w-24 opacity-40" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell mt-16">
        <SectionHeading eyebrow="For candidates" title="What this platform is designed to do" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {benefits.map((item) => (
            <article key={item.title} className="surface-muted p-6">
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-ink-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell mt-16">
        <div className="surface-panel relative overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Ready to start</p>
              <h2 className="mt-3 text-balance text-3xl sm:text-4xl">Ready to browse sample roles?</h2>
              <p className="mt-3 text-lg text-ink-muted">
                Open the current jobs page to search, filter, and review Job IDs. Applications submitted here stay in
                your browser for demonstration only.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/jobs" className="btn-primary group">
                  Explore Jobs
                  <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  Learn more about the prototype
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <span className="relative grid h-24 w-24 place-items-center rounded-3xl bg-accent text-white shadow-[0_4px_0_var(--color-accent-deep)]">
                <HiBriefcase size={28} aria-hidden="true" />
              </span>
            </div>
          </div>
          <span className="skew-decor -right-16 -top-10 h-40 w-40 opacity-40" aria-hidden="true" />
        </div>
      </section>

      <section className="page-shell mt-16 mb-10">
        <SectionHeading
          eyebrow="Support"
          title="Contact information"
          description="Official details will replace these placeholders."
        />
        <div className="mt-6 surface-panel grid gap-4 p-6 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Email</p>
            <p className="mt-1">{CONTACT_PLACEHOLDERS.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Phone</p>
            <p className="mt-1">{CONTACT_PLACEHOLDERS.phone}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Region</p>
            <p className="mt-1">{CONTACT_PLACEHOLDERS.region}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
