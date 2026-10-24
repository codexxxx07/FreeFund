import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiPause, HiPlay } from "react-icons/hi2";
import { IS_DEMO } from "../../data/constants";

/**
 * Ticker — a slim, accessible, looping strip of open job links.
 *
 * Accessibility contract:
 *  - role="region" + aria-label on the outer wrapper
 *  - Pause/Play button with aria-pressed
 *  - Animation pauses on hover AND :focus-within
 *  - prefers-reduced-motion: animation off, horizontal scroll instead
 *  - Duplicate track items are aria-hidden + tabIndex={-1}
 */
export default function Ticker({ jobs }) {
  const tickerId = useId();
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  // Only render when there is at least one open job
  if (!jobs || jobs.length === 0) return null;

  function workModeShort(mode) {
    if (mode === "Work From Home") return "WFH";
    if (mode === "Work From Office") return "WFO";
    if (mode === "Hybrid") return "Hybrid";
    return mode;
  }

  const regionId = `ticker-region-${tickerId.replace(/:/g, "")}`;
  const pauseId = `ticker-pause-${tickerId.replace(/:/g, "")}`;

  return (
    <div
      role="region"
      aria-label={`Latest open ${IS_DEMO ? "sample " : ""}jobs`}
      aria-describedby={regionId}
      className={`ticker-strip${paused ? " ticker-paused" : ""}`}
    >
      {/* Screen-reader description */}
      <p id={regionId} className="sr-only">
        Scrolling list of currently open job listings. Use the pause button to
        stop the animation.
      </p>

      {/* Pause / Play button */}
      <button
        id={pauseId}
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Play job ticker" : "Pause job ticker"}
        onClick={() => setPaused((p) => !p)}
        className="ticker-btn"
      >
        {paused ? <HiPlay aria-hidden="true" size={13} /> : <HiPause aria-hidden="true" size={13} />}
        <span className="ticker-btn-label">{paused ? "Play" : "Pause"}</span>
      </button>

      {/* Edge-fade mask wrapper */}
      <div className="ticker-mask" aria-hidden="false">
        {/* Scrolling viewport */}
        <div
          ref={trackRef}
          className="ticker-viewport"
        >
          {/* Primary track — interactive */}
          <ul className="ticker-track" aria-label="Job listings">
            {jobs.map((job) => (
              <li key={job.id} className="ticker-item">
                <Link
                  to={`/jobs/${job.id}`}
                  className="ticker-link"
                >
                  <span className="ticker-title">{job.title}</span>
                  <span className="ticker-sep" aria-hidden="true">·</span>
                  <span className="ticker-meta">{job.city === "Other" ? "Remote" : job.city}</span>
                  <span className="ticker-sep" aria-hidden="true">·</span>
                  <span className="ticker-meta">{workModeShort(job.workMode)}</span>
                  <span className="ticker-sep" aria-hidden="true">·</span>
                  <span className="ticker-id">{job.id}</span>
                </Link>
                <span className="ticker-dot" aria-hidden="true" />
              </li>
            ))}
          </ul>

          {/* Duplicate track — aria-hidden, links are tabIndex={-1} */}
          <ul className="ticker-track" aria-hidden="true">
            {jobs.map((job) => (
              <li key={`dup-${job.id}`} className="ticker-item">
                <Link
                  to={`/jobs/${job.id}`}
                  className="ticker-link"
                  tabIndex={-1}
                >
                  <span className="ticker-title">{job.title}</span>
                  <span className="ticker-sep" aria-hidden="true">·</span>
                  <span className="ticker-meta">{job.city === "Other" ? "Remote" : job.city}</span>
                  <span className="ticker-sep" aria-hidden="true">·</span>
                  <span className="ticker-meta">{workModeShort(job.workMode)}</span>
                  <span className="ticker-sep" aria-hidden="true">·</span>
                  <span className="ticker-id">{job.id}</span>
                </Link>
                <span className="ticker-dot" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
