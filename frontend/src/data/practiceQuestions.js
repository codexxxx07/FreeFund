/**
 * Practice tool content.
 * ─────────────────────────────────────────────────────────────────────────────
 * Local data for the three free practice tools. Edit these arrays to change
 * the questions and typing passages — no build step or backend involved.
 *
 * Keep answers factually correct: these are practice questions, and results are
 * never presented as a certification.
 */

/** Passages used by the typing speed test. Kept short and error-free. */
export const typingPassages = [
  "A good resume is easy to read and easy to scan. Keep the layout simple, use clear headings, and place your most recent work or training near the top. Recruiters spend only a short time on each resume, so make the important details easy to find.",
  "Clear written communication matters in every role. Write short sentences, check the spelling before you send anything, and answer the question you were actually asked. When you reply to a message, confirm what happens next and who is responsible for it.",
  "Prepare for an interview by reading the job description line by line. Pick two or three examples from your own experience that show each requirement, and practise saying them out loud. Arrive early, bring a copy of your resume, and ask questions about the role.",
  "Basic computer skills are part of most jobs today. Know how to create a folder, find a file, use a spreadsheet for simple calculations, and attach a document to an email. Learn the keyboard shortcuts you use often, and your daily work becomes much faster.",
];

/**
 * English quiz — grammar, vocabulary and usage.
 * `answer` is the index of the correct option in `options`.
 */
export const englishQuestions = [
  {
    id: "en-01",
    question: "Choose the correctly punctuated sentence.",
    options: [
      "Its been a long day since we started.",
      "It's been a long day since we started.",
      "Its' been a long day since we started.",
      "It has' been a long day since we started.",
    ],
    answer: 1,
    explanation: "It's is the contraction of it has. Its is possessive.",
  },
  {
    id: "en-02",
    question: "Which word is closest in meaning to 'reliable'?",
    options: ["Flexible", "Dependable", "Expensive", "Curious"],
    answer: 1,
    explanation: "Dependable means you can rely on someone or something consistently.",
  },
  {
    id: "en-03",
    question: "Fill in the blank: 'She ___ to the office every morning.'",
    options: ["go", "goes", "going", "gone"],
    answer: 1,
    explanation: "A third-person singular subject takes the -s form: she goes.",
  },
  {
    id: "en-04",
    question: "Which sentence uses the apostrophe correctly?",
    options: [
      "The two employee's signed the form.",
      "The two employees signed the form.",
      "The two employee's' signed the form.",
      "The two employees' sign the form.",
    ],
    answer: 1,
    explanation: "A plural noun that is not possessive needs no apostrophe.",
  },
  {
    id: "en-05",
    question: "What is the opposite of 'scarce'?",
    options: ["Rare", "Limited", "Abundant", "Costly"],
    answer: 2,
    explanation: "Scarce means in short supply; abundant means available in large amounts.",
  },
  {
    id: "en-06",
    question: "Fill in the blank: 'I would have called you if I ___ your number.'",
    options: ["have", "had", "have had", "would have"],
    answer: 1,
    explanation: "A third conditional uses had + past participle in the if-clause.",
  },
  {
    id: "en-07",
    question: "Which word is spelled correctly?",
    options: ["Recieve", "Receive", "Receeve", "Reciive"],
    answer: 1,
    explanation: "Receive follows the rule: i before e except after c.",
  },
  {
    id: "en-08",
    question: "Choose the polite, professional way to open an email.",
    options: [
      "Hey, listen up.",
      "To whom it may concern, I need this today.",
      "Dear Ma'am / Sir, I hope you are well.",
      "Urgent!! Reply now.",
    ],
    answer: 2,
    explanation: "A formal greeting with a courteous opening line suits professional email.",
  },
  {
    id: "en-09",
    question: "Fill in the blank: 'The report was submitted ___ Friday.'",
    options: ["at", "on", "in", "by"],
    answer: 1,
    explanation: "We use on with days of the week.",
  },
  {
    id: "en-10",
    question: "What does the phrase 'meet a deadline' mean?",
    options: [
      "To miss an important date",
      "To finish work by the required time",
      "To ask for more time",
      "To schedule a meeting",
    ],
    answer: 1,
    explanation: "Meeting a deadline means completing work on or before the due time.",
  },
];

/**
 * Basic computer test — hardware, software, files and everyday shortcuts.
 */
export const computerQuestions = [
  {
    id: "pc-01",
    question: "Which of these is a hardware component?",
    options: ["An operating system", "A monitor", "A web browser", "A printer driver"],
    answer: 1,
    explanation: "A monitor is a physical device; the others are software.",
  },
  {
    id: "pc-02",
    question: "What does RAM do?",
    options: [
      "Stores files permanently",
      "Holds data the CPU is actively using",
      "Connects the computer to the internet",
      "Displays pictures on the screen",
    ],
    answer: 1,
    explanation: "RAM is temporary working memory; its contents are lost when power is off.",
  },
  {
    id: "pc-03",
    question: "Which shortcut copies the selected item?",
    options: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"],
    answer: 1,
    explanation: "Ctrl + C copies, Ctrl + X cuts, Ctrl + V pastes, Ctrl + Z undoes.",
  },
  {
    id: "pc-04",
    question: "Which key removes the character to the left of the cursor?",
    options: ["Delete", "Enter", "Backspace", "Tab"],
    answer: 2,
    explanation: "Backspace deletes backwards; Delete removes the character to the right.",
  },
  {
    id: "pc-05",
    question: "What is an operating system?",
    options: [
      "A device that prints documents",
      "Software that manages hardware and runs applications",
      "A type of computer virus",
      "A folder on the hard disk",
    ],
    answer: 1,
    explanation: "Examples include Windows, macOS and Linux.",
  },
  {
    id: "pc-06",
    question: "Which file extension is used for a spreadsheet file?",
    options: [".txt", ".xlsx", ".mp3", ".exe"],
    answer: 1,
    explanation: ".xlsx is an Excel workbook; .txt is plain text, .mp3 audio, .exe a program.",
  },
  {
    id: "pc-07",
    question: "Where should temporary notes be saved so they are not lost?",
    options: [
      "The desktop only",
      "A named folder with regular backups",
      "The recycle bin",
      "An unsaved document",
    ],
    answer: 1,
    explanation: "Save work in an organised folder and keep a backup copy elsewhere.",
  },
  {
    id: "pc-08",
    question: "What does a browser do?",
    options: [
      "Opens files stored on a USB drive",
      "Displays websites from the internet",
      "Scans documents into PDF",
      "Compresses large files",
    ],
    answer: 1,
    explanation: "A browser such as Chrome or Firefox retrieves and shows web pages.",
  },
  {
    id: "pc-09",
    question: "Which of these is the safest password practice?",
    options: [
      "Using one password everywhere",
      "Sharing it with your team",
      "A long, unique passphrase stored in a password manager",
      "Writing it on a sticky note on the monitor",
    ],
    answer: 2,
    explanation: "Long and unique per account, kept in a password manager, is the safe approach.",
  },
  {
    id: "pc-10",
    question: "A file is too large to email. What is the usual solution?",
    options: [
      "Compress it into a zip file or share a download link",
      "Rename the file",
      "Turn the computer off and on",
      "Change the screen resolution",
    ],
    answer: 0,
    explanation: "Compressing reduces size, and a share link avoids attachment limits entirely.",
  },
];

export const PRACTICE_TOOLS = [
  {
    id: "typing",
    name: "Typing Speed Test",
    short: "Measure your speed and accuracy on a short passage.",
  },
  {
    id: "english",
    name: "English Quiz",
    short: "Ten questions on grammar, vocabulary and usage.",
  },
  {
    id: "computer",
    name: "Basic Computer Test",
    short: "Ten questions on everyday computer skills.",
  },
];
