/**
 * practiceToolCatalog.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The tool hub catalogue and its extra question banks. Every tool below is
 * playable in the browser; nothing is uploaded. Typing and English/computer
 * banks come from practiceQuestions.js.
 *
 * Keep answers factually correct. These are practice drills, never a
 * certification or an assessment an employer receives.
 */

import { computerQuestions, englishQuestions } from "./practiceQuestions";

export const TOOL_CATEGORIES = ["All", "Aptitude", "Coding", "Interview", "Typing", "English", "Mock Tests"];

export const aptitudeQuestions = [
  {
    id: "ap-01",
    question: "A role pays ₹18,000 a month. After a 12% hike, what is the new monthly pay?",
    options: ["₹20,160", "₹20,000", "₹19,800", "₹21,600"],
    answer: 0,
    explanation: "12% of 18,000 is 2,160. Add it to the original: 18,000 + 2,160 = 20,160.",
  },
  {
    id: "ap-02",
    question: "Two numbers are in the ratio 3:5 and add up to 64. What is the smaller number?",
    options: ["24", "20", "32", "28"],
    answer: 0,
    explanation: "There are 8 equal parts. One part is 8, so the smaller number is 3 × 8 = 24.",
  },
  {
    id: "ap-03",
    question: "What is the average of 12, 18, 24 and 30?",
    options: ["21", "20", "22", "24"],
    answer: 0,
    explanation: "12 + 18 + 24 + 30 = 84. Divide by 4 to get 21.",
  },
  {
    id: "ap-04",
    question: "Continue the series: 2, 6, 12, 20, 30, ?",
    options: ["42", "40", "44", "36"],
    answer: 0,
    explanation: "The gaps grow by 2: +4, +6, +8, +10, +12. So 30 + 12 = 42.",
  },
  {
    id: "ap-05",
    question: "Six workers finish a task in 10 days. At the same rate, how long will four workers take?",
    options: ["15 days", "12 days", "18 days", "20 days"],
    answer: 0,
    explanation: "The work is 60 worker-days. At four workers: 60 ÷ 4 = 15 days.",
  },
  {
    id: "ap-06",
    question: "An item bought for ₹800 is sold for ₹920. What is the profit percentage?",
    options: ["15%", "12%", "20%", "18%"],
    answer: 0,
    explanation: "Profit is ₹120. 120 ÷ 800 = 0.15, which is 15%.",
  },
  {
    id: "ap-07",
    question: "You face north. Turn right, right again, then left. Which direction are you facing?",
    options: ["East", "South", "West", "North"],
    answer: 0,
    explanation: "North → right = east → right = south → left = east.",
  },
  {
    id: "ap-08",
    question: "What is 45% of 240?",
    options: ["108", "96", "112", "120"],
    answer: 0,
    explanation: "10% is 24, so 40% is 96. Half of 10% is 12, so 45% is 96 + 12 = 108.",
  },
];

export const codingQuestions = [
  {
    id: "cd-01",
    question: "What does this output?\n\nlet total = 0;\nfor (let i = 1; i <= 4; i++) total += i;\nprint(total);",
    options: ["10", "6", "4", "15"],
    answer: 0,
    explanation: "The loop adds 1 + 2 + 3 + 4, so the total is 10.",
  },
  {
    id: "cd-02",
    question: "What does [1, 2, 3].map(x => x * 2) produce?",
    options: ["[2, 4, 6]", "[1, 4, 9]", "[3, 6, 9]", "[2, 3, 6]"],
    answer: 0,
    explanation: "map returns a new array with each value doubled; the original array is unchanged.",
  },
  {
    id: "cd-03",
    question: 'What does this SQL return?\n\nSELECT COUNT(*) FROM applications\nWHERE status = \'shortlisted\';',
    options: [
      "The number of shortlisted applications",
      "Every shortlisted application row",
      "The status column only",
      "An error, because COUNT needs a column name",
    ],
    answer: 0,
    explanation: "COUNT(*) counts matching rows. Removing COUNT would return the rows themselves.",
  },
  {
    id: "cd-04",
    question:
      "A loop is meant to print 0, 1, 2, 3, 4. Which version is correct?\n\nA: for (i = 1; i < 4; i++)\nB: for (i = 0; i < 5; i++)\nC: for (i = 0; i <= 4; i--)\nD: for (i = 5; i > 0; i--)",
    options: ["B", "A", "C", "D"],
    answer: 0,
    explanation: "Starting at 0 and stopping below 5 prints exactly 0 through 4. C never ends because i decreases.",
  },
  {
    id: "cd-05",
    question: "What does f(4) return?\n\nfunction f(n) {\n  if (n <= 1) return 1;\n  return n * f(n - 1);\n}",
    options: ["24", "12", "16", "4"],
    answer: 0,
    explanation: "This computes 4 × 3 × 2 × 1 = 24.",
  },
  {
    id: "cd-06",
    question: "A search function returns -1 when the value is missing. What should the caller do first?",
    options: [
      "Check for -1 before using the index",
      "Use -1 as an array index",
      "Assume the value exists",
      "Convert -1 to 0",
    ],
    answer: 0,
    explanation: "Using -1 as an index reads the wrong element. Check the sentinel value before continuing.",
  },
];

export const interviewQuestions = [
  {
    id: "iv-01",
    question: "The interviewer asks about a missed deadline. Which opening is strongest?",
    options: [
      "Name the situation, the cause and what you changed next time — briefly.",
      "Explain that the deadline was unrealistic and the manager was unclear.",
      "Say you have never missed a deadline.",
      "Apologise repeatedly before describing the task.",
    ],
    answer: 0,
    explanation: "Context, ownership, correction. Blame and perfection claims both cost credibility.",
  },
  {
    id: "iv-02",
    question: "You do not know the answer to a technical question. What is the best response?",
    options: [
      "Say what you do know, how you would find the answer, and what you would check first.",
      "Guess confidently and hope it is close.",
      "Say the question is not relevant to the role.",
      "Stay silent until they move on.",
    ],
    answer: 0,
    explanation: "Interviewers test reasoning, not recall. A clear method is a better answer than a bluff.",
  },
  {
    id: "iv-03",
    question: "What makes 'Why do you want this role?' land well?",
    options: [
      "Connect one specific part of the work to something you have actually done.",
      "Say you need a job and this one is close to home.",
      "Praise the company's glassdoor rating.",
      "Say you are flexible and will do anything.",
    ],
    answer: 0,
    explanation: "Specific evidence beats flattery. It shows you read the role and can picture yourself in it.",
  },
  {
    id: "iv-04",
    question: "The interviewer goes quiet after your answer. What should you do?",
    options: [
      "Wait a moment, then ask if they would like a specific example.",
      "Fill the silence with a second, longer answer.",
      "Repeat the answer more loudly.",
      "Apologise for the answer.",
    ],
    answer: 0,
    explanation: "Silence is often note-taking. A short check-in is calmer than filling the space.",
  },
  {
    id: "iv-05",
    question: "You are asked about a six-month gap in your resume. Best approach?",
    options: [
      "State the reason plainly, what you did during it, and that you are ready now.",
      "Say you were travelling and change the subject.",
      "Give a different date range to avoid the gap.",
      "Say personal reasons and decline to say anything else.",
    ],
    answer: 0,
    explanation: "A brief, honest answer with a forward step closes the topic. Hiding dates is a reference-check risk.",
  },
  {
    id: "iv-06",
    question: "At the end: 'Do you have questions for us?' Which question is strongest?",
    options: [
      "What does success look like in the first 90 days?",
      "How soon will I be promoted?",
      "Can you guarantee I will not work weekends?",
      "Is there anything else you need from me?",
    ],
    answer: 0,
    explanation: "It is specific to the role and signals you are already thinking about doing the work.",
  },
];

export const emailQuestions = [
  {
    id: "em-01",
    question: "Which subject line is clearest for a follow-up after an interview?",
    options: [
      "Thank you — Customer Support interview, 14 Nov",
      "Following up",
      "URGENT: please read",
      "Hello",
    ],
    answer: 0,
    explanation: "A specific subject tells the reader who, what and when before opening the message.",
  },
  {
    id: "em-02",
    question: "You need to reply to a recruiter who copied three colleagues. What is safest?",
    options: [
      "Reply to the recruiter and keep the relevant colleagues copied only if they need the information.",
      "Reply all every time so nobody feels left out.",
      "Remove everyone and reply only to the recruiter.",
      "Start a new thread with a new subject.",
    ],
    answer: 0,
    explanation: "Copy only people who need the answer. Reply-all noise is a common workplace complaint.",
  },
  {
    id: "em-03",
    question: "You are sending a resume attachment. What should the filename be?",
    options: [
      "Priya-Sharma-Customer-Support-Resume.pdf",
      "resume final final (2).pdf",
      "CV.pdf",
      "document.pdf",
    ],
    answer: 0,
    explanation: "Name, role and document type help a recruiter find the file again in a crowded inbox.",
  },
  {
    id: "em-04",
    question: "Which closing is appropriate for a formal application email?",
    options: [
      "Kind regards,\nPriya Sharma\n+91 …",
      "Cheers,\nPriya",
      "Sent from my iPhone",
      "Bye!",
    ],
    answer: 0,
    explanation: "A neutral sign-off plus contact details is safe in a formal context.",
  },
  {
    id: "em-05",
    question: "You cannot meet the requested deadline. What should the email say?",
    options: [
      "Acknowledge the date, explain the constraint briefly, and propose a specific new time.",
      "Say nothing until the deadline passes.",
      "Ask for an extension without a new date.",
      "Send the incomplete work without comment.",
    ],
    answer: 0,
    explanation: "Early, specific communication preserves trust. A new date makes the message actionable.",
  },
  {
    id: "em-06",
    question: "Before sending an application email, what is the highest-value final check?",
    options: [
      "Verify the recipient, the role name and the attachment.",
      "Change the font to something more modern.",
      "Add three more paragraphs about yourself.",
      "Send it twice to be sure.",
    ],
    answer: 0,
    explanation: "A wrong recipient or missing attachment is unrecoverable; formatting is cosmetic.",
  },
];

const mixedQuestions = [
  ...aptitudeQuestions.slice(0, 3),
  ...englishQuestions.slice(0, 3),
  ...codingQuestions.slice(0, 3),
  ...interviewQuestions.slice(0, 3),
];

export const PRACTICE_TOOL_CATALOG = [
  {
    id: "aptitude-quickfire",
    name: "Aptitude Quickfire",
    category: "Aptitude",
    type: "quiz",
    questions: aptitudeQuestions,
    difficulty: "Starter",
    minutes: 6,
    blurb: "Percentages, ratios and number series at the pace of a real screening round.",
    wide: true,
  },
  {
    id: "typing-sprint",
    name: "Typing Sprint",
    category: "Typing",
    type: "typing",
    difficulty: "Starter",
    minutes: 1,
    blurb: "Sixty seconds against a work-realistic passage. Speed and accuracy, no upload.",
  },
  {
    id: "english-essentials",
    name: "English Essentials",
    category: "English",
    type: "quiz",
    questions: englishQuestions,
    difficulty: "Core",
    minutes: 8,
    blurb: "Grammar, vocabulary and the usage mistakes that quietly cost interviews.",
  },
  {
    id: "logic-coding",
    name: "Logic & Coding",
    category: "Coding",
    type: "quiz",
    questions: codingQuestions,
    difficulty: "Stretch",
    minutes: 10,
    blurb: "Pseudocode, loops and one SQL question. Language-agnostic on purpose.",
  },
  {
    id: "interview-scenarios",
    name: "Interview Scenarios",
    category: "Interview",
    type: "quiz",
    questions: interviewQuestions,
    difficulty: "Core",
    minutes: 9,
    blurb: "Six awkward moments and the strongest response to each one.",
  },
  {
    id: "mock-mixed",
    name: "Mixed Mock Test",
    category: "Mock Tests",
    type: "quiz",
    questions: mixedQuestions,
    difficulty: "Stretch",
    minutes: 14,
    blurb: "A twelve-question mix that finds the weak spot you did not expect.",
    wide: true,
  },
  {
    id: "email-etiquette",
    name: "Email Etiquette",
    category: "English",
    type: "quiz",
    questions: emailQuestions,
    difficulty: "Starter",
    minutes: 6,
    blurb: "Subject lines, tone and the reply-all mistake everyone has made once.",
  },
  {
    id: "computer-basics",
    name: "Computer Basics",
    category: "Mock Tests",
    type: "quiz",
    questions: computerQuestions,
    difficulty: "Starter",
    minutes: 7,
    blurb: "Files, shortcuts and the everyday software most entry roles assume.",
  },
];
