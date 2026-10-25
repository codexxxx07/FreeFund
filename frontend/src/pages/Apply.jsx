import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheckCircle,
  HiDocumentArrowUp,
  HiInformationCircle,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SelectDropdown from "../components/common/SelectDropdown";
import { EDUCATION_OPTIONS, EXPERIENCE_FILTERS, IS_DEMO, LOCATIONS, WORK_MODES } from "../data/constants";
import { getJobById } from "../utils/jobsApi";
import { isEmptyErrors, validateApplication } from "../utils/validation";
import NotFound from "./NotFound";

const STORAGE_KEY = "jm-demo-applications";

const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const RESUME_EXTS = [".pdf", ".doc", ".docx"];

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
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const successRef = useRef(null);

  const closed = job && job.status !== "open";

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.focus();
    }
  }, [status]);

  if (!job) return <NotFound />;

  function touchField(name) {
    setTouched((current) => ({ ...current, [name]: true }));
  }

  function validateOnBlur(name) {
    setTouched((current) => ({ ...current, [name]: true }));
    const next = validateApplication(values);
    setErrors((current) => ({ ...current, [name]: next[name] }));
  }

  function fieldProps(name) {
    const showError = (touched[name] || submitAttempted) && errors[name];
    return {
      className: "field-input",
      value: values[name],
      onChange: (event) => {
        const nextValues = { ...values, [name]: event.target.value };
        setValues(nextValues);
        if (touched[name] || submitAttempted) {
          const next = validateApplication(nextValues);
          setErrors((current) => ({ ...current, [name]: next[name] }));
        }
      },
      onBlur: () => validateOnBlur(name),
      "aria-invalid": Boolean(showError),
      "aria-describedby": showError ? `${name}-error` : undefined,
    };
  }

  function validateCurrent(currentValues) {
    return validateApplication(currentValues);
  }

  function onSubmit(event) {
    event.preventDefault();
    setSubmitAttempted(true);
    const nextTouched = {};
    Object.keys(values).forEach((key) => {
      if (key !== "resume") nextTouched[key] = true;
    });
    setTouched((current) => ({ ...current, ...nextTouched }));
    const nextErrors = validateCurrent(values);
    setErrors(nextErrors);
    if (!isEmptyErrors(nextErrors) || closed) {
      requestAnimationFrame(() => {
        const firstKey = Object.keys(nextErrors)[0];
        if (firstKey) document.getElementById(firstKey)?.focus();
      });
      return;
    }

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

  function onResumeChange(event) {
    const file = event.target.files?.[0] || null;
    touchField("resume");
    if (!file) {
      setValues((current) => ({ ...current, resume: null }));
      setErrors((current) => ({ ...current, resume: undefined }));
      return;
    }
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (file.size > 2 * 1024 * 1024) {
      setValues((current) => ({ ...current, resume: null }));
      setErrors((current) => ({ ...current, resume: "Keep the file under 2 MB." }));
      event.target.value = "";
      return;
    }
    if (!RESUME_TYPES.includes(file.type) || !RESUME_EXTS.includes(ext)) {
      setValues((current) => ({ ...current, resume: null }));
      setErrors((current) => ({ ...current, resume: "Upload a PDF, DOC, or DOCX file." }));
      event.target.value = "";
      return;
    }
    setValues((current) => ({ ...current, resume: file }));
    setErrors((current) => ({ ...current, resume: undefined }));
  }

  function removeResume() {
    setValues((current) => ({ ...current, resume: null }));
    setErrors((current) => ({ ...current, resume: undefined }));
    const input = document.getElementById("resume-input");
    if (input) input.value = "";
  }

  const errorList = (submitAttempted || Object.keys(touched).some((key) => touched[key]))
    ? Object.entries(errors).filter(([, value]) => Boolean(value))
    : [];

  return (
    <div>
      <PageMeta title={`Apply · ${job.title}`} description={`Application form for ${job.id}.`} />

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
                Apply for this role
              </h1>
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
        {IS_DEMO ? (
          <div className="demo-notice mb-5" role="note">
            <HiInformationCircle size={18} aria-hidden="true" />
            <p>Sample application form. Nothing you enter is sent to an employer.</p>
          </div>
        ) : null}

        {closed ? (
          <div className="surface-panel mb-6 flex items-start gap-3 border-l-4 border-l-muted p-5">
            <span className="icon-tile">
              <HiInformationCircle aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg">Applications are not open</h2>
              <p className="mt-1 text-sm text-muted">This role is not accepting applications right now. The form is disabled.</p>
            </div>
          </div>
        ) : null}

        {status === "success" ? (
          <div className="surface-panel p-6 sm:p-10">
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <span className="icon-tile icon-tile-solid icon-tile-lg">
                <HiCheckCircle aria-hidden="true" size={28} />
              </span>
              <h2 ref={successRef} tabIndex={-1} className="mt-5 text-2xl focus:outline-none sm:text-3xl">
                Application summary prepared
              </h2>
              <p className="mt-3 text-muted">
                Job ID {job.id} · {job.title} · {values.fullName}
              </p>
              <div className="demo-notice mt-5 w-full text-left" role="note">
                <HiInformationCircle size={18} aria-hidden="true" />
                <p>
                  Nothing has been sent to an employer. This prototype keeps your entry in this browser tab only — it
                  disappears when the tab closes and is never uploaded. To apply for real, contact us with the Job ID
                  and we will take it from there.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to={`/contact?topic=candidate&subject=${encodeURIComponent(`Application for ${job.id}`)}`}
                  className="btn-primary"
                >
                  Contact us about this job
                  <HiArrowRight aria-hidden="true" />
                </Link>
                <Link to="/jobs" className="btn-secondary">
                  Back to jobs
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
                <p className="mt-1 text-sm text-muted">Fields marked required must be completed before continuing.</p>
              </div>
            </div>

            {errorList.length ? (
              <div className="mt-6 rounded-2xl border border-line bg-secondary p-4" role="alert" aria-live="assertive">
                <p className="text-sm font-semibold">Please fix the following:</p>
                <ul className="mt-2 grid gap-1 text-sm text-muted">
                  {errorList.map(([key, value]) => (
                    <li key={key}>
                      <a
                        href={`#${key}`}
                        className="underline underline-offset-4"
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById(key)?.focus();
                        }}
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label>
                <span className="field-label">Full name (required)</span>
                <input id="fullName" {...fieldProps("fullName")} autoComplete="name" disabled={closed} />
                {(touched.fullName || submitAttempted) && errors.fullName ? (
                  <p id="fullName-error" className="field-error">{errors.fullName}</p>
                ) : null}
              </label>
              <label>
                <span className="field-label">Mobile number (required)</span>
                <input
                  id="mobile"
                  {...fieldProps("mobile")}
                  inputMode="tel"
                  autoComplete="tel"
                  disabled={closed}
                  aria-describedby={(touched.mobile || submitAttempted) && errors.mobile ? "mobile-error mobile-hint" : "mobile-hint"}
                />
                <p id="mobile-hint" className="field-hint">10-digit number, +91 optional</p>
                {(touched.mobile || submitAttempted) && errors.mobile ? (
                  <p id="mobile-error" className="field-error">{errors.mobile}</p>
                ) : null}
              </label>
              <label>
                <span className="field-label">Email address (required)</span>
                <input id="email" {...fieldProps("email")} type="email" autoComplete="email" disabled={closed} />
                {(touched.email || submitAttempted) && errors.email ? (
                  <p id="email-error" className="field-error">{errors.email}</p>
                ) : null}
              </label>
              <div>
                <SelectDropdown
                  id="preferredLocation"
                  label="Preferred job location (required)"
                  value={values.preferredLocation}
                  onChange={(value) =>
                    setValues((current) => ({ ...current, preferredLocation: value }))
                  }
                  onBlur={() => validateOnBlur("preferredLocation")}
                  options={LOCATIONS}
                  placeholder="Select a location"
                  disabled={closed}
                  invalid={Boolean((touched.preferredLocation || submitAttempted) && errors.preferredLocation)}
                  ariaDescribedBy={(touched.preferredLocation || submitAttempted) && errors.preferredLocation ? "preferredLocation-error" : undefined}
                />
                {(touched.preferredLocation || submitAttempted) && errors.preferredLocation ? (
                  <p id="preferredLocation-error" className="field-error">{errors.preferredLocation}</p>
                ) : null}
              </div>

              <label>
                <span className="field-label">Job ID</span>
                <input className="field-input field-readonly" value={job.id} readOnly />
              </label>
              <label>
                <span className="field-label">Job title</span>
                <input className="field-input field-readonly" value={job.title} readOnly />
              </label>

              <div>
                <SelectDropdown
                  id="education"
                  label="Highest education (required)"
                  value={values.education}
                  onChange={(value) => setValues((current) => ({ ...current, education: value }))}
                  onBlur={() => validateOnBlur("education")}
                  options={EDUCATION_OPTIONS}
                  placeholder="Select education"
                  disabled={closed}
                  invalid={Boolean((touched.education || submitAttempted) && errors.education)}
                  ariaDescribedBy={(touched.education || submitAttempted) && errors.education ? "education-error" : undefined}
                />
                {(touched.education || submitAttempted) && errors.education ? (
                  <p id="education-error" className="field-error">{errors.education}</p>
                ) : null}
              </div>
              <div>
                <SelectDropdown
                  id="experience"
                  label="Work experience (required)"
                  value={values.experience}
                  onChange={(value) => setValues((current) => ({ ...current, experience: value }))}
                  onBlur={() => validateOnBlur("experience")}
                  options={EXPERIENCE_FILTERS.map((item) => ({ value: item.label, label: item.label }))}
                  placeholder="Select experience"
                  disabled={closed}
                  invalid={Boolean((touched.experience || submitAttempted) && errors.experience)}
                  ariaDescribedBy={(touched.experience || submitAttempted) && errors.experience ? "experience-error" : undefined}
                />
                {(touched.experience || submitAttempted) && errors.experience ? (
                  <p id="experience-error" className="field-error">{errors.experience}</p>
                ) : null}
              </div>
              <div>
                <SelectDropdown
                  id="preferredWorkMode"
                  label="Preferred work mode (optional)"
                  value={values.preferredWorkMode}
                  onChange={(value) =>
                    setValues((current) => ({ ...current, preferredWorkMode: value }))
                  }
                  options={WORK_MODES}
                  placeholder="No preference"
                  disabled={closed}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="resume-input">
                  <span className="field-label">Resume (optional)</span>
                </label>
                <input
                  id="resume-input"
                  className="field-input field-file"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  disabled={closed}
                  onChange={onResumeChange}
                  aria-invalid={Boolean((touched.resume || submitAttempted) && errors.resume)}
                  aria-describedby={(touched.resume || submitAttempted) && errors.resume ? "resume-error resume-hint" : "resume-hint"}
                />
                <p id="resume-hint" className="field-hint">
                  PDF, DOC, or DOCX · Max 2 MB
                </p>
                {(touched.resume || submitAttempted) && errors.resume ? (
                  <p id="resume-error" className="field-error">{errors.resume}</p>
                ) : null}
                {values.resume ? (
                  <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2 text-sm">
                    <span className="truncate">{values.resume.name}</span>
                    <button type="button" className="btn-ghost min-h-0 px-2 py-1" onClick={removeResume}>
                      Remove file
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="surface-inset mt-6 p-4 sm:p-5">
              <label className="flex items-start gap-3 text-sm">
                <input
                  id="consent"
                  type="checkbox"
                  className="field-checkbox mt-0.5"
                  checked={values.consent}
                  disabled={closed}
                  onChange={(event) => {
                    setValues((current) => ({ ...current, consent: event.target.checked }));
                    touchField("consent");
                  }}
                  onBlur={() => validateOnBlur("consent")}
                  aria-invalid={Boolean((touched.consent || submitAttempted) && errors.consent)}
                  aria-describedby={(touched.consent || submitAttempted) && errors.consent ? "consent-error" : undefined}
                />
                <span>
                  I confirm the details above are correct and can be used for this application. (required)
                </span>
              </label>
              {(touched.consent || submitAttempted) && errors.consent ? (
                <p id="consent-error" className="field-error">{errors.consent}</p>
              ) : null}
            </div>

            <div className="mt-6 flex justify-end border-t border-line pt-6">
              <button type="submit" className="btn-primary btn-lg w-full sm:w-auto" disabled={closed || status === "loading"}>
                {status === "loading" ? "Preparing…" : "Prepare my application"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

