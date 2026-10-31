/**
 * trainingPrograms.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Cohort content for /free-training.
 *
 * OWNER INSTRUCTIONS
 *  - This is a SAMPLE cohort. Replace the dates, seats, mentor profiles and
 *    outcomes with confirmed details, then set `isSample: false`.
 *  - `getCohortStart()` always returns the next Monday at 7:00 PM, at least ten
 *    days from today, so the countdown never points at a past date during a
 *    demo. Replace it with a fixed ISO date when the batch is confirmed.
 *  - Never claim a seat, placement or certificate that has not been confirmed.
 */

function nextBatchDate() {
  const date = new Date();
  date.setHours(19, 0, 0, 0);
  date.setDate(date.getDate() + 10);
  // Move forward to the next Monday (1).
  while (date.getDay() !== 1) date.setDate(date.getDate() + 1);
  return date;
}

export const cohort = {
  code: "Cohort 04",
  name: "Job Readiness Sprint",
  startDate: nextBatchDate(),
  duration: "14 days",
  schedule: "Mon–Fri · 7:00–8:30 PM IST",
  mode: "Live online · recordings for 7 days",
  fee: "Free",
  seatsTotal: 40,
  seatsLeft: 11,
  eligibility: "Freshers, career returners and anyone actively applying",
  isSample: true,
};

export const weeks = [
  {
    week: "Week 01",
    dates: "Days 1–5",
    title: "Read the role, not the wishlist",
    description:
      "Decode a job description into four columns: must-have, nice-to-have, evidence you already have, and gaps worth closing. You leave with a shortlist of roles you can honestly apply to.",
    tags: ["JD teardown", "Role shortlist", "Application tracker"],
  },
  {
    week: "Week 02",
    dates: "Days 6–10",
    title: "Build the evidence",
    description:
      "Turn duties into outcomes, choose the right resume structure, and write a two-line summary that a recruiter can repeat back to you. Peer review happens in pairs, not in a group chat.",
    tags: ["Resume clinic", "Achievement bullets", "Peer review"],
  },
  {
    week: "Week 03",
    dates: "Days 11–12",
    title: "Practise the conversation",
    description:
      "Answer the five questions that decide most entry-level interviews, including the one about a gap or a failure. We record a 60-second introduction and review it against a rubric.",
    tags: ["Mock interview", "STAR answers", "Recorded intro"],
  },
  {
    week: "Week 04",
    dates: "Days 13–14",
    title: "Send, follow up, decide",
    description:
      "Finish two applications live, write a follow-up that is not pushy, and compare an offer against the role you actually want. We close with a 1:1 review slot for every participant.",
    tags: ["Live applications", "Follow-up scripts", "1:1 review"],
  },
];

export const modules = [
  {
    id: "module-foundation",
    title: "Module 01 · Reading the market",
    copy:
      "Four sessions on how hiring actually works: who screens first, what a recruiter can and cannot see, and how to tell a real role from a recycled listing.",
    sessions: [
      { label: "Session 1", detail: "How an application travels · 90 min" },
      { label: "Session 2", detail: "JD teardown, live · 90 min" },
      { label: "Session 3", detail: "Employer research without guesswork · 60 min" },
      { label: "Session 4", detail: "Build your target list · 60 min" },
    ],
  },
  {
    id: "module-documents",
    title: "Module 02 · Documents that survive",
    copy:
      "Resume, cover note and the two lines you paste into a referral. Everything is built inside the free resume editor, so nothing is lost in a template you cannot reopen.",
    sessions: [
      { label: "Session 5", detail: "Resume structure and ATS basics · 90 min" },
      { label: "Session 6", detail: "Rewriting duties as outcomes · 90 min" },
      { label: "Session 7", detail: "Cover notes that are not essays · 60 min" },
      { label: "Session 8", detail: "Peer review in pairs · 60 min" },
    ],
  },
  {
    id: "module-interview",
    title: "Module 03 · The interview room",
    copy:
      "A practice-heavy module. You will answer out loud, be interrupted, recover, and answer again. The rubric is shared before the first mock, not after.",
    sessions: [
      { label: "Session 9", detail: "The 60-second introduction · 90 min" },
      { label: "Session 10", detail: "Behavioural questions with STAR · 90 min" },
      { label: "Session 11", detail: "Mock interview, recorded · 90 min" },
      { label: "Session 12", detail: "Feedback and second attempt · 60 min" },
    ],
  },
  {
    id: "module-offer",
    title: "Module 04 · From reply to offer",
    copy:
      "The unglamorous part: follow-ups, salary questions, notice periods and the offer you should decline. Scripts are provided, but you write your own version.",
    sessions: [
      { label: "Session 13", detail: "Follow-up scripts and timing · 60 min" },
      { label: "Session 14", detail: "Salary and offer basics · 90 min" },
      { label: "Session 15", detail: "Live applications, supported · 90 min" },
      { label: "Session 16", detail: "1:1 review and next steps · 30 min each" },
    ],
  },
];

export const mentors = [
  {
    id: "mentor-1",
    initials: "AR",
    name: "A. Rao",
    role: "Lead mentor · Talent acquisition",
    bio: "Nine years hiring for support and operations teams. Reviews resumes line by line and will tell you when a bullet says nothing.",
  },
  {
    id: "mentor-2",
    initials: "SK",
    name: "S. Khan",
    role: "Interview coach",
    bio: "Runs the recorded mock interviews. Specialises in candidates returning after a break and first-time interviewees.",
  },
  {
    id: "mentor-3",
    initials: "MD",
    name: "M. Desai",
    role: "Resume and ATS reviewer",
    bio: "Builds the resume rubrics and the ATS scoring used in the editor. Prefers plain language to keyword stuffing.",
  },
];

export const outcomes = [
  "A resume you can send the same week",
  "Two target roles with honest evidence",
  "A recorded mock interview",
  "A follow-up script in your own words",
  "An offer-comparison checklist",
  "A 1:1 review with a mentor",
];

export const checklist = [
  "Eight live sessions with a mentor, not pre-recorded lectures.",
  "The resume editor and all practice tools included, permanently free.",
  "A peer review partner and a written feedback sheet.",
  "Recordings for seven days if you miss a session.",
  "A 30-minute 1:1 review in the final week.",
  "No fee, no card, no hidden upsell.",
];

export const faqs = [
  {
    id: "training-faq-fee",
    question: "Is the cohort really free?",
    answer:
      "Yes. There is no fee, no deposit and no paid upgrade. We ask for your time and honest participation. If anyone asks you to pay to join a Jobs Mania cohort, report it through the contact page.",
  },
  {
    id: "training-faq-attend",
    question: "What happens if I miss a session?",
    answer:
      "Recordings stay available for seven days. The peer review and mock interview need a live partner, so those two sessions are rearranged rather than recorded. Tell a mentor early and it is usually fixable.",
  },
  {
    id: "training-faq-place",
    question: "Does this guarantee a job or an interview?",
    answer:
      "No. Training improves how you apply; it cannot promise an employer's decision. We do not claim placement outcomes from a cohort, and no certificate is issued.",
  },
  {
    id: "training-faq-who",
    question: "Who is this not for?",
    answer:
      "If you already have a current, tailored resume and have interviewed in the last three months, the free practice tools and a 1:1 review may be a better use of your time than a full cohort.",
  },
  {
    id: "training-faq-device",
    question: "What do I need to join?",
    answer:
      "A phone or laptop, a stable connection, and a way to open a shared document. No software purchase is required. Sessions run in a browser.",
  },
];

export const TRAINING_STATUS = {
  open: { label: "Enrolment open", badge: "ed-badge ed-badge--solid" },
  waitlist: { label: "Waitlist only", badge: "ed-badge" },
  "not-open": { label: "Details to be confirmed", badge: "ed-badge" },
};

/**
 * Kept for older imports: the cohort page renders one programme, not a list.
 */
export function getVisiblePrograms() {
  return [cohort];
}
