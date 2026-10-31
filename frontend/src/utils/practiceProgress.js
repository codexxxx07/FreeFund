/**
 * practiceProgress.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Local attempt log for the practice floor. Everything lives in localStorage on
 * the visitor's device: no account, no server, no third-party analytics.
 */

const STORAGE_KEY = "jm-practice-log-v1";
const MAX_ATTEMPTS = 60;

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function loadProgress() {
  if (typeof window === "undefined") return { attempts: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { attempts: [] };
    const parsed = JSON.parse(raw);
    return { attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [] };
  } catch {
    return { attempts: [] };
  }
}

export function saveAttempt(attempt) {
  const current = loadProgress();
  const next = {
    attempts: [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        at: new Date().toISOString(),
        ...attempt,
      },
      ...current.attempts,
    ].slice(0, MAX_ATTEMPTS),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be blocked or full; the page still works in memory.
  }
  return next;
}

export function clearProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
  return { attempts: [] };
}

/** Consecutive days with at least one attempt, ending today or yesterday. */
export function getStreak(attempts) {
  if (!attempts.length) return 0;
  const days = new Set(attempts.map((attempt) => todayKey(new Date(attempt.at))));
  const cursor = new Date();
  if (!days.has(todayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(todayKey(cursor))) return 0;
  }
  let streak = 0;
  while (days.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Seven booleans for the current week, Monday first. */
export function getWeekActivity(attempts) {
  const days = new Set(attempts.map((attempt) => todayKey(new Date(attempt.at))));
  const today = new Date();
  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);
    return days.has(todayKey(day));
  });
}

export function getBest(attempts, toolId) {
  const scores = attempts
    .filter((attempt) => attempt.toolId === toolId && Number.isFinite(attempt.percent))
    .map((attempt) => attempt.percent);
  return scores.length ? Math.max(...scores) : null;
}

export function countAttempts(attempts, toolId) {
  return attempts.filter((attempt) => attempt.toolId === toolId).length;
}

export { todayKey };
