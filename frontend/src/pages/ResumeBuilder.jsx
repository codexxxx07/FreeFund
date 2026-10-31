import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowDownTray,
  HiCheck,
  HiInformationCircle,
  HiTrash,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import Button from "../components/editorial/Button";
import ResumeForm from "../components/resume/ResumeForm";
import ResumePreview from "../components/resume/ResumePreview";
import { BRAND_NAME } from "../data/constants";
import { atsVerdict, computeAtsScore } from "../utils/atsScore";
import { uid } from "../utils/id";

const STORAGE_KEY = "jm-resume-v1";

const STEPS = [
  {
    id: "personal",
    label: "Personal",
    title: "Personal details & summary",
    hint: "The details a recruiter checks first, plus the three lines they read next.",
  },
  {
    id: "experience",
    label: "Experience",
    title: "Work experience",
    hint: "Most recent first. Evidence, not a list of duties.",
  },
  {
    id: "education",
    label: "Education",
    title: "Education",
    hint: "The highest qualification and where you completed it.",
  },
  {
    id: "skills",
    label: "Skills",
    title: "Skills",
    hint: "Words from the job ads that you can actually demonstrate.",
  },
  {
    id: "projects",
    label: "Projects",
    title: "Projects & certifications",
    hint: "Optional proof of work, especially useful with limited experience.",
  },
];

const TEMPLATES = [
  { id: "folio", label: "Folio" },
  { id: "ledger", label: "Ledger" },
  { id: "grid", label: "Grid" },
  { id: "compact", label: "Compact" },
];

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
      experience: Array.isArray(parsed.experience) ? parsed.experience.map((entry) => ({ id: uid(), ...entry })) : [],
      education: Array.isArray(parsed.education) ? parsed.education.map((entry) => ({ id: uid(), ...entry })) : [],
      skills: Array.isArray(parsed.skills) ? parsed.skills.map((entry) => ({ id: uid(), ...entry })) : [],
      projects: Array.isArray(parsed.projects) ? parsed.projects.map((entry) => ({ id: uid(), ...entry })) : [],
      credentials: Array.isArray(parsed.credentials) ? parsed.credentials.map((entry) => ({ id: uid(), ...entry })) : [],
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
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState("folio");
  const [errors, setErrors] = useState({});
  const [savedAt, setSavedAt] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const ats = useMemo(() => computeAtsScore(data), [data]);
  const stepMeta = STEPS[step];
  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSavedAt(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      } catch {
        // Storage may be blocked; the editor still works in memory.
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [data]);

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

  function goToStep(index) {
    setStep(Math.min(Math.max(index, 0), STEPS.length - 1));
    document.getElementById("resume-form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function downloadPdf() {
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStep(0);
      window.requestAnimationFrame(() => {
        document.getElementById(`resume-${Object.keys(nextErrors)[0]}`)?.focus();
      });
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
    setData({ ...EMPTY_RESUME });
    setErrors({});
    setConfirmClear(false);
    setStep(0);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore; in-memory state is cleared.
    }
  }

  const errorCount = Object.keys(errors).length;

  return (
    <div>
      <PageMeta
        title="Free A4 Resume Builder with ATS Score"
        description="Build a clean A4 resume in a split editor with four templates, a live preview, an honest ATS checklist and PDF export. No account, no watermark, nothing uploaded."
        canonicalPath="/resume-builder"
      />

      <section className="no-print">
        <div className="rb-toolbar">
          <div className="ed-shell">
            <div className="rb-toolbar__inner">
              <p className="rb-toolbar__title">
                Resume <span>studio</span>
              </p>
              <p className="rb-save">{savedAt ? `Saved locally · ${savedAt}` : "Saved locally as you type"}</p>
              <div className="rb-toolbar__actions">
                <Button variant="lime" onClick={downloadPdf}>
                  <HiArrowDownTray aria-hidden="true" size={15} />
                  Download PDF
                </Button>
                <Button onClick={clearAll} className={confirmClear ? "is-danger" : ""}>
                  <HiTrash aria-hidden="true" size={14} />
                  {confirmClear ? "Tap again to erase" : "Clear"}
                </Button>
                <Link to="/career-guidance" className="ed-link" style={{ alignSelf: "center", marginLeft: "0.35rem" }}>
                  Resume advice
                  <HiArrowRight aria-hidden="true" size={13} />
                </Link>
              </div>
            </div>

            <div className="rb-stepper" role="tablist" aria-label="Resume sections">
              {STEPS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === step}
                  className={`rb-step${index === step ? " is-active" : ""}${index < step ? " is-done" : ""}`}
                  onClick={() => goToStep(index)}
                >
                  <span className="rb-step__num">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="rb-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="ed-shell" style={{ paddingBlock: "1.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <p className="ed-label ed-label--lime">[ Split editor · A4 ]</p>
              <h1 className="ed-display" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", marginTop: "0.4rem" }}>
                Resume builder
              </h1>
            </div>
            <p className="ed-note rb-intro" style={{ maxWidth: "46ch" }}>
              <HiInformationCircle aria-hidden="true" size={14} />
              <span>
                Four templates, one page. Download opens your browser print dialog — choose “Save as PDF”.
                Nothing leaves this device.
              </span>
            </p>
          </div>

          {errorCount ? (
            <div className="rb-error" role="alert" style={{ marginTop: "1rem" }}>
              {errorCount === 1 ? "One field needs attention." : `${errorCount} fields need attention.`} Fill in your
              name and email before downloading.
            </div>
          ) : null}
        </div>
      </section>

      <div className="ed-shell rb-main" id="resume-form-top">
        <div className="rb-split">
          <div className="rb-form-column">
            <div className="rb-panel">
              <div className="rb-panel__head">
                <div>
                  <p className="ed-label">
                    Step {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                  </p>
                  <h2 className="rb-panel__title" style={{ marginTop: "0.3rem" }}>
                    {stepMeta.title}
                  </h2>
                </div>
                <span className="ed-label" style={{ textTransform: "none", letterSpacing: "0.01em", maxWidth: "22ch", textAlign: "right" }}>
                  {stepMeta.hint}
                </span>
              </div>
              <div className="rb-panel__body">
                <ResumeForm step={step} data={data} setData={setData} errors={errors} />

                <div className="rb-step-nav">
                  <Button onClick={() => goToStep(step - 1)} disabled={step === 0}>
                    <HiArrowLeft aria-hidden="true" size={14} />
                    Previous
                  </Button>
                  {step < STEPS.length - 1 ? (
                    <Button variant="lime" onClick={() => goToStep(step + 1)}>
                      Next: {STEPS[step + 1].label}
                      <HiArrowRight aria-hidden="true" size={14} />
                    </Button>
                  ) : (
                    <Button variant="lime" onClick={downloadPdf}>
                      <HiArrowDownTray aria-hidden="true" size={15} />
                      Download PDF
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <p style={{ marginTop: "0.75rem", fontSize: "0.72rem", lineHeight: 1.5 }}>
              Draft saved in this browser only. Use “Clear” to erase it from this device. No account is created.
            </p>
          </div>

          <div className="rb-side">
            <div className="rb-side__head">
              <p className="ed-label ed-label--lime">
                <HiCheck aria-hidden="true" size={13} /> Live A4 preview
              </p>
              <p className="ed-label">{ats.score}/100 checklist</p>
            </div>

            <div className="rb-templates" role="group" aria-label="Resume template">
              {TEMPLATES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`rb-template${template === item.id ? " is-active" : ""}`}
                  aria-pressed={template === item.id}
                  onClick={() => setTemplate(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="rb-a4-wrap">
              <ResumePreview data={data} template={template} />
            </div>

            <div className="rb-ats">
              <div className="rb-ats__top">
                <div>
                  <p className="ed-label ed-label--lime">[ ATS readiness ]</p>
                  <p className="rb-ats__score" style={{ marginTop: "0.5rem" }}>
                    {ats.score}
                    <small>/100</small>
                  </p>
                </div>
                <p className="rb-ats__label">
                  {atsVerdict(ats.score)}
                  <br />
                  Local checklist
                </p>
              </div>

              <div className="rb-ats__bar" role="img" aria-label={`Resume checklist ${ats.score} out of 100`}>
                <span style={{ width: `${ats.score}%` }} />
              </div>

              {ats.tips.length ? (
                <div className="rb-ats__tips">
                  {ats.tips.map((tip) => (
                    <p className="rb-ats__tip" key={tip}>
                      {tip}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="rb-ats__good">All checks passed. Read it once for truth, then export.</p>
              )}

              <p style={{ marginTop: "0.7rem", fontSize: "0.7rem", lineHeight: 1.5 }}>
                A heuristic checklist, not a real applicant tracking system. It never predicts an employer’s
                decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
