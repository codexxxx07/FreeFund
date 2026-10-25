import { useEffect, useRef, useState } from "react";
import { HiArrowPath, HiClock, HiPlay } from "react-icons/hi2";
import { typingPassages } from "../../data/practiceQuestions";

const DURATION_SECONDS = 60;

function pickPassage(previousIndex) {
  if (typingPassages.length < 2) return { text: typingPassages[0], index: 0 };
  let index = previousIndex;
  while (index === previousIndex) {
    index = Math.floor(Math.random() * typingPassages.length);
  }
  return { text: typingPassages[index], index };
}

/** Whole seconds elapsed since `start`, never less than 1, guarding a null start. */
function secondsSince(startAt) {
  if (!startAt) return 1;
  return Math.max((Date.now() - startAt) / 1000, 1);
}

function evaluate(typed, target) {
  let correct = 0;
  let incorrect = 0;
  for (let i = 0; i < typed.length; i += 1) {
    if (typed[i] === target[i]) correct += 1;
    else incorrect += 1;
  }
  const untyped = Math.max(0, target.length - typed.length);
  return { correct, incorrect, untyped };
}

/**
 * Typing speed test: 60-second run against a short passage.
 * WPM = correct characters / 5 ÷ minutes elapsed. Everything runs locally.
 */
export default function TypingSpeedTest() {
  const [passage, setPassage] = useState(() => typingPassages[Math.floor(Math.random() * typingPassages.length)] || typingPassages[0]);
  const [phase, setPhase] = useState("idle"); // idle | running | done
  const [typed, setTyped] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [result, setResultState] = useState(null);
  const [focused, setFocused] = useState(false);

  const startRef = useRef(null);
  const typedRef = useRef("");
  const inputRef = useRef(null);
  const indexRef = useRef(-1);

  typedRef.current = typed;

  // Countdown for the active run.
  useEffect(() => {
    if (phase !== "running") return undefined;
    const timer = window.setInterval(() => {
      const seconds = (Date.now() - startRef.current) / 1000;
      if (seconds >= DURATION_SECONDS) {
        window.clearInterval(timer);
        setElapsed(DURATION_SECONDS);
        finish(typedRef.current, DURATION_SECONDS);
      } else {
        setElapsed(seconds);
      }
    }, 200);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const counts = evaluate(typed, passage);
  const liveMinutes = Math.max(elapsed, 1) / 60;
  const liveWpm = phase === "running" ? Math.round(counts.correct / 5 / liveMinutes) : null;
  const liveAccuracy = typed.length ? Math.round((counts.correct / typed.length) * 100) : 100;

  function finish(finalTyped, seconds) {
    const stats = evaluate(finalTyped, passage);
    const minutes = Math.max(seconds, 1) / 60;
    setElapsed(seconds);
    setResultState({
      wpm: Math.round(stats.correct / 5 / minutes),
      accuracy: finalTyped.length ? Math.round((stats.correct / finalTyped.length) * 100) : 100,
      correct: stats.correct,
      incorrect: stats.incorrect,
      seconds: Math.round(seconds),
      completed: finalTyped.length >= passage.length,
    });
    setPhase("done");
  }

  function reset(withNewPassage = true) {
    if (withNewPassage) {
      const next = pickPassage(indexRef.current);
      indexRef.current = next.index;
      setPassage(next.text);
    }
    setTyped("");
    typedRef.current = "";
    setElapsed(0);
    setResultState(null);
    setPhase("idle");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handleChange(event) {
    const value = event.target.value.slice(0, passage.length);
    if (phase === "idle" && value.length > 0) {
      startRef.current = Date.now();
      setPhase("running");
    }
    setTyped(value);
    typedRef.current = value;
    if (value.length === passage.length && phase !== "done") {
      finish(value, secondsSince(startRef.current));
    }
  }

  const remaining = Math.max(0, Math.ceil(DURATION_SECONDS - elapsed));

  return (
    <div className="surface-panel p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Typing speed test</p>
          <h3 className="mt-3 text-2xl">Type the passage below</h3>
          <p className="mt-1.5 text-sm text-muted">
            The clock starts on your first keystroke and stops after 60 seconds or when you finish the passage.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" aria-live="polite">
          <span className="meta-chip">
            <HiClock aria-hidden="true" />
            {phase === "done" ? "Finished" : `${remaining}s left`}
          </span>
          {liveWpm !== null && phase === "running" ? (
            <>
              <span className="meta-chip">
                <span className="sr-only">Current speed: </span>
                {liveWpm} WPM
              </span>
              <span className="meta-chip">
                <span className="sr-only">Current accuracy: </span>
                {liveAccuracy}%
              </span>
            </>
          ) : null}
        </div>
      </div>

      <div className="relative mt-6">
        <div className="type-canvas surface-inset p-4 sm:p-5" aria-hidden="true">
          {Array.from(passage).map((char, i) => {
            let state = "type-char-pending";
            if (i < typed.length) state = typed[i] === char ? "type-char-correct" : "type-char-wrong";
            else if (i === typed.length && phase !== "done") state += " type-char-current";
            return (
              <span key={`${i}-${char}`} className={`type-char ${state}`}>
                {char}
              </span>
            );
          })}
        </div>

        <textarea
          ref={inputRef}
          value={typed}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onPaste={(event) => {
            // Pasting would produce a meaningless speed and accuracy result.
            event.preventDefault();
          }}
          disabled={phase === "done"}
          spellCheck={false}
          autoComplete="off"
          aria-label="Type the passage shown above"
          aria-describedby="typing-help"
          className="absolute inset-0 h-full w-full resize-none overflow-hidden border-0 bg-transparent p-4 text-transparent caret-transparent outline-none sm:p-5"
        />

        {phase === "idle" && !focused ? (
          <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-xl bg-bg/75 backdrop-blur-[2px]">
            <span className="surface-soft inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold">
              <HiPlay aria-hidden="true" />
              Click here or start typing to begin
            </span>
          </div>
        ) : null}
      </div>

      <p id="typing-help" className="mt-3 text-xs text-muted">
        Type the passage exactly as shown. Mistakes are highlighted in red and can be corrected with Backspace.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
        {phase === "done" ? (
          <button type="button" className="btn-primary" onClick={() => reset(true)}>
            <HiArrowPath aria-hidden="true" />
            Try another passage
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                startRef.current = Date.now();
                setPhase("running");
                inputRef.current?.focus();
              }}
              disabled={phase === "running"}
            >
              <HiPlay aria-hidden="true" />
              {phase === "idle" ? "Start test" : "Running…"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => reset(false)}>
              <HiArrowPath aria-hidden="true" />
              Restart
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => finish(typedRef.current, secondsSince(startRef.current))}
              disabled={phase !== "running"}
            >
              Finish now
            </button>
          </>
        )}
      </div>

      {phase === "done" && result ? (
        <div className="mt-6 border-t border-line pt-6">
          <p className="eyebrow">Results</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Speed</p>
              <p className="mt-1 text-3xl font-bold text-fg">{result.wpm}</p>
              <p className="text-sm text-muted">words per minute</p>
            </div>
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Accuracy</p>
              <p className="mt-1 text-3xl font-bold text-fg">{result.accuracy}%</p>
              <p className="text-sm text-muted">characters typed correctly</p>
            </div>
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Correct</p>
              <p className="mt-1 text-3xl font-bold text-fg">{result.correct}</p>
              <p className="text-sm text-muted">characters</p>
            </div>
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Errors</p>
              <p className="mt-1 text-3xl font-bold text-fg">{result.incorrect}</p>
              <p className="text-sm text-muted">characters</p>
            </div>
          </div>
          <p className="mt-5 text-xs text-muted">
            {result.completed ? "You finished the full passage in " : "Time ran out after "}
            {result.seconds} {result.seconds === 1 ? "second" : "seconds"}. This score is for your own practice and is
            not an official certification.
          </p>
        </div>
      ) : null}
    </div>
  );
}
