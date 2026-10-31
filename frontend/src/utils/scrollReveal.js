/**
 * scrollReveal.js
 * ─────────────────────────────────────────────────────────────────────────────
 * One shared IntersectionObserver for every scroll-revealed element on the site.
 *
 * Usage in markup:
 *   <section data-reveal>…</section>                       fade + slight rise
 *   <section data-reveal="fade">…</section>                pure fade
 *   <div data-reveal="scale">…</div>                       fade + rise + tiny scale
 *   <li data-reveal style={{ "--reveal-delay": "120ms" }}>…</li>   staggered
 *
 * Behaviour:
 *  - Each element reveals ONCE: after `.is-revealed` is added it is unobserved,
 *    so scrolling past a section never replays its animation.
 *  - A MutationObserver picks up elements that mount later (route changes,
 *    conditional blocks), so nothing on a newly rendered page stays hidden.
 *  - One passive scroll listener (throttled, not a frame loop) marks elements
 *    the viewport jumped past as revealed, so a keyboard End or scrollbar drag
 *    can never leave a section hidden above the fold.
 *  - Reduced motion, or a browser without IntersectionObserver: everything is
 *    marked visible immediately and no observer runs at all.
 *
 * The hidden state lives in `styles/index.css` under `[data-reveal]`, so the
 * stylesheet and this observer always agree on the class name.
 */

const SELECTOR = "[data-reveal]";
const VISIBLE = "is-revealed";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

let activeObserver = null;

function revealNow(root) {
  if (root.matches?.(SELECTOR)) root.classList.add(VISIBLE);
  root.querySelectorAll?.(SELECTOR).forEach((el) => el.classList.add(VISIBLE));
}

export default function initScrollReveal() {
  if (typeof document === "undefined") return () => {};

  const reduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION).matches;

  if (reduced || typeof IntersectionObserver === "undefined") {
    revealNow(document);
    return () => {};
  }

  const pending = new Set();

  const reveal = (el) => {
    el.classList.add(VISIBLE);
    observer.unobserve(el);
    pending.delete(el);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target); // reveal once, never again
      });
    },
    {
      root: null,
      // Start the reveal once the element has entered the lower part of the
      // viewport, so content is never still animating from off-screen.
      rootMargin: "0px 0px -8% 0px",
      threshold: 0,
    }
  );
  activeObserver = observer;

  const observe = (root) => {
    if (root.matches?.(SELECTOR) && !root.classList.contains(VISIBLE) && !pending.has(root)) {
      pending.add(root);
      observer.observe(root);
    }
    root.querySelectorAll?.(SELECTOR).forEach((el) => {
      if (!el.classList.contains(VISIBLE) && !pending.has(el)) {
        pending.add(el);
        observer.observe(el);
      }
    });
  };

  observe(document.body);

  // A jump (End key, scrollbar drag, route reset) can move the viewport past
  // an element between observer frames, so it never reports an intersection.
  // Reveal anything already above the viewport: it is off-screen, and this
  // keeps the page intact when the visitor scrolls back up.
  let timer = 0;
  const catchUp = () => {
    timer = 0;
    pending.forEach((el) => {
      if (!el.isConnected) pending.delete(el);
      else if (el.getBoundingClientRect().bottom <= 0) reveal(el);
    });
  };
  const onScroll = () => {
    if (!timer) timer = window.setTimeout(catchUp, 120);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  catchUp();

  // Sections rendered after mount (new route, conditional block), and nodes
  // removed by a route change (stop holding references to them).
  const mutations = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node.nodeType === 1) observe(node);
      });
      record.removedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.matches?.(SELECTOR)) {
          observer.unobserve(node);
          pending.delete(node);
        }
        node.querySelectorAll?.(SELECTOR).forEach((el) => {
          observer.unobserve(el);
          pending.delete(el);
        });
      });
    });
  });
  mutations.observe(document.body, { childList: true, subtree: true });

  return () => {
    mutations.disconnect();
    observer.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.clearTimeout(timer);
    pending.clear();
    if (activeObserver === observer) activeObserver = null;
  };
}

/** True while a shared reveal observer is running (used by tests/diagnostics). */
export function isScrollRevealActive() {
  return activeObserver !== null;
}
