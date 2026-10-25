/**
 * Free training programmes.
 * ─────────────────────────────────────────────────────────────────────────────
 * Structured local data for /free-training.
 *
 * OWNER INSTRUCTIONS
 *  - Replace the sample outlines below with programmes you actually run.
 *  - Set `isSample: false` only for programmes you have confirmed.
 *  - `status` controls what the page claims:
 *      "open"       → shows the registration action (requires registrationUrl
 *                     or a configured WhatsApp enquiry number)
 *      "not-open"   → shows "Registration details to be confirmed" and never
 *                     claims that sign-ups are being accepted
 *      "waitlist"   → shows a waitlist message only
 *  - `registrationUrl` must be the official form link. Leave "" until you have
 *    one — the page will not render a dead link.
 *  - Never add a date, seat count or credential you cannot confirm.
 */

export const trainingPrograms = [
  {
    id: "job-readiness",
    title: "Job Readiness Workshop",
    summary:
      "A practical session covering how to read a job description, structure an application, and walk into an interview knowing what to expect.",
    audience: "Freshers and candidates returning to work after a break",
    skills: [
      "Reading job descriptions",
      "Building an application checklist",
      "Interview question practice",
      "Salary and offer basics",
    ],
    duration: "", // e.g. "2 weeks" — only when confirmed
    format: "", // e.g. "Online, live sessions" — only when confirmed
    status: "not-open",
    registrationUrl: "",
    isSample: true,
  },
  {
    id: "resume-clinic",
    title: "Resume Clinic",
    summary:
      "Bring your current resume and rebuild it section by section with feedback on structure, wording and readability for applicant tracking systems.",
    audience: "Candidates at any experience level who are actively applying",
    skills: [
      "Resume structure and headings",
      "Rewriting duties as achievements",
      "Tailoring to a job description",
      "Exporting a clean PDF",
    ],
    duration: "",
    format: "",
    status: "not-open",
    registrationUrl: "",
    isSample: true,
  },
  {
    id: "spoken-english-interviews",
    title: "Spoken English for Interviews",
    summary:
      "Guided speaking practice for common interview exchanges, including self-introductions, describing your work, and asking questions at the end.",
    audience: "Candidates who understand English but want more confidence speaking it",
    skills: [
      "60-second self introduction",
      "Describing projects and past roles",
      "Clarifying questions",
      "Pace and pronunciation practice",
    ],
    duration: "",
    format: "",
    status: "not-open",
    registrationUrl: "",
    isSample: true,
  },
  {
    id: "computer-basics-work",
    title: "Computer Basics for the Workplace",
    summary:
      "File management, document formatting, spreadsheets for everyday calculations, and email — the computer skills most entry-level roles assume you already have.",
    audience: "Job seekers with limited hands-on computer experience",
    skills: [
      "Files, folders and shortcuts",
      "Word processing and formatting",
      "Spreadsheet basics",
      "Email and attachments",
    ],
    duration: "",
    format: "",
    status: "not-open",
    registrationUrl: "",
    isSample: true,
  },
];

export const TRAINING_STATUS = {
  open: { label: "Registration open", badge: "badge badge-primary badge-dot" },
  waitlist: { label: "Waitlist only", badge: "badge badge-neutral badge-dot" },
  "not-open": { label: "Registration details to be confirmed", badge: "badge badge-closed" },
};

/** Programmes the current site mode is allowed to display. */
export function getVisiblePrograms(isDemo) {
  return trainingPrograms.filter((program) => (program.isSample ? isDemo : true));
}
