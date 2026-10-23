import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheckCircle,
  HiDocumentArrowUp,
  HiInformationCircle,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
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
    <div>
      <PageMeta title={`Apply · ${job.title}`} description={`Prototype application form for sample job ${job.id}.`} />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-8 lg:py-12">
          <Link to={`/jobs/${job.id}`} className="btn-ghost -ml-2 inline-flex items-center gap-2">
            <HiArrowLeft aria-hidden="true" />
            Back to job details
          </Link>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">Application</p>
              <h1 className="mt-3 max-w-2xl text-balance text-3xl sm:text-4xl lg:text-[2.9rem]">
                Apply for this sample role
              </h1>
              <p className="mt-3 max-w-2xl text-muted">
                This is a frontend-only demonstration. Nothing is emailed, stored on a server, or delivered to HR. Do not
                submit real personal information. A copy of the demo payload may be kept in this browser session only.
              </p>
            </div>
            <div className="surface-soft flex flex-wrap items-center gap-2 p-3">
              <span className="badge badge-primary">{job.id}</span>
              <span className="badge">{job.workMode}</span>
              <span className="badge">{job.location}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="page-shell max-w-5xl py-10">
        {closed ? (
          <div className="surface-panel mb-6 flex items-start gap-3 border-l-4 border-l-muted p-5">
            <span className="icon-tile">
              <HiInformationCircle aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg">Applications are not open</h2>
              <p className="mt-1 text-sm text-muted">{job.id} is marked {job.status}. The form below is disabled.</p>
            </div>
          </div>
        ) : null}

        {status === "success" ? (
          <div className="surface-panel p-6 sm:p-10">
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <span className="icon-tile icon-tile-solid icon-tile-lg">
                <HiCheckCircle aria-hidden="true" size={28} />
              </span>
              <h2 className="mt-5 text-2xl sm:text-3xl">Prototype submission recorded locally</h2>
              <p className="mt-3 text-muted">
                This is not a real application. No recruiter has been notified. You can return to the jobs list or
                review another sample vacancy.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/jobs" className="btn-primary">
                  Back to Jobs
                  <HiArrowRight aria-hidden="true" />
                </Link>
                <Link to={`/jobs/${job.id}`} className="btn-secondary">
                  View job details
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form className="surface-panel p-6 sm:p-8 lg:p-10" onSubmit={onSubmit} noValidate>
            <div className="flex items-start gap-3 border-b border-line pb-6">
              <span className="icon-tile icon-tile-solid">
                <HiDocumentArrowUp aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl">Candidate details</h2>
                <p className="mt-1 text-sm text-muted">Fields marked required must be completed before submitting.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
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
                <select
                  className="field-select"
                  value={values.preferredLocation}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, preferredLocation: event.target.value }))
                  }
                  disabled={closed}
                  aria-invalid={Boolean(errors.preferredLocation)}
                  aria-describedby={errors.preferredLocation ? "preferredLocation-error" : undefined}
                >
                  <option value="">Select a location</option>
                  {LOCATIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {errors.preferredLocation ? (
                  <p id="preferredLocation-error" className="field-error">{errors.preferredLocation}</p>
                ) : null}
              </label>

              <label>
                <span className="field-label">Job ID</span>
                <input className="field-input field-readonly" value={job.id} readOnly />
              </label>
              <label>
                <span className="field-label">Job title</span>
                <input className="field-input field-readonly" value={job.title} readOnly />
              </label>

              <label>
                <span className="field-label">Highest education (required)</span>
                <select
                  className="field-select"
                  value={values.education}
                  onChange={(event) => setValues((current) => ({ ...current, education: event.target.value }))}
                  disabled={closed}
                  aria-invalid={Boolean(errors.education)}
                  aria-describedby={errors.education ? "education-error" : undefined}
                >
                  <option value="">Select education</option>
                  {EDUCATION_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {errors.education ? <p id="education-error" className="field-error">{errors.education}</p> : null}
              </label>
              <label>
                <span className="field-label">Work experience (required)</span>
                <select
                  className="field-select"
                  value={values.experience}
                  onChange={(event) => setValues((current) => ({ ...current, experience: event.target.value }))}
                  disabled={closed}
                  aria-invalid={Boolean(errors.experience)}
                  aria-describedby={errors.experience ? "experience-error" : undefined}
                >
                  <option value="">Select experience</option>
                  {EXPERIENCE_FILTERS.map((item) => (
                    <option key={item.value} value={item.label}>{item.label}</option>
                  ))}
                </select>
                {errors.experience ? <p id="experience-error" className="field-error">{errors.experience}</p> : null}
              </label>
              <label>
                <span className="field-label">Preferred work mode (optional)</span>
                <select
                  className="field-select"
                  value={values.preferredWorkMode}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, preferredWorkMode: event.target.value }))
                  }
                  disabled={closed}
                >
                  <option value="">No preference</option>
                  {WORK_MODES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="md:col-span-2">
                <span className="field-label">Resume (optional, not uploaded)</span>
                <input
                  className="field-input field-file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  disabled={closed}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, resume: event.target.files?.[0] || null }))
                  }
                />
                <p className="field-hint">
                  PDF, DOC, or DOCX. The file stays in this browser session and is not sent anywhere.
                </p>
                {errors.resume ? <p className="field-error">{errors.resume}</p> : null}
              </label>
            </div>

            <div className="surface-inset mt-6 p-4 sm:p-5">
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="field-checkbox mt-0.5"
                  checked={values.consent}
                  disabled={closed}
                  onChange={(event) => setValues((current) => ({ ...current, consent: event.target.checked }))}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                />
                <span>
                  I understand this is a prototype form and I consent to processing this sample information for
                  recruitment demonstration purposes in this browser only. (required)
                </span>
              </label>
              {errors.consent ? <p id="consent-error" className="field-error">{errors.consent}</p> : null}
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted sm:max-w-sm">
                Submitting stores a demo payload in session storage only. No backend, CRM, or email delivery is
                connected.
              </p>
              <button type="submit" className="btn-primary btn-lg sm:w-auto" disabled={closed || status === "loading"}>
                {status === "loading" ? "Saving locally…" : "Submit prototype application"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
