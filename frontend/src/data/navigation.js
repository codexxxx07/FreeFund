/**
 * navigation.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the site's navigation. The Navbar, the mobile menu
 * and the Footer all render from these structures, so adding a page means
 * editing this file (and the route) once.
 */

/** Primary navigation, in order. `children` renders as a dropdown / sub-list. */
export const primaryNav = [
  { to: "/", label: "Home", end: true },
  { to: "/jobs", label: "Find Jobs" },
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
  { to: "/contact", label: "Contact Us" },
];

/** Footer link groups. `whatsapp: true` renders the WhatsApp Channel action. */
export const footerGroups = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Career Resources",
    links: [
      { to: "/resume-builder", label: "Resume Builder" },
      { to: "/practice-tools", label: "Free Practice Tools" },
      { to: "/career-guidance", label: "Career Guidance" },
      { to: "/free-training", label: "Free Training" },
    ],
  },
  {
    title: "Job Seekers",
    links: [
      { to: "/jobs", label: "Find Jobs" },
      { whatsapp: true, label: "WhatsApp Channel" },
    ],
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
  "/jobs",
  "/resume-builder",
  "/practice-tools",
  "/career-guidance",
  "/free-training",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];
