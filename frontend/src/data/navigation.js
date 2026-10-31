/**
 * navigation.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for navigation. The header, mobile menu, footer and
 * sitemap all read from here, so adding a page is a one-file change.
 */

/**
 * Primary navigation, in order. Contact is rendered as a separate CTA.
 *
 * An item with `children` renders as a "Career Resources" dropdown in the
 * header and as an expandable group in the mobile menu. The parent is a
 * disclosure button (there is no index route for it) — only the children
 * navigate.
 */
export const primaryNav = [
  { to: "/", label: "Home", end: true },
  { to: "/resume-builder", label: "Resume Builder" },
  {
    label: "Career Resources",
    children: [
      { to: "/practice-tools", label: "Free Practice Tools" },
      { to: "/career-guidance", label: "Career Guidance" },
    ],
  },
  { to: "/free-training", label: "Free Training" },
  { to: "/about", label: "About Us" },
];

export const contactLink = { to: "/contact", label: "Contact Us" };

/** Footer link groups. `whatsapp: true` renders the WhatsApp Channel action. */
export const footerGroups = [
  {
    title: "Career resources",
    links: [
      { to: "/free-training", label: "Free Training" },
      { to: "/practice-tools", label: "Practice Tools" },
      { to: "/resume-builder", label: "Resume Builder" },
      { to: "/career-guidance", label: "Career Guidance" },
    ],
  },
  {
    title: "Consultancy",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact Us" },
      { to: "/contact?topic=employer", label: "Hire Talent" },
    ],
  },
  {
    title: "Stay in the loop",
    links: [{ whatsapp: true, label: "WhatsApp Channel" }],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms-and-conditions", label: "Terms & Conditions" },
    ],
  },
];

/** Static sitemap paths. Kept next to navigation so new pages are added once. */
export const SITE_PATHS = [
  "/",
  "/resume-builder",
  "/practice-tools",
  "/career-guidance",
  "/free-training",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];
