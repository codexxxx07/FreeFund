import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HiArrowLeft,
  HiArrowPathRoundedSquare,
  HiArrowRight,
  HiCalendarDays,
  HiClock,
  HiCurrencyRupee,
  HiDocumentText,
  HiLink,
  HiMapPin,
  HiShare,
  HiSparkles,
  HiWrenchScrewdriver,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import PageMeta from "../components/common/PageMeta";
import JobCard from "../components/jobs/JobCard";
import SectionHeading from "../components/common/SectionHeading";
import NotFound from "./NotFound";
import { IS_DEMO } from "../data/constants";
import { getJobById, getRelatedJobs } from "../utils/jobsApi";
import { formatDate, statusLabel } from "../utils/format";

function daysUntil(deadline) {
  if (!deadline) return null;
  const now = new Date();
  const target = new Date(`${deadline}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const diff = Math.ceil((target - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / (1000 * 60 * 60 * 24));
  if (diff < 0) return null;
  return diff;
}

function Detail({ label, value, icon }) {
  const Icon = icon;
  return (
    <div className="surface-soft flex items-start gap-3 p-4">
      <span className="icon-tile">
        {Icon ? <Icon size={18} aria-hidden="true" /> : null}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
        <p className="mt-1 text-sm leading-snug">{value}</p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

export default function JobDetails() {
  const { jobId } = useParams();
  const job = getJobById(jobId);
  const [copied, setCopied] = useState(false);
  const liveRef = useRef(null);

  useEffect(() => {
    if (!copied && liveRef.current) liveRef.current.textContent = "";
  }, [copied]);

  if (!job) {
    return <NotFound />;
  }

  const related = getRelatedJobs(job);
  const canApply = job.status === "open";
  const days = daysUntil(job.deadline);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const waText = encodeURIComponent(`${job.title} | ${job.id} | ${shareUrl}`);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      if (liveRef.current) liveRef.current.textContent = "Link copied";
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      if (liveRef.current) liveRef.current.textContent = "Link copied";
      window.setTimeout(() => setCopied(false), 1600);
    }
  }

  return (
    <div>
      <PageMeta title={job.title} description={`${job.title} (${job.id}) on Jobs Mania - Freefund.`} />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-8 lg:py-12">
          <Link to="/jobs" className="btn-ghost -ml-2 inline-flex items-center gap-2">
            <HiArrowLeft aria-hidden="true" />
            Back to jobs
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="badge badge-primary badge-dot">{job.workMode}</span>
            <span className={canApply ? "badge badge-primary badge-dot" : "badge badge-closed badge-dot"}>
              {statusLabel(job.status)}
            </span>
            <span className="badge">Job ID · {job.id}</span>
            {IS_DEMO && job.isDemo ? <span className="badge">Sample</span> : null}
            {days !== null ? (
              <span className="badge badge-closed">
                <HiClock aria-hidden="true" />
                {days <= 3
                  ? "Closing soon"
                  : days <= 14
                    ? `Closes in ${days} ${days === 1 ? "day" : "days"}`
                    : `Closes on ${formatDate(job.deadline)}`}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 max-w-4xl text-balance text-3xl sm:text-4xl lg:text-[2.9rem]">{job.title}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-lg text-muted">
            <span>{job.company}</span>
            <span aria-hidden="true">·</span>
            <span>{job.location}</span>
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="meta-chip">
              <HiCurrencyRupee aria-hidden="true" />
              {job.salary}
            </span>
            <span className="meta-chip">
              <HiSparkles aria-hidden="true" />
              {job.experience}
            </span>
            <span className="meta-chip">
              <HiMapPin aria-hidden="true" />
              {job.location}
            </span>
          </div>
        </div>
      </section>

      <div className="page-shell py-10">
        <section aria-label="Job overview">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Salary" value={job.salary} icon={HiCurrencyRupee} />
            <Detail label="Education" value={job.education} icon={HiDocumentText} />
            <Detail label="Experience" value={job.experience} icon={HiWrenchScrewdriver} />
            <Detail label="Shift timings" value={job.shift} icon={HiArrowPathRoundedSquare} />
            <Detail label="Weekly offs" value={job.weeklyOffs} icon={HiCalendarDays} />
            <Detail label="Application deadline" value={formatDate(job.deadline)} icon={HiClock} />
          </div>
        </section>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <section className="surface-panel p-6 sm:p-8">
              <h2 className="text-2xl">Responsibilities</h2>
              <ul className="mt-4 grid gap-3">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface-panel p-6 sm:p-8">
              <h2 className="text-2xl">Required skills</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <li key={skill} className="badge badge-neutral px-3 py-1.5 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface-panel p-6 sm:p-8">
              <h2 className="text-2xl">Additional eligibility</h2>
              <ul className="mt-4 grid gap-3">
                {job.eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="surface-panel p-6 lg:sticky lg:top-28">
            <p className="eyebrow">Application</p>
            <h2 className="mt-3 text-2xl">Apply for this role</h2>
            <p className="mt-2 text-sm text-muted">
              {canApply
                ? "The application form keeps this Job ID and title attached."
                : `This role is ${statusLabel(job.status).toLowerCase()}. Applications are disabled.`}
            </p>

            <div className="surface-inset mt-5 grid gap-2.5 p-4">
              <SummaryRow label="Job ID" value={job.id} />
              <SummaryRow label="Work mode" value={job.workMode} />
              <SummaryRow label="Location" value={job.location} />
              <SummaryRow label="Deadline" value={formatDate(job.deadline)} />
            </div>

            {canApply ? (
              <Link to={`/apply/${job.id}`} className="btn-primary btn-lg mt-5 w-full">
                Apply now
                <HiArrowRight aria-hidden="true" />
              </Link>
            ) : (
              <button type="button" className="btn-primary btn-lg mt-5 w-full" disabled>
                Applications closed
              </button>
            )}

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-sm font-semibold">Share</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary min-h-0 px-3 py-2"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp aria-hidden="true" />
                  WhatsApp
                </a>
                <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={handleCopy}>
                  <HiLink aria-hidden="true" />
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
              <div aria-live="polite" className="sr-only" ref={liveRef}></div>
            </div>
          </aside>
        </div>

        {related.length ? (
          <section className="mt-14">
            <SectionHeading
              eyebrow="Related"
              title={IS_DEMO ? "Related sample jobs" : "Related jobs"}
              description="Other open roles that may be a good fit."
              action={
                <Link to="/jobs" className="btn-secondary group">
                  Browse all jobs
                  <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              }
            />
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <JobCard key={item.id} job={item} compact />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {canApply ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur lg:hidden">
          <div className="page-shell flex items-center justify-between gap-3 py-2.5" style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}>
            <div className="min-w-0">
              <p className="text-xs text-muted">Apply now</p>
              {days !== null ? (
                <p className="text-sm font-semibold">
                  {days <= 3
                    ? "Closing soon"
                    : days <= 14
                      ? `Closes in ${days} ${days === 1 ? "day" : "days"}`
                      : `Closes on ${formatDate(job.deadline)}`}
                </p>
              ) : (
                <p className="text-sm font-semibold">Open</p>
              )}
            </div>
            <Link to={`/apply/${job.id}`} className="btn-primary shrink-0">
              Apply now
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur lg:hidden">
          <div className="page-shell py-2.5" style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}>
            <button type="button" className="btn-primary w-full" disabled>
              Applications closed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
