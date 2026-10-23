import { Link } from "react-router-dom";
import { HiArrowRight, HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";
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
    <footer className="border-t border-line bg-secondary">
      <div className="page-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.7fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="brand-mark" aria-hidden="true">
                <span className="relative z-10">JM</span>
              </span>
              <div>
                <p className="font-display text-lg font-bold">{BRAND_NAME}</p>
                <p className="text-sm text-muted">Recruitment Portal</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              A calm, clear place to explore sample vacancies, review job details, and preview the application flow.
              Built as a Phase 1 frontend prototype with honest demo labels.
            </p>
            <Link to="/jobs" className="btn-primary mt-6 inline-flex">
              Browse Current Jobs
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div>
            <p className="font-display text-sm font-bold">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link className="footer-link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-bold">Legal</p>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link className="footer-link" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-bold">Contact placeholders</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <HiEnvelope className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                <span>{CONTACT_PLACEHOLDERS.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HiPhone className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                <span>{CONTACT_PLACEHOLDERS.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HiMapPin className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                <span>{CONTACT_PLACEHOLDERS.region}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>
            <p className="text-xs">Frontend prototype · Sample listings only</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
