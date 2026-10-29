/**
 * siteConfig.js
 * ─────────────────────────────────────────────────────────────────────────────
 * OWNER-EDITABLE SITE CONFIGURATION.
 *
 * Everything a non-developer needs to change lives here: the WhatsApp Channel
 * link, enquiry number, public contact details, and the production origin used
 * for canonical / Open Graph tags and the sitemap.
 *
 * RULES
 *  - Only enter information you can verify. Empty or placeholder values are
 *    hidden or replaced by a clearly labelled placeholder in the UI — they are
 *    never rendered as a working link.
 *  - This file is bundled into the public website build. It must NEVER contain
 *    secrets: no API keys, no private tokens, no credentials. Anything written
 *    here is visible to every visitor.
 */

const PLACEHOLDER_EMAIL = "contact@example.com (placeholder — to be confirmed)";
const PLACEHOLDER_PHONE = "+91 XXXXX XXXXX (placeholder — to be confirmed)";
const PLACEHOLDER_REGION = "India (full address to be confirmed)";

const siteConfig = {
  /**
   * Production origin used for <link rel="canonical">, Open Graph URLs and the
   * generated sitemap — for example "https://jobsmania.example.com".
   * No trailing slash. Leave "" and canonical/OG URLs fall back to the origin
   * the visitor is currently on, and the build skips sitemap URL generation.
   */
  siteUrl: "",

  /**
   * Official WhatsApp Channel invite link.
   */
  whatsappChannelUrl: "https://whatsapp.com/channel/0029Vb6uL6r8KMqr0gWO7r2c",

  /**
   * WhatsApp Community invitation link used by every "Join Our WhatsApp
   * Community" call to action (home page section).
   * This is the COMMUNITY invite — it is not the founder's direct WhatsApp
   * contact, which lives in aboutConfig.founder.social.whatsapp.
   * Set back to "" and the Join Community button explains that the link is
   * coming soon instead of navigating to an invalid URL.
   */
  whatsappCommunityUrl: "https://chat.whatsapp.com/ByOxpemBNOa39uHNgyodZX",

  /**
   * WhatsApp number for one-to-one enquiries, digits only with country code,
   * e.g. "919876543210". Leave "" to hide every "chat on WhatsApp" action.
   */
  whatsappEnquiryNumber: "",

  /**
   * Public contact details. Replace the placeholder strings with verified
   * values; placeholder strings are detected and hidden automatically.
   */
  contact: {
    email: PLACEHOLDER_EMAIL,
    phone: PLACEHOLDER_PHONE,
    region: PLACEHOLDER_REGION,
  },
};

/** True when a value is empty or an obvious placeholder. */
export function isUnset(value) {
  if (!value) return true;
  const normalized = String(value).trim().toLowerCase();
  return (
    normalized === "" ||
    normalized.includes("placeholder") ||
    normalized.includes("to be confirmed") ||
    normalized.includes("example.com") ||
    normalized.includes("xxxxx")
  );
}

/** True when the official WhatsApp Channel URL has been configured. */
export function hasWhatsAppChannel() {
  return !isUnset(siteConfig.whatsappChannelUrl);
}

/** True when the WhatsApp Community invitation link has been configured. */
export function hasWhatsAppCommunity() {
  return !isUnset(siteConfig.whatsappCommunityUrl);
}

/** True when a real WhatsApp enquiry number has been configured. */
export function hasWhatsAppEnquiry() {
  return !isUnset(siteConfig.whatsappEnquiryNumber);
}

/** Build a wa.me deep link with a prefilled message. Returns "" when unconfigured. */
export function whatsappEnquiryLink(message) {
  if (!hasWhatsAppEnquiry()) return "";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsappEnquiryNumber}${text}`;
}

/** Absolute URL for the current origin plus a path, honouring siteUrl when set. */
export function absoluteUrl(path = "/") {
  const base =
    siteConfig.siteUrl ||
    (typeof window !== "undefined" ? window.location.origin : "");
  if (!base) return path;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export default siteConfig;
