import { Link } from "react-router-dom";
import { HiMapPin, HiBriefcase, HiCurrencyRupee, HiArrowRight } from "react-icons/hi2";
import { statusLabel } from "../../utils/format";

export default function JobCard({ job, compact = false }) {
  const closed = job.status !== "open";

  return (
    <article className="surface-card surface-card-hover flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge">{job.id}</span>
        <span className="badge badge-teal">{job.workMode}</span>
        {closed ? <span className="badge badge-closed">{statusLabel(job.status)}</span> : null}
        {job.isDemo ? <span className="badge badge-warm">Sample</span> : null}
      </div>
      <h3 className={`${compact ? "mt-3 text-lg sm:text-xl" : "mt-4 text-xl sm:text-2xl"} text-balance`}>{job.title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{job.company}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl bg-bg-muted text-accent">
            <HiMapPin aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs text-ink-muted">Location</p>
            <p className="text-sm">{job.location}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl bg-bg-muted text-accent">
            <HiBriefcase aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs text-ink-muted">Experience</p>
            <p className="text-sm">{job.experience}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 sm:col-span-2">
          <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl bg-bg-muted text-accent">
            <HiCurrencyRupee aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs text-ink-muted">Salary</p>
            <p className="text-sm">{job.salary}</p>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <Link to={`/jobs/${job.id}`} className="btn-secondary group w-full justify-between">
          View Details
          <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
