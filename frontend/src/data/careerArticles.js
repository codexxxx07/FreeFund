/**
 * Career guidance articles.
 * ─────────────────────────────────────────────────────────────────────────────
 * Local structured content for /career-guidance. Edit or add entries here —
 * the article list, category filter and article template all read from this
 * file, so no CMS or backend is required.
 *
 * Keep advice practical and generic. Do not publish company-specific claims,
 * invented statistics, or promises of employment.
 */

export const CAREER_CATEGORIES = [
  "Resume Writing",
  "Job Search",
  "Interview Preparation",
  "Professional Communication",
  "Workplace Readiness",
  "Entry-Level Careers",
];

export const careerArticles = [
  {
    slug: "resume-structure-that-gets-read",
    title: "A resume structure that recruiters can scan in six seconds",
    category: "Resume Writing",
    readMinutes: 5,
    summary:
      "Order, spacing and headings decide whether a recruiter keeps reading. Build a single-column, clearly labelled resume before you worry about design.",
    sections: [
      {
        heading: "Lead with the facts a recruiter checks first",
        body: "Most recruiters scan in the same order: name and contact details, current or most recent role, education, then skills. Anything they cannot find in that pass is usually ignored.",
        bullets: [
          "Put your name, phone number, email and city at the top — no header images.",
          "Show the role title, organisation and dates for each experience entry.",
          "Keep it to one page if you have under eight years of experience.",
        ],
      },
      {
        heading: "Use plain section headings",
        body: "Headings such as Experience, Education, Skills and Projects are understood instantly by both people and screening software. Creative headings force the reader to work out what you mean.",
        bullets: [
          "Write experience entries as one line of context plus two or three result-focused points.",
          "Start each point with an action word: handled, built, resolved, scheduled, increased.",
          "Quantify where you honestly can: shifts covered, calls handled, records processed.",
        ],
      },
      {
        heading: "Skip the decoration",
        body: "Columns, graphs, profile photos and skill charts often break when a resume is parsed or printed. A clean single column of text reads correctly everywhere.",
      },
    ],
  },
  {
    slug: "tailor-your-resume-to-the-job",
    title: "How to tailor your resume to a job description in ten minutes",
    category: "Resume Writing",
    readMinutes: 4,
    summary:
      "Matching the language of the job description is the fastest improvement you can make — without keyword stuffing or inventing experience.",
    sections: [
      {
        heading: "Pull the vocabulary from the listing",
        body: "Copy the five most repeated nouns and verbs from the job description into a notepad. Those are the terms the recruiter is scanning for, and they are usually the ones already used by the employer.",
        bullets: [
          "If the listing says customer support, do not write client servicing.",
          "If it names a tool you have genuinely used, place it in your skills and experience lines.",
          "Mirror the employment type and work mode wording exactly.",
        ],
      },
      {
        heading: "Reorder rather than rewrite",
        body: "Move the most relevant experience and projects to the top and cut anything that does not support this application. Tailoring is mostly reordering and removing.",
        warnings: [
          "Never claim a skill you do not have — interviews test every line of the resume.",
        ],
      },
      {
        heading: "Keep one honest master version",
        body: "Maintain a full resume with everything you have done, then save a tailored copy for each application. That way you never lose experience while still sending a focused document.",
      },
    ],
  },
  {
    slug: "job-search-strategy-for-freshers",
    title: "A job search routine that works when you have no experience yet",
    category: "Job Search",
    readMinutes: 5,
    summary:
      "Consistency beats intensity. A fixed daily routine of short, targeted applications produces more interviews than mass-sending one resume.",
    sections: [
      {
        heading: "Define the roles you are actually eligible for",
        body: "Read ten real listings for the role you want and note what they require. That list becomes your target: the skills you already meet and the two or three gaps worth closing quickly.",
        bullets: [
          "Filter by experience level and work mode so you stop applying to mismatched roles.",
          "Keep a simple tracker: role, company, date applied, next step.",
        ],
      },
      {
        heading: "Set a repeatable daily quota",
        body: "A sustainable routine is easier to keep than a burst of effort. Choose a number you can hit every working day.",
        bullets: [
          "Five tailored applications a day, each with a matching resume.",
          "One hour of skill practice linked to the roles you want.",
          "Thirty minutes responding to recruiter messages and following up.",
        ],
      },
      {
        heading: "Follow up politely, then move on",
        body: "One follow-up a week after applying is reasonable. After two weeks without a reply, record it as closed and spend that time on the next opportunity.",
      },
    ],
  },
  {
    slug: "verify-a-job-offer-before-you-apply",
    title: "How to verify a job offer before you share any personal information",
    category: "Job Search",
    readMinutes: 4,
    summary:
      "Genuine employers never ask you to pay to get a job. A few quick checks protect you from recruitment fraud.",
    sections: [
      {
        heading: "Red flags to stop for",
        body: "Treat any of these as a reason to pause and verify before continuing.",
        bullets: [
          "A request for money, a deposit, a training fee, or a purchase to start work.",
          "Requests for an OTP, bank password, card number, or payment app credentials.",
          "Pressure to act immediately, or an offer with no interview at all.",
          "A job ID that does not exist on the official careers page you are applying through.",
        ],
      },
      {
        heading: "Checks that take two minutes",
        body: "Confirm the role exists on the employer's own website, verify the recruiter's email domain matches the company, and search the company name together with the word scam to see whether others have reported it.",
      },
      {
        heading: "What to do if something looks wrong",
        body: "Stop replying, keep screenshots of the conversation, and report the listing through the platform where you found it. Never send further details to test whether the contact is real.",
      },
    ],
  },
  {
    slug: "prepare-for-a-first-round-interview",
    title: "Preparing for a first-round interview when you are short on time",
    category: "Interview Preparation",
    readMinutes: 5,
    summary:
      "A first round is usually a fit check. Prepare three stories, know the job description, and rehearse saying them out loud.",
    sections: [
      {
        heading: "Read the job description line by line",
        body: "Number each requirement on the listing and beside each one write a short example from your studies, work or volunteering. Anything you cannot evidence is something to practise talking around honestly.",
        bullets: [
          "Prepare one example per major requirement — three is usually enough.",
          "Say each example out loud; reading silently is not rehearsal.",
        ],
      },
      {
        heading: "Expect the standard questions",
        body: "First rounds rarely contain surprises. Rehearse short, structured answers for the questions you will almost certainly be asked.",
        bullets: [
          "Tell me about yourself — 60 seconds: present, past, why this role.",
          "Why this company and this role?",
          "What is your biggest strength, and a weakness you are working on?",
          "Do you have any questions for us?",
        ],
      },
      {
        heading: "Logistics matter more than you think",
        body: "Test your camera and microphone the day before, keep your resume open in another window, and join video calls two minutes early. For in-person interviews, plan the route and reach the building ten minutes ahead.",
      },
    ],
  },
  {
    slug: "star-method-for-behavioural-questions",
    title: "Using the STAR method to answer behavioural questions",
    category: "Interview Preparation",
    readMinutes: 4,
    summary:
      "Situation, Task, Action, Result turns a vague story into a clear, two-minute answer that shows what you actually did.",
    sections: [
      {
        heading: "The four parts",
        body: "Structure keeps you from rambling and gives the interviewer a reason to remember you.",
        bullets: [
          "Situation — one sentence of context: where and when.",
          "Task — what you were responsible for.",
          "Action — the specific steps you took, using I rather than we.",
          "Result — what changed, ideally with a number or a clear outcome.",
        ],
      },
      {
        heading: "Prepare four stories in advance",
        body: "Four well-rehearsed stories can answer most behavioural questions. Choose a problem you solved, a deadline you met, a disagreement you handled, and a mistake you learned from.",
        warnings: [
          "If the result was negative, end on what you changed afterwards — interviews value self-correction.",
        ],
      },
      {
        heading: "Keep each answer under two minutes",
        body: "Aim for about 250 words. Long answers lose interviewers before the result arrives, and you can always be asked for more detail.",
      },
    ],
  },
  {
    slug: "professional-email-etiquette",
    title: "Professional email etiquette for job applications and the workplace",
    category: "Professional Communication",
    readMinutes: 4,
    summary:
      "Clear subject lines, a proper greeting and a single ask make your emails easier to answer — and easier to remember positively.",
    sections: [
      {
        heading: "Write the subject line first",
        body: "A subject that names the purpose saves the recipient from guessing. Include a reference number if you were given one.",
        bullets: [
          "Application: Customer Support Associate — Job ID BLR-002",
          "Question about interview timing — 14 October",
          "Follow-up: documents submitted on 12 October",
        ],
      },
      {
        heading: "Structure the body",
        body: "Open with who you are and why you are writing in one line, put the detail in the middle, and close with the specific action you need and by when.",
        bullets: [
          "Use a formal greeting for first contact: Dear Mr Sharma or Dear Hiring Team.",
          "Keep paragraphs to two or three lines.",
          "Proofread the greeting and the attachments before pressing send.",
        ],
      },
      {
        heading: "Timing and tone",
        body: "Send during working hours, reply within one working day, and avoid all caps or exclamation marks. If you are annoyed, draft the reply and reread it an hour later before sending.",
      },
    ],
  },
  {
    slug: "messaging-professionally-on-chat",
    title: "Messaging professionally on WhatsApp and workplace chat",
    category: "Professional Communication",
    readMinutes: 3,
    summary:
      "Chat is quick, not casual. Short messages, proper greetings and reasonable hours keep you professional without slowing anyone down.",
    sections: [
      {
        heading: "Open with context",
        body: "Never start with only hello or hi ma'am and wait. Name yourself and your reason in the first message so the recipient can respond immediately.",
        bullets: [
          "Good morning, this is Anika regarding the Customer Support role applied on 12 October.",
          "Follow up after a pause with a short summary rather than a new hello.",
        ],
      },
      {
        heading: "Respect boundaries",
        body: "Message during working hours unless something is genuinely urgent, keep voice notes short, and move detailed conversations to email where there is a record.",
      },
      {
        heading: "Confirm agreements in writing",
        body: "After a call, send one line confirming what was agreed and the next step. It prevents misunderstanding and shows you were paying attention.",
      },
    ],
  },
  {
    slug: "first-90-days-in-a-new-role",
    title: "What to focus on in your first 90 days at a new job",
    category: "Workplace Readiness",
    readMinutes: 5,
    summary:
      "The first three months are about learning how the team works, delivering small wins and asking the right questions early.",
    sections: [
      {
        heading: "Days 1 to 30 — learn the system",
        body: "Your goal is to understand how work actually flows: who approves what, which tools are used, and what good performance looks like in this team.",
        bullets: [
          "Write down processes as you learn them — your notes become a reference others will want.",
          "Ask clarifying questions the first time something is unclear rather than guessing twice.",
          "Meet your colleagues and learn what each person owns.",
        ],
      },
      {
        heading: "Days 31 to 60 — deliver reliably",
        body: "Take on tasks you can complete well and on time. Reliability in small work is what earns larger responsibility.",
        bullets: [
          "Confirm deadlines before you accept them.",
          "Give status updates before you are asked for them.",
        ],
      },
      {
        heading: "Days 61 to 90 — improve one thing",
        body: "By now you will notice a repetitive problem. Propose one small, specific improvement and offer to implement it. That is how a new hire becomes a valued one.",
      },
    ],
  },
  {
    slug: "workplace-etiquette-basics",
    title: "Workplace etiquette basics that quietly decide your reputation",
    category: "Workplace Readiness",
    readMinutes: 4,
    summary:
      "Punctuality, attendance and how you handle feedback are noticed long before your technical skill is.",
    sections: [
      {
        heading: "Being on time is a professional skill",
        body: "Arriving five minutes early for a shift or meeting signals respect for other people's time. If you will be late or absent, inform your supervisor as early as possible rather than after the start time.",
      },
      {
        heading: "Handle feedback without defensiveness",
        body: "Correcting your work is part of a manager's job, not a judgement of you as a person.",
        bullets: [
          "Listen fully before you respond.",
          "Ask what good looks like, then confirm the expectation in writing.",
          "Thank the person, apply the change, and follow up once it is done.",
        ],
      },
      {
        heading: "Keep personal matters separate",
        body: "Personal calls and lengthy personal chats belong on breaks. Also keep work information confidential: customer details, colleague matters and internal figures should never leave the team.",
      },
    ],
  },
  {
    slug: "from-fresher-to-first-role",
    title: "From fresher to your first role: what actually makes the difference",
    category: "Entry-Level Careers",
    readMinutes: 5,
    summary:
      "Entry-level hiring is a evidence problem. Show what you have done, not only what you know.",
    sections: [
      {
        heading: "Build evidence while you wait",
        body: "Projects, internships, volunteering and certifications all convert into interview answers. Choose work that produces something you can show or describe precisely.",
        bullets: [
          "Complete one small project that solves a real, simple problem.",
          "Document what you did in three lines: the task, your action, the result.",
          "Free courses are useful only when you finish and can explain what you learned.",
        ],
      },
      {
        heading: "Target roles at the right level",
        body: "Customer support, back office, sales, data entry and internships are common first steps that value communication and reliability over experience. Read the eligibility line before applying.",
      },
      {
        heading: "Treat the search like a job",
        body: "Fixed hours, a daily quota and a written tracker turn an open-ended search into a manageable routine — and it gives you something concrete to say when an interviewer asks what you have been doing.",
        warnings: ["Avoid gaps you cannot explain; a described routine is far better than silence."],
      },
    ],
  },
  {
    slug: "building-skills-while-you-search",
    title: "Choosing which skills to build while you are job searching",
    category: "Entry-Level Careers",
    readMinutes: 4,
    summary:
      "Skill-building only pays off when it is chosen from the job listings you want. Start from the demand, not the trend.",
    sections: [
      {
        heading: "Let the job market choose for you",
        body: "Collect twenty listings for the role you want and count the skills mentioned more than three times. That list, in descending order, is your study plan.",
        bullets: [
          "Tools named repeatedly (Excel, a CRM, a helpdesk) come first.",
          "Communication and typing speed matter in most customer-facing roles.",
          "Ignore trending topics that never appear in your target listings.",
        ],
      },
      {
        heading: "Depth beats breadth",
        body: "Three skills you can demonstrate well outperform ten listed symbols on a resume. Finish a course, apply the skill to a small project, and write two lines about the result.",
      },
      {
        heading: "Prove it in the interview",
        body: "Prepare a short walkthrough of something you built or fixed using the skill. Interviewers trust a two-minute demonstration far more than a certificate name.",
      },
    ],
  },
];

export function getArticleBySlug(slug) {
  return careerArticles.find((article) => article.slug === slug) || null;
}

export function getRelatedArticles(article, limit = 3) {
  if (!article) return [];
  const sameCategory = careerArticles.filter(
    (item) => item.category === article.category && item.slug !== article.slug,
  );
  const rest = careerArticles.filter(
    (item) => item.category !== article.category && item.slug !== article.slug,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}
