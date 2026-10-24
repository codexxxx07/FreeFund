/**
 * aboutConfig.js
 * ──────────────────────────────────────────────────────────────────────────────
 * Every value in this file MUST be supplied by the site owner before it is
 * shown publicly.  Fields that are still empty strings ("") or the default
 * `false` will be silently hidden by the About page — nothing will render as
 * "undefined" or "TO BE CONFIRMED" to end users.
 *
 * INSTRUCTIONS FOR THE OWNER
 * ──────────────────────────
 * Fill in each field below, then set SITE_MODE = "live" in
 * src/data/constants.js when you are ready to go live.
 *
 * DO NOT invent or approximate any value — only enter information you can
 * verify and are legally responsible for.
 */

const aboutConfig = {
  // ── Company details ──────────────────────────────────────────────────────
  // The registered legal / trade name of the entity that owns this platform.
  // Example: "Mania Recruitment Services Pvt. Ltd."
  legalName: "",

  // Full registered address (building, street, city, state, PIN, country).
  // Example: "101, ABC Plaza, MG Road, Bengaluru – 560 001, Karnataka, India"
  registeredAddress: "",

  // Public contact email address for candidate queries.
  // Example: "support@jobsmania.in"
  contactEmail: "",

  // Public contact phone number (with country code).
  // Example: "+91 98765 43210"
  contactPhone: "",

  // Year the company / platform was established.
  // Example: 2023
  // Set to 0 or "" to hide.
  establishedYear: "",

  // ── Fee policy ────────────────────────────────────────────────────────────
  // Set to `true` ONLY if you have confirmed in writing (e.g., in your Terms)
  // that candidates are never charged any fee at any stage of the process.
  // Default is false; leaving it false hides the "no fee" banner.
  noFeePolicyConfirmed: false,

  // ── Social / web presence (optional) ─────────────────────────────────────
  // LinkedIn page URL — shown only if non-empty.
  // Example: "https://www.linkedin.com/company/jobs-mania-freefund"
  linkedInUrl: "",
};

export default aboutConfig;
