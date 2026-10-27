import { useEffect, useRef, useState } from "react";

const DURATION = 1400; // medium speed

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function AnimatedCounter({
  from = 0,
  to = 100,
  duration = DURATION,
  className = "",
  suffix = "%",
}) {
  const [value, setValue] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (hasAnimated) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setValue(to);
      setHasAnimated(true);
      return undefined;
    }

    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          function animate(timestamp) {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentValue = Math.round(from + (to - from) * easedProgress);
            setValue(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(to);
            }
          }

          requestAnimationFrame(animate);
          observer.unobserve(element);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [duration, from, hasAnimated, to]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {value}
      {suffix}
    </span>
  );
}
