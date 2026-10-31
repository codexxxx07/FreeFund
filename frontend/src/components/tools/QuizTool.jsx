import { useEffect, useMemo, useRef, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiCheck, HiXMark } from "react-icons/hi2";
import Button from "../editorial/Button";

const LETTERS = ["A", "B", "C", "D", "E"];

/**
 * Browser-based multiple-choice drill: intro → one question at a time →
 * results with a full review. All state is local; `onComplete` is called once
 * when the last question is submitted so the page can store an attempt.
 *
 * questions: [{ id, question, options: string[], answer: number, explanation? }]
 */
export default function QuizTool({ title, description, questions, minutes, onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro | quiz | results
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const headingRef = useRef(null);

  const total = questions.length;
  const question = questions[index];
  const answeredCount = answers.filter((value) => value !== null).length;

  const score = useMemo(
    () => questions.reduce((sum, item, i) => (answers[i] === item.answer ? sum + 1 : sum), 0),
    [answers, questions],
  );

  useEffect(() => {
    if (phase === "intro") return;
    headingRef.current?.focus();
  }, [phase, index]);

  function start() {
    setAnswers(questions.map(() => null));
    setIndex(0);
    setPhase("quiz");
  }

  function selectOption(optionIndex) {
    setAnswers((current) => {
      const next = [...current];
      next[index] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (index === total - 1) {
      setPhase("results");
      onComplete?.({ score, total, percent: Math.round((score / total) * 100) });
    } else {
      setIndex((value) => value + 1);
    }
  }

  if (phase === "intro") {
    return (
      <div className="eq">
        <div className="eq__top">
          <div>
            <p className="ed-label ed-label--lime">[ Drill · no login ]</p>
            <h3 className="eq__title" style={{ marginTop: "0.5rem" }}>
              {title}
            </h3>
          </div>
          <span className="eq__meta">
            {total} questions{minutes ? ` · ${minutes} min` : ""}
          </span>
        </div>

        <p style={{ maxWidth: "62ch", fontSize: "0.95rem", lineHeight: 1.65 }}>{description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          <span className="ed-badge">{total} questions</span>
          <span className="ed-badge">No time limit</span>
          <span className="ed-badge">Results stay on this device</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          <Button onClick={start} variant="lime">
            Start drill
            <HiArrowRight aria-hidden="true" size={15} />
          </Button>
        </div>

        <p style={{ fontSize: "0.76rem" }}>
          Practice only — this is not an official assessment, and no employer receives your result.
        </p>
      </div>
    );
  }

  if (phase === "results") {
    const percent = Math.round((score / total) * 100);
    return (
      <div className="eq">
        <div className="eq__top">
          <div>
            <p className="ed-label ed-label--lime">[ Result ]</p>
            <p className="eq__score" style={{ marginTop: "0.6rem" }} aria-live="polite">
              {score}/{total}
            </p>
            <p className="eq__meta" style={{ marginTop: "0.5rem" }}>
              {percent}% correct · review below
            </p>
          </div>
          <Button onClick={start}>
            Try again
            <HiArrowRight aria-hidden="true" size={15} />
          </Button>
        </div>

        <div className="eq__progress" role="img" aria-label={`${percent}% correct`}>
          <span style={{ width: `${percent}%` }} />
        </div>

        <div className="eq__review">
          {questions.map((item, i) => {
            const correct = answers[i] === item.answer;
            const skipped = answers[i] === null;
            return (
              <div className="eq__review-item" key={item.id}>
                <p className="eq__review-q">
                  <span style={{ color: correct ? "var(--lime)" : "var(--danger)", marginRight: "0.4rem" }}>
                    {correct ? <HiCheck aria-hidden="true" size={14} /> : <HiXMark aria-hidden="true" size={14} />}
                  </span>
                  {i + 1}. {item.question}
                </p>
                <p className="eq__review-a">
                  {skipped
                    ? "Not answered. "
                    : `Your answer: ${item.options[answers[i]]}. `}
                  <strong>Correct: {item.options[item.answer]}.</strong>
                </p>
                {item.explanation ? <p className="eq__review-a">{item.explanation}</p> : null}
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: "0.74rem" }}>
          This attempt was recorded only in this browser so the progress panel can count it. Nothing was uploaded.
        </p>
      </div>
    );
  }

  const answered = answers[index] !== null;
  const progress = Math.round((answeredCount / total) * 100);

  return (
    <div className="eq">
      <div className="eq__top">
        <div>
          <p className="ed-label ed-label--lime">[ {title} ]</p>
          <p className="eq__meta" style={{ marginTop: "0.4rem" }} aria-live="polite">
            Question {index + 1} of {total}
          </p>
        </div>
        <span className="eq__meta">{answeredCount} answered</span>
      </div>

      <div className="eq__progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          goNext();
        }}
      >
        <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
          <legend
            ref={headingRef}
            tabIndex={-1}
            className="eq__question"
            style={{ outline: "none", whiteSpace: "pre-line" }}
          >
            {question.question}
          </legend>

          <div className="eq__options">
            {question.options.map((option, optionIndex) => {
              const selected = answers[index] === optionIndex;
              return (
                <button
                  type="button"
                  key={option}
                  className={`eq__option${selected ? " is-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => selectOption(optionIndex)}
                >
                  <span className="eq__key" aria-hidden="true">
                    {LETTERS[optionIndex]}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="eq__foot">
          <button
            type="button"
            className="cg-back"
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            disabled={index === 0}
          >
            <HiArrowLeft aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: "0.35rem" }} />
            Previous
          </button>
          <Button type="submit" variant="lime" disabled={!answered}>
            {index === total - 1 ? "See result" : "Next question"}
            <HiArrowRight aria-hidden="true" size={15} />
          </Button>
        </div>
      </form>
    </div>
  );
}
