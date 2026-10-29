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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(VISIBLE);
        observer.unobserve(entry.target); // reveal once, never again
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
    if (root.matches?.(SELECTOR) && !root.classList.contains(VISIBLE)) {
      observer.observe(root);
    }
    root.querySelectorAll?.(SELECTOR).forEach((el) => {
      if (!el.classList.contains(VISIBLE)) observer.observe(el);
    });
  };

  observe(document.body);

  // Sections rendered after mount (new route, conditional block).
  const mutations = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node.nodeType === 1) observe(node);
      });
    });
  });
  mutations.observe(document.body, { childList: true, subtree: true });

  return () => {
    mutations.disconnect();
    observer.disconnect();
    if (activeObserver === observer) activeObserver = null;
  };
}

/** True while a shared reveal observer is running (used by tests/diagnostics). */
export function isScrollRevealActive() {
  return activeObserver !== null;
}
