import { Link, useParams } from "react-router-dom";
import {
  HiArrowLeft,
  HiCalendarDays,
  HiClock,
  HiDocumentText,
  HiMapPin,
  HiShieldCheck,
  HiSparkles,
  HiWrenchScrewdriver,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import DemoNotice from "../components/common/DemoNotice";
import JobCard from "../components/jobs/JobCard";
import SectionHeading from "../components/common/SectionHeading";
import NotFound from "./NotFound";
import { getJobById, getRelatedJobs } from "../utils/jobsApi";
import { formatDate, statusLabel } from "../utils/format";

function Detail({ label, value, icon }) {
  const Icon = icon;
  return (
    <div className="surface-panel flex items-start gap-3 p-4">
      <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-bg-muted text-accent">
        {Icon ? <Icon aria-hidden="true" /> : null}
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">{label}</p>
        <p className="mt-1 text-sm">{value}</p>
      </div>
    </div>
  );
}

export default function JobDetails() {
  const { jobId } = useParams();
  const job = getJobById(jobId);

  if (!job) {
    return <NotFound />;
  }

  const related = getRelatedJobs(job);
  const canApply = job.status === "open";

  return (
    <div className="page-shell py-10">
      <PageMeta title={job.title} description={`${job.title} (${job.id}) is a sample vacancy on Jobs Mania - Freefund.`} />
      <Link to="/jobs" className="btn-ghost inline-flex items-center gap-2">
        <HiArrowLeft aria-hidden="true" />
        Back to Jobs
      </Link>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="badge">{job.id}</span>
        <span className="badge badge-teal">{job.workMode}</span>
        <span className={job.status === "open" ? "badge badge-teal" : "badge badge-closed"}>
          {statusLabel(job.status)}
        </span>
        <span className="badge badge-warm">Sample listing</span>
      </div>
      <h1 className="mt-4 max-w-4xl text-balance text-3xl sm:text-4xl lg:text-5xl">{job.title}</h1>
      <p className="mt-3 text-lg text-ink-muted">{job.company} · {job.location}</p>
      <div className="mt-6">
        <DemoNotice compact />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Detail label="Salary" value={job.salary} icon={HiSparkles} />
        <Detail label="Education" value={job.education} icon={HiDocumentText} />
        <Detail label="Experience" value={job.experience} icon={HiWrenchScrewdriver} />
        <Detail label="Shift timings" value={job.shift} icon={HiClock} />
        <Detail label="Weekly offs" value={job.weeklyOffs} icon={HiCalendarDays} />
        <Detail label="Application deadline" value={formatDate(job.deadline)} icon={HiShieldCheck} />
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-8">
          <section className="surface-panel p-6 sm:p-8">
            <h2 className="text-2xl">Responsibilities</h2>
            <ul className="mt-4 grid gap-3 text-ink-muted">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="surface-panel p-6 sm:p-8">
            <h2 className="text-2xl">Required skills</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <li key={skill} className="badge">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
          <section className="surface-panel p-6 sm:p-8">
            <h2 className="text-2xl">Additional eligibility</h2>
            <ul className="mt-4 grid gap-3 text-ink-muted">
              {job.eligibility.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="surface-panel relative h-fit overflow-hidden p-6 sm:p-8">
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-bg-muted text-accent">
                <HiMapPin aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl">Apply for this role</h2>
                <p className="text-sm text-ink-muted">{job.location} · {job.workMode}</p>
              </div>
            </div>
            <p className="mt-3 text-ink-muted">
              {canApply
                ? "The application form will keep this Job ID and title attached. It is a frontend demonstration and does not send data to HR."
                : `This sample role is ${statusLabel(job.status).toLowerCase()}. Applications are disabled.`}
            </p>
            {canApply ? (
              <Link to={`/apply/${job.id}`} className="btn-primary mt-6 w-full">
                Apply Now
              </Link>
            ) : (
              <button type="button" className="btn-primary mt-6 w-full" disabled>
                Applications closed
              </button>
            )}
          </div>
          <span className="skew-decor -bottom-12 -right-14 h-28 w-28 opacity-40" aria-hidden="true" />
        </aside>
      </section>

      {related.length ? (
        <section className="mt-12">
          <SectionHeading eyebrow="Related" title="Related sample jobs" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <JobCard key={item.id} job={item} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
