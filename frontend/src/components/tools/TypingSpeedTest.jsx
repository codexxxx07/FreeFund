import { useEffect, useRef, useState } from "react";
import { HiArrowPath, HiClock, HiPlay } from "react-icons/hi2";
import { typingPassages } from "../../data/practiceQuestions";
import Button from "../editorial/Button";

const DURATION_SECONDS = 60;

function pickPassage(previousIndex) {
  if (typingPassages.length < 2) return { text: typingPassages[0], index: 0 };
  let index = previousIndex;
  while (index === previousIndex) {
    index = Math.floor(Math.random() * typingPassages.length);
  }
  return { text: typingPassages[index], index };
}

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
export default function TypingSpeedTest({ onComplete }) {
  const [passage, setPassage] = useState(
    () => typingPassages[Math.floor(Math.random() * typingPassages.length)] || typingPassages[0],
  );
  const [phase, setPhase] = useState("idle"); // idle | running | done
  const [typed, setTyped] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [result, setResultState] = useState(null);

  const startRef = useRef(null);
  const typedRef = useRef("");
  const inputRef = useRef(null);
  const indexRef = useRef(-1);
  const finishedRef = useRef(false);

  typedRef.current = typed;

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
    if (finishedRef.current) return;
    finishedRef.current = true;
    const stats = evaluate(finalTyped, passage);
    const minutes = Math.max(seconds, 1) / 60;
    const wpm = Math.round(stats.correct / 5 / minutes);
    const accuracy = finalTyped.length ? Math.round((stats.correct / finalTyped.length) * 100) : 100;
    setElapsed(seconds);
    setResultState({
      wpm,
      accuracy,
      correct: stats.correct,
      incorrect: stats.incorrect,
      seconds: Math.round(seconds),
      completed: finalTyped.length >= passage.length,
    });
    setPhase("done");
    onComplete?.({
      score: wpm,
      total: null,
      percent: accuracy,
      detail: `${wpm} WPM · ${accuracy}% accuracy`,
    });
  }

  function reset(withNewPassage = true) {
    if (withNewPassage) {
      const next = pickPassage(indexRef.current);
      indexRef.current = next.index;
      setPassage(next.text);
    }
    finishedRef.current = false;
    startRef.current = null;
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
      finishedRef.current = false;
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
    <div className="typebox">
      <div className="typebox__bar">
        <div>
          <p className="ed-label ed-label--lime">[ Typing sprint · 60 seconds ]</p>
          <h3 className="eq__title" style={{ marginTop: "0.5rem" }}>
            Type the passage below
          </h3>
          <p style={{ marginTop: "0.4rem", fontSize: "0.84rem" }}>
            The clock starts on your first keystroke. Mistakes are highlighted; Backspace fixes them.
          </p>
        </div>
        <div className="typebox__stats" aria-live="polite">
          <span className="ed-badge">
            <HiClock aria-hidden="true" size={12} />
            {phase === "done" ? "Finished" : `${remaining}s left`}
          </span>
          {liveWpm !== null && phase === "running" ? (
            <>
              <span className="ed-badge ed-badge--lime">{liveWpm} WPM</span>
              <span className="ed-badge">{liveAccuracy}%</span>
            </>
          ) : null}
        </div>
      </div>

      <div className="typebox__passage" aria-hidden="true">
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

        <textarea
          ref={inputRef}
          value={typed}
          onChange={handleChange}
          onPaste={(event) => event.preventDefault()}
          disabled={phase === "done"}
          spellCheck={false}
          autoComplete="off"
          aria-label="Type the passage shown above"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            resize: "none",
            border: 0,
            background: "transparent",
            color: "transparent",
            caretColor: "transparent",
            outline: "none",
            padding: "1.1rem",
          }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
        {phase === "done" ? (
          <Button onClick={() => reset(true)} variant="lime">
            <HiArrowPath aria-hidden="true" size={15} />
            Try another passage
          </Button>
        ) : (
          <>
            <Button
              variant="lime"
              onClick={() => {
                startRef.current = Date.now();
                finishedRef.current = false;
                setPhase("running");
                inputRef.current?.focus();
              }}
              disabled={phase === "running"}
            >
              <HiPlay aria-hidden="true" size={15} />
              {phase === "idle" ? "Start sprint" : "Running…"}
            </Button>
            <Button onClick={() => reset(false)}>
              <HiArrowPath aria-hidden="true" size={15} />
              Restart
            </Button>
            <Button
              onClick={() => finish(typedRef.current, secondsSince(startRef.current))}
              disabled={phase !== "running"}
            >
              Finish now
            </Button>
          </>
        )}
      </div>

      {phase === "done" && result ? (
        <div style={{ display: "grid", gap: "0.9rem" }}>
          <p className="ed-label ed-label--lime">[ Result · this attempt is saved locally ]</p>
          <div className="typebox__results">
            <div className="typebox__stat">
              <b>{result.wpm}</b>
              <span>Words / min</span>
            </div>
            <div className="typebox__stat">
              <b>{result.accuracy}%</b>
              <span>Accuracy</span>
            </div>
            <div className="typebox__stat">
              <b>{result.correct}</b>
              <span>Correct chars</span>
            </div>
            <div className="typebox__stat">
              <b>{result.incorrect}</b>
              <span>Errors</span>
            </div>
          </div>
          <p style={{ fontSize: "0.8rem" }}>
            {result.completed ? "You finished the full passage in " : "Time ran out after "}
            {result.seconds} {result.seconds === 1 ? "second" : "seconds"}. Practice only — not a certification.
          </p>
        </div>
      ) : null}
    </div>
  );
}
