import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiBars3, HiXMark, HiArrowRight } from "react-icons/hi2";
import { BRAND_NAME } from "../../data/constants";

const links = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Find Jobs" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

function navClass({ isActive }) {
  return `pill-link ${isActive ? "pill-link-active" : ""}`;
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-accent text-sm font-bold text-white shadow-[0_3px_0_var(--color-accent-deep)]">
            <span className="absolute -right-2 -top-3 h-9 w-9 skew-x-[-12deg] rounded-md bg-highlight/90" aria-hidden="true" />
            <span className="relative">JM</span>
          </span>
          <div className="min-w-0">
            <span className="block truncate font-display text-sm font-bold sm:text-base">{BRAND_NAME}</span>
            <span className="hidden text-xs text-ink-muted sm:block">Recruitment Portal</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/jobs" className="btn-primary hidden items-center gap-2 sm:inline-flex">
            Explore Jobs
            <HiArrowRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="btn-secondary px-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <HiXMark aria-hidden="true" /> : <HiBars3 aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line bg-white lg:hidden" aria-label="Mobile">
          <div className="page-shell flex flex-col gap-1 py-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navClass}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/jobs" className="btn-primary mt-2 justify-center" onClick={() => setOpen(false)}>
              Explore Jobs
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
