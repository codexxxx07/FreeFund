import siteConfig from "./siteConfig";

/**
 * Brand and catalogue constants used across the site.
 *
 * Owner-editable business information (WhatsApp Channel link, enquiry number,
 * contact details, production origin) lives in ./siteConfig.js.
 */

export const BRAND_NAME = "Jobs Mania - Freefund";

// Before switching to "live": replace demo data with real jobs and connect a working submit endpoint.
export const SITE_MODE = "demo"; // "demo" | "live"
export const IS_DEMO = SITE_MODE === "demo";

export function isPlaceholder(value) {
  if (!value) return false;
  const normalized = String(value).toLowerCase();
  return normalized.includes("placeholder") || normalized.includes("example.com") || normalized.includes("xxxxx");
}

export const CATEGORIES = [
  "Customer Support",
  "BPO",
  "Sales",
  "Back Office",
  "Recruitment",
  "Other Opportunities",
];

export const WORK_MODES = ["Work From Home", "Work From Office", "Hybrid"];

export const LOCATIONS = [
  "Bangalore",
  "Noida",
  "Gurugram",
  "Mumbai",
  "Pune",
  "Hyderabad",
  "Other",
];

export const EXPERIENCE_FILTERS = [
  { value: "fresher", label: "Fresher / 0–1 years" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5+", label: "5+ years" },
];

export const EDUCATION_OPTIONS = [
  "10th / 12th",
  "Diploma",
  "Graduate",
  "Postgraduate",
  "Other",
];

export const CONTACT_PLACEHOLDERS = siteConfig.contact;

export const DEMO_NOTICE =
  "Sample listings. Applications are not sent to employers.";
