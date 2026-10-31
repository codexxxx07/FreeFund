import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiArrowUpRight, HiBars3, HiChevronDown, HiXMark } from "react-icons/hi2";
import { BRAND_NAME } from "../../data/constants";
import { contactLink, primaryNav } from "../../data/navigation";
import Asterisk from "../editorial/Asterisk";

function linkClass({ isActive }) {
  return `ed-navlink${isActive ? " is-active" : ""}`;
}

/** Stable DOM id for a nav item's dropdown / sub-list. */
function groupId(prefix, item) {
  return `${prefix}-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

/** True when the item — or any of its children — matches the current route. */
function isItemActive(item, pathname) {
  if (item.to) {
    return item.end ? pathname === item.to : pathname.startsWith(item.to);
  }
  return (item.children || []).some((child) =>
    child.end ? pathname === child.to : pathname.startsWith(child.to)
  );
}

/**
 * Desktop "Career Resources" dropdown.
 *
 * Opens on hover and on click, closes on mouse-leave, on Escape, on Tab-out
 * and on route change. The panel stays mounted so its open/close transition
 * always animates; `.is-open` toggles opacity, position and visibility.
 */
function NavDropdown({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeTimer = useRef(null);
  const active = isItemActive(item, pathname);

  // Any navigation closes the panel.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function openMenu() {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function scheduleClose(delay = 180) {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), delay);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  function handleBlur(event) {
    // Close when keyboard focus leaves the dropdown entirely.
    if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose(0);
  }

  return (
    <li
      className={`ed-nav-item ed-nav-drop${open ? " is-open" : ""}`}
      onMouseEnter={openMenu}
      onMouseLeave={() => scheduleClose()}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`ed-navlink ed-navdrop__trigger${active ? " is-active" : ""}`}
        aria-expanded={open}
        aria-controls={groupId("nav-drop", item)}
        aria-haspopup="true"
        onClick={() => (open ? scheduleClose(0) : openMenu())}
      >
        <span className="ed-navlink__b" aria-hidden="true">
          [
        </span>
        <span>{item.label}</span>
        <span className="ed-navlink__b" aria-hidden="true">
          ]
        </span>
        <HiChevronDown className="ed-navdrop__caret" aria-hidden="true" size={12} />
      </button>

      <div className="ed-navdrop" id={groupId("nav-drop", item)}>
        <ul className="ed-navdrop__menu">
          {item.children.map((child) => (
            <li key={child.to}>
              <NavLink
                to={child.to}
                end={child.end}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <span>{child.label}</span>
                <span aria-hidden="true">→</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/** Mobile expandable group — the same Career Resources children, stacked. */
function MobileNavGroup({ item, pathname, onNavigate }) {
  const [open, setOpen] = useState(false);
  const active = isItemActive(item, pathname);

  return (
    <div className={`ed-mobile-nav__group${open ? " is-open" : ""}`}>
      <button
        type="button"
        className={`ed-mobile-nav__link ed-mobile-nav__groupbtn${active ? " is-active" : ""}`}
        aria-expanded={open}
        aria-controls={groupId("mobile-nav", item)}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{item.label}</span>
        <HiChevronDown className="ed-mobile-nav__caret" aria-hidden="true" size={20} />
      </button>
      <div className="ed-mobile-nav__sub" id={groupId("mobile-nav", item)}>
        <ul>
          {item.children.map((child) => (
            <li key={child.to}>
              <NavLink
                to={child.to}
                end={child.end}
                className={({ isActive }) =>
                  `ed-mobile-nav__sublink${isActive ? " is-active" : ""}`
                }
                onClick={onNavigate}
              >
                <span>{child.label}</span>
                <span aria-hidden="true">→</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="ed-header">
      <div className="ed-shell">
        <div className="ed-navbar">
          <Link to="/" className="ed-brand" onClick={() => setMenuOpen(false)} aria-label={`${BRAND_NAME} home`}>
            <span className="ed-brand__mark" aria-hidden="true">
              <Asterisk size={20} />
            </span>
            <span className="ed-brand__text">
              <span className="ed-brand__name">Jobs Mania</span>
              <span className="ed-brand__sub">Freefund · Recruitment</span>
            </span>
          </Link>

          <nav className="ed-nav" aria-label="Primary">
            <ul className="ed-nav__list">
              {primaryNav.map((link) =>
                link.children ? (
                  <NavDropdown key={link.label} item={link} pathname={location.pathname} />
                ) : (
                  <li key={link.to}>
                    <NavLink to={link.to} end={link.end} className={linkClass}>
                      <span className="ed-navlink__b" aria-hidden="true">
                        [
                      </span>
                      <span>{link.label}</span>
                      <span className="ed-navlink__b" aria-hidden="true">
                        ]
                      </span>
                    </NavLink>
                  </li>
                )
              )}
              <li>
                <Link to={contactLink.to} className="ed-btn ed-btn--lime ed-nav__cta">
                  {contactLink.label}
                  <HiArrowUpRight aria-hidden="true" size={14} />
                </Link>
              </li>
            </ul>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="ed-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <HiXMark size={22} aria-hidden="true" /> : <HiBars3 size={22} aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-nav" className="ed-mobile-nav" aria-label="Mobile">
          <div className="ed-shell">
            {primaryNav.map((link) =>
              link.children ? (
                <MobileNavGroup
                  key={link.label}
                  item={link}
                  pathname={location.pathname}
                  onNavigate={() => setMenuOpen(false)}
                />
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `ed-mobile-nav__link${isActive ? " is-active" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">→</span>
                </NavLink>
              )
            )}
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Link to={contactLink.to} className="ed-btn ed-btn--lime" onClick={() => setMenuOpen(false)}>
                {contactLink.label}
                <HiArrowUpRight aria-hidden="true" size={14} />
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
