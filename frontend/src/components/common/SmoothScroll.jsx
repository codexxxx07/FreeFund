import { useEffect } from "react";
import { startSmoothScroll } from "../../utils/smoothScroll";

/**
 * SmoothScroll
 * ─────────────────────────────────────────────────────────────────────────────
 * Site-wide Lenis smooth scrolling.
 *
 * Mounts once in App.jsx — outside the router — so route changes and re-renders
 * never create a second instance. The effect returns Lenis' own cleanup, which
 * cancels the animation frame and destroys the instance on unmount.
 *
 * The instance itself lives in src/utils/smoothScroll.js; ask for it with
 * `getSmoothScroll()` (used by ScrollToTop to jump to the top of a new page
 * without desyncing Lenis' scroll state).
 *
 * Reduced-motion visitors never get an instance: Lenis is simply not started
 * and the browser scrolls natively.
 */
export default function SmoothScroll() {
  useEffect(() => startSmoothScroll(), []);

  return null;
}
