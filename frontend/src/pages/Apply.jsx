import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiArrowLeft, HiCheckCircle, HiDocumentArrowUp } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { EDUCATION_OPTIONS, EXPERIENCE_FILTERS, LOCATIONS, WORK_MODES } from "../data/constants";
import { getJobById } from "../utils/jobsApi";
import { isEmptyErrors, validateApplication } from "../utils/validation";
import NotFound from "./NotFound";

const STORAGE_KEY = "jm-demo-applications";

export default function Apply() {
  const { jobId } = useParams();
  const job = getJobById(jobId);

  const [values, setValues] = useState({
    fullName: "",
    mobile: "",
    email: "",
    preferredLocation: "",
    education: "",
    experience: "",
    preferredWorkMode: job?.workMode || "",
    resume: null,
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const closed = job && job.status !== "open";

  const fieldProps = useMemo(
    () => (name) => ({
      className: "field-input",
      value: values[name],
      onChange: (event) => setValues((current) => ({ ...current, [name]: event.target.value })),
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    }),
    [values, errors]
  );

  if (!job) return <NotFound />;

  function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validateApplication(values);
    setErrors(nextErrors);
    if (!isEmptyErrors(nextErrors) || closed) return;

    setStatus("loading");
    window.setTimeout(() => {
      const payload = {
        demoOnly: true,
        submittedAt: new Date().toISOString(),
        jobId: job.id,
        jobTitle: job.title,
        fullName: values.fullName,
        mobile: values.mobile,
        email: values.email,
        preferredLocation: values.preferredLocation,
        education: values.education,
        experience: values.experience,
        preferredWorkMode: values.preferredWorkMode,
        resumeFileName: values.resume ? values.resume.name : null,
      };
      const existing = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "[]");
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...existing]));
      setStatus("success");
    }, 700);
  }

  return (
    <div className="page-shell max-w-4xl py-10">
      <PageMeta title={`Apply · ${job.title}`} description={`Prototype application form for sample job ${job.id}.`} />
      <Link to={`/jobs/${job.id}`} className="btn-ghost inline-flex items-center gap-2">
        <HiArrowLeft aria-hidden="true" />
        Back to job details
      </Link>
      <SectionHeading
        eyebrow="Application"
        title="Apply for this sample role"
        description="This is a frontend-only demonstration. Nothing is emailed, stored on a server, or delivered to HR. Do not submit real personal information. A copy of the demo payload may be kept in this browser session only."
      />

      {closed ? (
        <div className="surface-panel mt-8 p-6 sm:p-8">
          <h2 className="text-xl">Applications are not open</h2>
          <p className="mt-2 text-ink-muted">
            {job.id} is marked {job.status}. The form below is disabled.
          </p>
        </div>
      ) : null}

      {status === "success" ? (
        <div className="surface-panel relative mt-8 overflow-hidden p-6 sm:p-10">
          <div className="relative flex flex-col items-start gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
              <HiCheckCircle aria-hidden="true" size={28} />
            </span>
            <div>
              <h2 className="text-2xl sm:text-3xl">Prototype submission recorded locally</h2>
              <p className="mt-2 max-w-xl text-ink-muted">
                This is not a real application. No recruiter has been notified. You can return to the jobs list or
                review another sample vacancy.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn-primary">
                Back to Jobs
              </Link>
              <Link to={`/jobs/${job.id}`} className="btn-secondary">
                View job details
              </Link>
            </div>
          </div>
          <span className="skew-decor -right-16 -top-10 h-40 w-40 opacity-40" aria-hidden="true" />
        </div>
      ) : (
        <form className="surface-panel relative mt-8 grid gap-6 overflow-hidden p-6 sm:p-10" onSubmit={onSubmit} noValidate>
          <div className="relative grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <h2 className="text-xl">Candidate details</h2>
              <p className="mt-1 text-sm text-ink-muted">Fields marked required must be completed.</p>
            </div>
            <label>
              <span className="field-label">Full name (required)</span>
              <input {...fieldProps("fullName")} autoComplete="name" disabled={closed} />
              {errors.fullName ? <p id="fullName-error" className="field-error">{errors.fullName}</p> : null}
            </label>
            <label>
              <span className="field-label">Mobile number (required)</span>
              <input {...fieldProps("mobile")} inputMode="tel" autoComplete="tel" disabled={closed} />
              {errors.mobile ? <p id="mobile-error" className="field-error">{errors.mobile}</p> : null}
            </label>
            <label>
              <span className="field-label">Email address (required)</span>
              <input {...fieldProps("email")} type="email" autoComplete="email" disabled={closed} />
              {errors.email ? <p id="email-error" className="field-error">{errors.email}</p> : null}
            </label>
            <label>
              <span className="field-label">Preferred job location (required)</span>
              <select className="field-select" value={values.preferredLocation} onChange={(event) => setValues((current) => ({ ...current, preferredLocation: event.target.value }))} disabled={closed} aria-invalid={Boolean(errors.preferredLocation)}>
                <option value="">Select a location</option>
                {LOCATIONS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              {errors.preferredLocation ? <p className="field-error">{errors.preferredLocation}</p> : null}
            </label>
            <label>
              <span className="field-label">Job ID</span>
              <input className="field-input bg-bg-muted" value={job.id} readOnly />
            </label>
            <label>
              <span className="field-label">Job title</span>
              <input className="field-input bg-bg-muted" value={job.title} readOnly />
            </label>
            <label>
              <span className="field-label">Highest education (required)</span>
              <select className="field-select" value={values.education} onChange={(event) => setValues((current) => ({ ...current, education: event.target.value }))} disabled={closed}>
                <option value="">Select education</option>
                {EDUCATION_OPTIONS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              {errors.education ? <p className="field-error">{errors.education}</p> : null}
            </label>
            <label>
              <span className="field-label">Work experience (required)</span>
              <select className="field-select" value={values.experience} onChange={(event) => setValues((current) => ({ ...current, experience: event.target.value }))} disabled={closed}>
                <option value="">Select experience</option>
                {EXPERIENCE_FILTERS.map((item) => (
                  <option key={item.value} value={item.label}>{item.label}</option>
                ))}
              </select>
              {errors.experience ? <p className="field-error">{errors.experience}</p> : null}
            </label>
            <label>
              <span className="field-label">Preferred work mode (optional)</span>
              <select className="field-select" value={values.preferredWorkMode} onChange={(event) => setValues((current) => ({ ...current, preferredWorkMode: event.target.value }))} disabled={closed}>
                <option value="">No preference</option>
                {WORK_MODES.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="md:col-span-2">
              <span className="field-label">Resume (optional, not uploaded)</span>
              <div className="relative">
                <input
                  className="field-input pl-11 file:mr-4 file:rounded-lg file:border-0 file:bg-bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  disabled={closed}
                  onChange={(event) => setValues((current) => ({ ...current, resume: event.target.files?.[0] || null }))}
                />
                <HiDocumentArrowUp className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
              </div>
              <p className="mt-1 text-xs text-ink-muted">The file stays in this browser session. It is not sent anywhere.</p>
              {errors.resume ? <p className="field-error">{errors.resume}</p> : null}
            </label>
          </div>

          <div className="relative rounded-2xl border border-line bg-bg-muted/60 p-5">
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-line text-accent focus:ring-accent"
                checked={values.consent}
                disabled={closed}
                onChange={(event) => setValues((current) => ({ ...current, consent: event.target.checked }))}
              />
              <span>
                I understand this is a prototype form and I consent to processing this sample information for recruitment
                demonstration purposes in this browser only. (required)
              </span>
            </label>
            {errors.consent ? <p className="field-error">{errors.consent}</p> : null}
          </div>

          <div className="relative">
            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={closed || status === "loading"}>
              {status === "loading" ? "Saving locally…" : "Submit prototype application"}
            </button>
          </div>
          <span className="skew-decor -bottom-12 -right-16 h-32 w-32 opacity-40" aria-hidden="true" />
        </form>
      )}
    </div>
  );
}
