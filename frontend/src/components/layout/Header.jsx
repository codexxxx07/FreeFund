import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiArrowRight, HiBars3, HiChevronDown, HiMoon, HiSun, HiXMark } from "react-icons/hi2";
import { BRAND_NAME } from "../../data/constants";
import { primaryNav } from "../../data/navigation";
import WhatsAppCta from "../common/WhatsAppCta";

function navClass({ isActive }, extra = "") {
  return `nav-link${isActive ? " is-active" : ""}${extra ? ` ${extra}` : ""}`;
}

function isActivePath(pathname, link) {
  if (link.end) return pathname === link.to;
  if (!link.to) return false;
  return pathname === link.to || pathname.startsWith(`${link.to}/`);
}

function getInitialTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const menuButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  const location = useLocation();

  // The Contact link lives in the top-right action zone (small caps), not in
  // the centered pill nav; everything else renders in the nav as before.
  const navItems = primaryNav.filter((item) => item.to !== "/contact");
  const contactItem = primaryNav.find((item) => item.to === "/contact");

  // Close every panel when the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Escape closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Escape closes the dropdown and returns focus to its trigger.
  useEffect(() => {
    if (!dropdownOpen) return;
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dropdownOpen]);

  // Click outside closes the dropdown.
  useEffect(() => {
    if (!dropdownOpen) return;
    function onPointerDown(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [dropdownOpen]);

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

  function onDropdownKeyDown(event) {
    const items = primaryNav.find((item) => item.children)?.children || [];
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const startIndex = event.key === "ArrowDown" ? 0 : items.length - 1;
      setDropdownOpen(true);
      window.requestAnimationFrame(() => itemRefs.current[startIndex]?.focus());
    } else if (event.key === "Escape") {
      setDropdownOpen(false);
    } else if (event.key === "Tab") {
      setDropdownOpen(false);
    }
  }

  function onMenuItemKeyDown(event, index, count) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      itemRefs.current[(index + 1) % count]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      itemRefs.current[(index - 1 + count) % count]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setDropdownOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === "Tab") {
      setDropdownOpen(false);
    }
  }

  return (
    <header className="site-header">
      <div className="page-shell">
        <div className="nav-bar">
          <div className="nav-shell">
            <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setMenuOpen(false)}>
              <span className="brand-mark" aria-hidden="true">
                <span className="relative z-10">JM</span>
              </span>
              <span className="min-w-0">
                <span className="block whitespace-nowrap font-display text-sm font-bold uppercase leading-tight tracking-wide sm:text-[0.95rem]">
                  {BRAND_NAME}
                </span>
                <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted sm:block">
                  Recruitment Consultancy
                </span>
              </span>
            </Link>

            <nav className="primary-nav hidden items-center gap-0 xl:flex" aria-label="Primary">
              {navItems.map((link) => {
                if (link.children) {
                  const active = link.children.some((child) => isActivePath(location.pathname, child));
                  return (
                    <div key={link.label} className="nav-dropdown" ref={dropdownRef}>
                      <button
                        ref={triggerRef}
                        type="button"
                        className={`nav-link nav-dropdown-trigger${active ? " is-active" : ""}`}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="menu"
                        aria-controls="career-resources-menu"
                        onClick={() => setDropdownOpen((value) => !value)}
                        onKeyDown={onDropdownKeyDown}
                      >
                        {link.label}
                        <HiChevronDown aria-hidden="true" />
                      </button>
                      <ul
                        id="career-resources-menu"
                        role="menu"
                        aria-label={link.label}
                        className={`nav-dropdown-menu${dropdownOpen ? " is-open" : ""}`}
                      >
                        {link.children.map((child, index) => (
                          <li key={child.to} role="none">
                            <NavLink
                              role="menuitem"
                              ref={(node) => {
                                itemRefs.current[index] = node;
                              }}
                              to={child.to}
                              className={({ isActive }) => `nav-dropdown-item${isActive ? " is-active" : ""}`}
                              onClick={() => setDropdownOpen(false)}
                              onKeyDown={(event) => onMenuItemKeyDown(event, index, link.children.length)}
                            >
                              {child.label}
                              <HiArrowRight aria-hidden="true" />
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                return (
                  <NavLink key={link.to} to={link.to} className={navClass} end={link.end}>
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <HiSun aria-hidden="true" /> : <HiMoon aria-hidden="true" />}
              </button>
              <WhatsAppCta className="hidden whitespace-nowrap px-3 text-xs sm:inline-flex">WhatsApp Channel</WhatsAppCta>
              {contactItem ? (
                <Link to={contactItem.to} className="nav-contact hidden sm:inline-flex">
                  {contactItem.label}
                </Link>
              ) : null}
              <button
                ref={menuButtonRef}
                type="button"
                className="btn-secondary min-h-0 px-2.5 py-2 xl:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((value) => !value)}
              >
                {menuOpen ? <HiXMark aria-hidden="true" /> : <HiBars3 aria-hidden="true" />}
                <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              </button>
            </div>
          </div>

          {menuOpen ? (
            <nav
              id="mobile-nav"
              className="panel-reveal max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-line px-3 pb-3 pt-2 xl:hidden"
              aria-label="Mobile"
            >
              <div className="flex flex-col gap-1">
                {primaryNav.map((link) => {
                  if (link.children) {
                    return (
                      <div key={link.label} className="mt-1">
                        <span className="nav-group-label">{link.label}</span>
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className={(state) => navClass(state, "nav-sub-link")}
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={navClass}
                      end={link.end}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
                <div className="mt-3 border-t border-line pt-3">
                  <WhatsAppCta className="w-full justify-center" />
                </div>
              </div>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
