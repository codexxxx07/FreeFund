/**
 * atsScore.js
 * ─────────────────────────────────────────────────────────────────────────────
 * A transparent, local resume checklist. It is deliberately heuristic — it is
 * not a real ATS and does not claim to predict an employer's system. The score
 * exists to point at missing evidence, not to grade a person.
 */

function text(value) {
  return String(value || "").trim();
}

function bullets(description) {
  return text(description)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function computeAtsScore(data) {
  const checks = [];
  const summary = text(data.summary);
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const education = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const credentials = Array.isArray(data.credentials) ? data.credentials : [];

  function add(id, label, points, earned, tip) {
    checks.push({ id, label, points, earned: earned ? points : 0, passed: Boolean(earned), tip });
  }

  add("name", "Name present", 10, Boolean(text(data.fullName)), "Add your full name at the top.");
  add(
    "email",
    "Email present",
    10,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(data.email)),
    "Add a professional email address.",
  );
  add("phone", "Phone number", 5, Boolean(text(data.phone)), "Add a phone number a recruiter can reach.");
  add(
    "title",
    "Target role title",
    5,
    Boolean(text(data.jobTitle)),
    "Add the role title you are targeting under your name.",
  );
  add(
    "summary",
    "Summary of 40+ words",
    15,
    summary.split(/\s+/).filter(Boolean).length >= 40,
    "Write a 3–4 line summary: who you are, what you do, what you want next.",
  );
  add(
    "experience",
    "At least one experience entry",
    10,
    experience.some((entry) => text(entry.role) || text(entry.company)),
    "Add a role, internship or substantial project.",
  );
  add(
    "dates",
    "Dates on every role",
    5,
    experience.length > 0 && experience.every((entry) => text(entry.start) || text(entry.end)),
    "Add a start and end date to each experience entry.",
  );
  add(
    "bullets",
    "Two or more bullet points",
    5,
    experience.some((entry) => bullets(entry.description).length >= 2),
    "Use two or three bullet points per role instead of a paragraph.",
  );
  add(
    "numbers",
    "One measurable result",
    10,
    experience.some((entry) => bullets(entry.description).some((line) => /\d/.test(line))),
    "Add one honest number: calls handled, records processed, shifts covered.",
  );
  add(
    "education",
    "Education entry",
    10,
    education.some((entry) => text(entry.school) || text(entry.degree)),
    "Add your qualification and institution.",
  );
  add("skills", "Five or more skills", 10, skills.length >= 5, "List at least five skills from the job ads you want.");
  add(
    "projects",
    "Project or certification",
    5,
    projects.length > 0 || credentials.length > 0,
    "Add a project or certification if you have one.",
  );

  const earned = checks.reduce((sum, check) => sum + check.earned, 0);
  const total = checks.reduce((sum, check) => sum + check.points, 0);
  const score = Math.round((earned / total) * 100);

  return {
    score,
    tips: checks
      .filter((check) => !check.passed && check.tip)
      .map((check) => check.tip)
      .slice(0, 4),
    checks,
  };
}

export function atsVerdict(score) {
  if (score >= 85) return "Strong foundation";
  if (score >= 60) return "Usable, not yet sharp";
  if (score >= 35) return "Needs evidence";
  return "Start with the basics";
}
