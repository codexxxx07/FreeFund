import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiArrowDownTray, HiInformationCircle, HiTrash } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import ResumeForm from "../components/resume/ResumeForm";
import ResumePreview from "../components/resume/ResumePreview";
import { BRAND_NAME } from "../data/constants";
import { uid } from "../utils/id";

const STORAGE_KEY = "jm-resume-v1";

const EMPTY_RESUME = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  links: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  credentials: [],
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function loadStored() {
  if (typeof window === "undefined") return EMPTY_RESUME;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_RESUME;
    const parsed = JSON.parse(raw);
    return {
      ...EMPTY_RESUME,
      ...parsed,
      experience: Array.isArray(parsed.experience) ? parsed.experience.map((e) => ({ id: uid(), ...e })) : [],
      education: Array.isArray(parsed.education) ? parsed.education.map((e) => ({ id: uid(), ...e })) : [],
      skills: Array.isArray(parsed.skills) ? parsed.skills.map((e) => ({ id: uid(), ...e })) : [],
      projects: Array.isArray(parsed.projects) ? parsed.projects.map((e) => ({ id: uid(), ...e })) : [],
      credentials: Array.isArray(parsed.credentials) ? parsed.credentials.map((e) => ({ id: uid(), ...e })) : [],
    };
  } catch {
    return EMPTY_RESUME;
  }
}

function validate(data) {
  const errors = {};
  if (!data.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!data.email.trim()) errors.email = "Enter an email address.";
  else if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = "Enter a valid email address.";
  return errors;
}

export default function ResumeBuilder() {
  const [data, setData] = useState(loadStored);
  const [errors, setErrors] = useState({});
  const [savedAt, setSavedAt] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  // Persist locally — browser storage only, nothing leaves this device.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSavedAt(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      } catch {
        // Storage may be full or blocked; the builder still works in memory.
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [data]);

  // Always remove the print-only body class, whether print ran or was cancelled.
  useEffect(() => {
    function cleanup() {
      document.body.classList.remove("print-resume");
    }
    window.addEventListener("afterprint", cleanup);
    const fallback = window.setTimeout(cleanup, 4000);
    return () => {
      window.removeEventListener("afterprint", cleanup);
      window.clearTimeout(fallback);
      cleanup();
    };
  }, []);

  function downloadPdf() {
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`resume-${firstKey}`)?.focus();
      return;
    }
    document.body.classList.add("print-resume");
    window.print();
  }

  function clearAll() {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    setData({ ...EMPTY_RESUME, experience: [], education: [], skills: [], projects: [], credentials: [] });
    setErrors({});
    setConfirmClear(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures — the in-memory state is already cleared.
    }
  }

  const errorCount = Object.keys(errors).length;

  return (
    <div>
      <PageMeta
        title="Resume Builder"
        description={`Build a free, ATS-friendly resume in your browser and download it as a PDF. ${BRAND_NAME} resume builder — no signup, nothing uploaded.`}
      />

      <section className="no-print border-b border-line bg-secondary">
        <div className="page-shell py-10 lg:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Career resources"
            title="Resume Builder"
            description="Fill in each section and watch the preview update live. Download a clean, single-column PDF when you are ready — no account, no watermark, no upload."
          />

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button type="button" className="btn-primary btn-lg" onClick={downloadPdf}>
              <HiArrowDownTray aria-hidden="true" />
              Download PDF
            </button>
            <button
              type="button"
              className={`btn-secondary${confirmClear ? " text-destructive" : ""}`}
              onClick={clearAll}
              onBlur={() => setConfirmClear(false)}
            >
              <HiTrash aria-hidden="true" />
              {confirmClear ? "Tap again to erase everything" : "Clear saved data"}
            </button>
            <Link to="/career-guidance" className="btn-ghost">
              Resume writing tips
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-5 flex max-w-3xl items-start gap-2.5 text-sm text-muted">
            <HiInformationCircle className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>
              Download opens your browser&apos;s print dialog — choose <strong className="text-fg">Save as PDF</strong>{" "}
              as the destination. {savedAt ? `Saved in this browser at ${savedAt}. ` : ""}
              Your data stays in this browser&apos;s local storage and is never uploaded. Use “Clear saved data” to
              erase it from this device.
            </p>
          </div>

          {errorCount ? (
            <div className="mt-5 max-w-3xl rounded-xl border border-line bg-secondary p-4" role="alert" aria-live="assertive">
              <p className="text-sm font-semibold">
                {errorCount === 1 ? "One field needs attention before you download." : `${errorCount} fields need attention before you download.`}
              </p>
              <ul className="mt-2 grid gap-1 text-sm text-muted">
                {Object.entries(errors).map(([key, message]) => (
                  <li key={key}>
                    <a
                      href={`#resume-${key}`}
                      className="underline underline-offset-4"
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById(`resume-${key}`)?.focus();
                      }}
                    >
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <div className="page-shell py-10">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div id="resume-form" className="no-print">
            <ResumeForm data={data} setData={setData} errors={errors} />
          </div>

          <div className="resume-preview-column lg:sticky lg:top-28">
            <div className="mb-3 flex items-center justify-between gap-3 no-print">
              <p className="eyebrow">Live preview</p>
              <span className="badge badge-primary">ATS-friendly</span>
            </div>
            <div className="max-h-none lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto lg:pr-1">
              <ResumePreview data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
