/**
 * smoothScroll.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The Lenis lifecycle for the whole site, kept out of component files so the
 * component stays a pure react-refresh component and the instance has exactly
 * one home.
 *
 * Rules:
 *  - ONE Lenis instance at a time. `startSmoothScroll()` destroys a previous
 *    instance before creating another, so Strict Mode double-mounting, route
 *    changes or a stray second call can never run two scroll loops.
 *  - The caller owns the animation frame: `startSmoothScroll()` returns a
 *    cleanup function that cancels the rAF handle and destroys the instance.
 *  - Reduced motion never starts Lenis at all — the browser keeps native
 *    scrolling (keyboard, scrollbar, anchors, assistive tech untouched).
 *  - `allowNestedScroll` keeps dropdown menus, the mobile nav panel and long
 *    form panes scrolling themselves instead of the page.
 *
 * Imported by SmoothScroll.jsx (mount/unmount) and App.jsx (route changes).
 */

import Lenis from "lenis";
import "lenis/dist/lenis.css";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

let instance = null;

/** The live Lenis instance, or null while smooth scrolling is off. */
export function getSmoothScroll() {
  return instance;
}

/**
 * Create the single Lenis instance and its rAF loop.
 * Returns the cleanup function that stops it — call it from a useEffect.
 */
export function startSmoothScroll() {
  if (typeof window === "undefined") return () => {};

  // Reduced motion: native scrolling, no instance, no animation frame.
  if (window.matchMedia(REDUCED_MOTION).matches) return () => {};

  // Safety net: never leave two instances running.
  if (instance) {
    instance.destroy();
    instance = null;
  }

  const lenis = new Lenis({
    lerp: 0.12,
    smoothWheel: true,
    syncTouch: false, // phones keep native touch scrolling (cheaper + familiar)
    allowNestedScroll: true, // dropdowns / mobile menu scroll themselves
    autoRaf: false, // the frame loop below drives it
  });
  instance = lenis;

  let frameId = requestAnimationFrame(function raf(time) {
    lenis.raf(time);
    frameId = requestAnimationFrame(raf);
  });

  return () => {
    cancelAnimationFrame(frameId);
    lenis.destroy();
    if (instance === lenis) instance = null;
  };
}
