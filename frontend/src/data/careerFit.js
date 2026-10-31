/**
 * careerFit.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Five-question career-fit quiz. Each option contributes to one direction; the
 * result is a starting point for a conversation, not a psychological assessment
 * and not a promise of a salary.
 *
 * Salary bands are indicative entry-level ranges for India and must be checked
 * against live market data before publication.
 */

export const fitQuestions = [
  {
    id: "fit-01",
    prompt: "Which part of a workday would you happily repeat?",
    options: [
      { label: "Solving a customer's problem, step by step.", cluster: "support" },
      { label: "Talking to new people and pitching something.", cluster: "sales" },
      { label: "Finding the pattern inside a messy spreadsheet.", cluster: "data" },
      { label: "Building or fixing the tool itself.", cluster: "tech" },
    ],
  },
  {
    id: "fit-02",
    prompt: "A task lands with unclear instructions. What do you do first?",
    options: [
      { label: "Ask what “done” looks like, then follow the steps.", cluster: "support" },
      { label: "Try a quick approach and adjust from the reaction.", cluster: "sales" },
      { label: "Look for the data that explains the request.", cluster: "data" },
      { label: "Test a solution and debug what breaks.", cluster: "tech" },
    ],
  },
  {
    id: "fit-03",
    prompt: "Which compliment would mean the most to you?",
    options: [
      { label: "“That customer felt genuinely taken care of.”", cluster: "support" },
      { label: "“You could sell water to a well.”", cluster: "sales" },
      { label: "“You spotted the number everyone else missed.”", cluster: "data" },
      { label: "“You made it work when nothing did.”", cluster: "tech" },
    ],
  },
  {
    id: "fit-04",
    prompt: "Pick the rhythm you would rather work in.",
    options: [
      { label: "A clear queue, a defined shift, a clean handover.", cluster: "support" },
      { label: "Targets, conversations and a scoreboard.", cluster: "sales" },
      { label: "Deep focus, reports and a quiet hour.", cluster: "data" },
      { label: "Sprints, building and solving new failures.", cluster: "tech" },
    ],
  },
  {
    id: "fit-05",
    prompt: "It is a free weekend. What are you curious enough to learn?",
    options: [
      { label: "How to handle a difficult conversation.", cluster: "support" },
      { label: "How to negotiate or present an idea.", cluster: "sales" },
      { label: "SQL, or modelling in a spreadsheet.", cluster: "data" },
      { label: "A programming language or a new tool.", cluster: "tech" },
    ],
  },
];

export const fitClusters = {
  support: {
    key: "support",
    name: "Customer support & operations",
    short: "Support",
    summary:
      "You are drawn to clear problems, real people and a job finished properly. Entry-level support and operations roles reward patience, written clarity and reliable handovers — and they are the fastest route into almost every other team.",
    salary: "₹2.4–4.8 LPA",
    demand: "High demand",
    demandTone: "Steady hiring across BPO, SaaS and e-commerce",
    roles: [
      { name: "Customer Support Executive (voice / chat)", pay: "₹2.4–3.6 LPA" },
      { name: "Operations Associate", pay: "₹2.8–4.2 LPA" },
      { name: "Back Office / MIS Assistant", pay: "₹2.4–3.8 LPA" },
    ],
    roadmap: [
      {
        title: "Build the vocabulary",
        desc: "Read ten support job ads and list the five phrases that repeat. Learn what SLA, escalation and CSAT actually mean.",
        tag: "Week 1",
      },
      {
        title: "Prove written clarity",
        desc: "Write two sample replies to an angry customer. Keep them under 120 words and end with a clear next step.",
        tag: "Week 2",
      },
      {
        title: "Practise the interview",
        desc: "Record a 60-second introduction and one “tell me about a difficult customer” answer. Re-record once.",
        tag: "Week 3",
      },
      {
        title: "Apply in small batches",
        desc: "Five tailored applications, then follow up once. Track replies instead of volume.",
        tag: "Week 4",
      },
    ],
    skills: ["Written clarity", "Empathy under pressure", "Ticketing tools", "Escalation judgement"],
  },
  sales: {
    key: "sales",
    name: "Sales & growth",
    short: "Sales",
    summary:
      "You like momentum, conversation and a visible score. Inside sales and business development reward resilience and structure — not volume alone. The strongest entry-level candidates can explain what they learned from a no.",
    salary: "₹3.0–6.0 LPA + incentives",
    demand: "High demand",
    demandTone: "Consistent openings in SaaS, edtech and BPO",
    roles: [
      { name: "Inside Sales Executive", pay: "₹3.0–4.8 LPA + incentives" },
      { name: "Sales Development Representative", pay: "₹3.6–6.0 LPA" },
      { name: "Business Development Associate", pay: "₹3.0–5.2 LPA" },
    ],
    roadmap: [
      {
        title: "Know the product story",
        desc: "Pick one company you would actually work for. Write its product, buyer and one reason someone says no.",
        tag: "Week 1",
      },
      {
        title: "Build a call skeleton",
        desc: "Opening, permission, two discovery questions, one next step. Keep it under 90 seconds.",
        tag: "Week 2",
      },
      {
        title: "Run five real conversations",
        desc: "Practise with a friend or a mentor. Ask for one specific piece of feedback after each call.",
        tag: "Week 3",
      },
      {
        title: "Show a number",
        desc: "Track attempts, replies and meetings. Bring the numbers to the interview — process beats bravado.",
        tag: "Week 4",
      },
    ],
    skills: ["Structured questioning", "Objection handling", "CRM hygiene", "Follow-up discipline"],
  },
  data: {
    key: "data",
    name: "Data & reporting",
    short: "Data",
    summary:
      "You trust evidence and enjoy making a messy sheet make sense. Reporting and MIS roles are a realistic first step into analytics: start with spreadsheets and SQL, then earn the right to model.",
    salary: "₹2.8–5.5 LPA",
    demand: "Steady demand",
    demandTone: "MIS and reporting roles across every sector",
    roles: [
      { name: "MIS Executive", pay: "₹2.8–4.2 LPA" },
      { name: "Data / Reporting Analyst (entry)", pay: "₹3.6–5.5 LPA" },
      { name: "Operations Data Coordinator", pay: "₹2.8–4.0 LPA" },
    ],
    roadmap: [
      {
        title: "Master one spreadsheet tool",
        desc: "Lookups, pivots, clean formatting and one chart that answers a question. No course certificate needed.",
        tag: "Weeks 1–2",
      },
      {
        title: "Learn just enough SQL",
        desc: "SELECT, WHERE, GROUP BY, JOIN. Write ten queries against a free sample database.",
        tag: "Week 3",
      },
      {
        title: "Publish one small analysis",
        desc: "Take a public dataset, answer one question, and show the working. A single honest chart beats a dashboard.",
        tag: "Week 4",
      },
      {
        title: "Translate it for a non-analyst",
        desc: "Explain the finding in three sentences without jargon. That is the interview.",
        tag: "Week 5",
      },
    ],
    skills: ["Spreadsheet fluency", "SQL basics", "Data cleaning", "Plain-language explanation"],
  },
  tech: {
    key: "tech",
    name: "Tech & product support",
    short: "Tech",
    summary:
      "You want to understand how the thing works and fix it when it does not. Product support and QA are strong entry points into tech that reward curiosity, reproduction steps and clear bug reports.",
    salary: "₹3.6–8.0 LPA",
    demand: "Rising demand",
    demandTone: "Product support, QA and junior engineering",
    roles: [
      { name: "Product Support Engineer", pay: "₹3.6–6.0 LPA" },
      { name: "QA / Test Associate", pay: "₹3.2–5.4 LPA" },
      { name: "Junior Frontend Developer", pay: "₹4.0–8.0 LPA" },
    ],
    roadmap: [
      {
        title: "Pick one stack",
        desc: "HTML, CSS and JavaScript are enough to start. Finish one small project instead of five tutorials.",
        tag: "Weeks 1–3",
      },
      {
        title: "Learn to reproduce a bug",
        desc: "Write steps, expected result, actual result, environment. This one habit separates good support hires.",
        tag: "Week 3",
      },
      {
        title: "Read someone else's code",
        desc: "Open a small repository issue, understand it, and explain the cause in plain language.",
        tag: "Week 4",
      },
      {
        title: "Ship and explain",
        desc: "Deploy one project and write a short README. The explanation matters as much as the build.",
        tag: "Week 5",
      },
    ],
    skills: ["Debugging method", "Clear bug reports", "One language", "Version control basics"],
  },
};

export const fitOrder = ["support", "sales", "data", "tech"];

export function getFitResult(answers) {
  const tally = Object.fromEntries(fitOrder.map((key) => [key, 0]));
  answers.forEach((cluster) => {
    if (cluster && tally[cluster] !== undefined) tally[cluster] += 1;
  });
  const ranked = [...fitOrder].sort((a, b) => tally[b] - tally[a]);
  const top = ranked[0];
  return {
    cluster: fitClusters[top],
    tally,
    confidence: Math.round((tally[top] / Math.max(answers.length, 1)) * 100),
  };
}

export const successStories = [
  {
    quote:
      "The quiz pointed me at operations, which I had dismissed as ‘not a real career’. Six weeks later I was handling escalations for a SaaS team.",
    name: "Ritika B.",
    role: "Operations Associate · sample story",
    tag: "Operations",
  },
  {
    quote:
      "I thought I needed a coding degree. The roadmap showed me product support first — and that is where I actually got hired.",
    name: "Sameer V.",
    role: "Product Support Engineer · sample story",
    tag: "Product support",
  },
  {
    quote:
      "The counsellor did not tell me what to do. She asked which part of my current job I never complained about. That was the answer.",
    name: "Farah N.",
    role: "MIS Executive · sample story",
    tag: "Data",
  },
];
