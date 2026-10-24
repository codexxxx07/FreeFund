import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiArrowRight, HiBars3, HiMoon, HiSun, HiXMark } from "react-icons/hi2";
import { BRAND_NAME } from "../../data/constants";

const links = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Find Jobs" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

function navClass({ isActive }) {
  return `nav-link${isActive ? " is-active" : ""}`;
}

function getInitialTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // localStorage can be unavailable in restricted browsing modes.
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b0b0b" : "#ffffff");
  }, [theme]);

  function toggleTheme() {
    setTheme((value) => (value === "dark" ? "light" : "dark"));
  }

  return (
    <header className="site-header">
      <div className="page-shell">
        <div className="nav-bar">
          <div className="nav-shell">
            <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
              <span className="brand-mark" aria-hidden="true">
                <span className="relative z-10">JM</span>
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-bold sm:text-base">{BRAND_NAME}</span>
                <span className="hidden text-xs font-medium text-muted sm:block">Recruitment Portal</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} className={navClass} end={link.to === "/"}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <HiSun aria-hidden="true" /> : <HiMoon aria-hidden="true" />}
              </button>
              <Link to="/jobs" className="btn-primary hidden sm:inline-flex">
                Browse Jobs
                <HiArrowRight aria-hidden="true" />
              </Link>
              <button
                ref={menuButtonRef}
                type="button"
                className="btn-secondary px-3 py-2.5 lg:hidden"
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
            <nav
              id="mobile-nav"
              className="border-t border-line px-3 pb-3 pt-2 lg:hidden"
              aria-label="Mobile"
            >
              <div className="flex flex-col gap-1">
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
                  Browse Jobs
                  <HiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
