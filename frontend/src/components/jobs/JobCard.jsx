import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiBriefcase,
  HiBuildingOffice2,
  HiCurrencyRupee,
  HiMapPin,
} from "react-icons/hi2";
import { statusLabel } from "../../utils/format";

function Meta({ icon, label, value }) {
  const Icon = icon;
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-primary">
        <Icon aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
        <p className="mt-0.5 text-sm leading-snug">{value}</p>
      </div>
    </div>
  );
}

function InlineMeta({ icon, value }) {
  const Icon = icon;
  return (
    <span className="flex items-start gap-2">
      <Icon className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
      <span>{value}</span>
    </span>
  );
}

export default function JobCard({ job, compact = false }) {
  const closed = job.status !== "open";

  return (
    <article className={`surface-card surface-card-hover job-card ${compact ? "p-5" : ""}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge badge-primary badge-dot">{job.workMode}</span>
        {closed ? <span className="badge badge-closed badge-dot">{statusLabel(job.status)}</span> : null}
        {job.isDemo ? <span className="badge">Sample</span> : null}
      </div>

      <h3 className={`${compact ? "mt-3 text-lg" : "mt-4 text-xl sm:text-[1.35rem]"} text-balance`}>{job.title}</h3>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
        <HiBuildingOffice2 className="shrink-0" aria-hidden="true" />
        <span className="truncate">{job.company}</span>
      </p>

      {compact ? (
        <div className="mt-4 grid gap-2 text-sm text-muted">
          <InlineMeta icon={HiMapPin} value={job.location} />
          <InlineMeta icon={HiBriefcase} value={job.experience} />
          <InlineMeta icon={HiCurrencyRupee} value={job.salary} />
        </div>
      ) : (
        <div className="surface-inset mt-5 grid gap-4 p-4 sm:grid-cols-2">
          <Meta icon={HiMapPin} label="Location" value={job.location} />
          <Meta icon={HiBriefcase} label="Experience" value={job.experience} />
          <div className="sm:col-span-2">
            <Meta icon={HiCurrencyRupee} label="Salary" value={job.salary} />
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{job.id}</span>
        <Link to={`/jobs/${job.id}`} className="btn-secondary group shrink-0">
          View Details
          <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
