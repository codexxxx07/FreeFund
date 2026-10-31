import { useEffect, useRef, useState } from "react";
import Asterisk from "./Asterisk";

/**
 * Cursor-follow asterisk. Desktop only: skipped for reduced motion, touch and
 * coarse pointers. Position is written with a rAF loop rather than React state
 * so pointer movement never re-renders the page.
 */
export default function CursorAsterisk() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sync() {
      setEnabled(finePointer.matches && !reduced.matches);
    }

    sync();
    finePointer.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      finePointer.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    let x = -100;
    let y = -100;
    let frame = 0;

    function draw() {
      frame = 0;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    function onMove(event) {
      x = event.clientX + 14;
      y = event.clientY + 12;
      node.style.opacity = "1";
      if (!frame) frame = window.requestAnimationFrame(draw);
    }

    function onLeave() {
      node.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <span ref={ref} className="ed-cursor" aria-hidden="true" style={{ opacity: 0 }}>
      <Asterisk size={26} />
    </span>
  );
}
