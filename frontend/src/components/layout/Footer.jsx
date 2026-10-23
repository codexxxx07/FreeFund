import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { BRAND_NAME, CONTACT_PLACEHOLDERS } from "../../data/constants";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Find Jobs" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const legalLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-gradient-to-b from-white to-bg-muted">
      <div className="page-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-accent text-sm font-bold text-white shadow-[0_3px_0_var(--color-accent-deep)]">
              <span className="absolute -right-2 -top-3 h-9 w-9 skew-x-[-12deg] rounded-md bg-highlight/90" aria-hidden="true" />
              <span className="relative">JM</span>
            </span>
            <div>
              <p className="font-display text-lg font-bold">{BRAND_NAME}</p>
              <p className="text-sm text-ink-muted">Premium recruitment prototype</p>
            </div>
          </div>
          <p className="max-w-md text-sm text-ink-muted">
            A refined recruitment experience to explore sample vacancies, review job details, and preview the
            application flow. Designed with a balance of skewmorphism and minimalism.
          </p>
          <Link to="/jobs" className="btn-primary inline-flex items-center gap-2">
            Browse Current Jobs
            <HiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div>
          <p className="text-sm font-semibold">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link className="transition hover:text-ink" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Contact (placeholders)</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>{CONTACT_PLACEHOLDERS.email}</li>
            <li>{CONTACT_PLACEHOLDERS.phone}</li>
            <li>{CONTACT_PLACEHOLDERS.region}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="page-shell flex flex-col gap-3 py-5 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <Link key={link.to} className="transition hover:text-ink" to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
