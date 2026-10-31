import { useEffect, useRef } from "react";
import { HiXMark } from "react-icons/hi2";

/**
 * Drawer — right-side panel for the training enrolment form. Locks page
 * scrolling, closes on Escape, moves focus in and restores it on close.
 */
export default function Drawer({ open, onClose, title, eyebrow, children }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    restoreRef.current = document.activeElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ed-drawer" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="ed-drawer__backdrop" onClick={onClose} tabIndex={-1} aria-label="Close panel" />
      <div className="ed-drawer__panel" ref={panelRef}>
        <div className="ed-drawer__head">
          <div>
            {eyebrow ? <p className="ed-label ed-label--lime">{eyebrow}</p> : null}
            <h2 className="ed-h3 ed-display" style={{ marginTop: "0.4rem" }}>
              {title}
            </h2>
          </div>
          <button type="button" className="ed-drawer__close" onClick={onClose} ref={closeRef} aria-label="Close">
            <HiXMark size={20} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
