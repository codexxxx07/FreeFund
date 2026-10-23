import { jobs } from "../data/jobs";

function clone(list) {
  return list.map((job) => ({ ...job, skills: [...job.skills], responsibilities: [...job.responsibilities], eligibility: [...job.eligibility] }));
}

/** Central data access. Swap this file for an HTTP client in a later phase. */
export function getAllJobs() {
  return clone(jobs);
}

export function getJobById(id) {
  if (!id) return null;
  const match = jobs.find((job) => job.id.toLowerCase() === String(id).toLowerCase());
  return match ? clone([match])[0] : null;
}

export function getOpenJobs() {
  return clone(jobs.filter((job) => job.status === "open"));
}

export function getFeaturedJobs() {
  return getOpenJobs().filter((job) => job.featured);
}

export function getJobsByWorkMode(workMode) {
  return getOpenJobs().filter((job) => job.workMode === workMode);
}

export function getRelatedJobs(current, limit = 3) {
  if (!current) return [];
  const open = getOpenJobs().filter((job) => job.id !== current.id);
  const sameCategory = open.filter((job) => job.category === current.category);
  const rest = open.filter((job) => job.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
