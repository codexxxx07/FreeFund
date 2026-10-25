import { useEffect, useMemo, useRef, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiCheckCircle, HiClipboardDocumentCheck, HiXCircle } from "react-icons/hi2";

/**
 * Browser-based multiple-choice quiz: intro → one question at a time → results
 * with a full review. All state is local; nothing is uploaded or stored.
 *
 * questions: [{ id, question, options: string[], answer: number, explanation? }]
 */
export default function QuizTool({ title, description, questions, icon }) {
  const Icon = icon || HiClipboardDocumentCheck;
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
    if (index === total - 1) setPhase("results");
    else setIndex((value) => value + 1);
  }

  function goPrevious() {
    if (index > 0) setIndex((value) => value - 1);
  }

  if (phase === "intro") {
    return (
      <div className="surface-panel p-6 sm:p-8">
        <span className="icon-tile icon-tile-solid icon-tile-lg">
          <Icon aria-hidden="true" size={24} />
        </span>
        <h3 className="mt-5 text-2xl">{title}</h3>
        <p className="mt-2 max-w-2xl text-muted">{description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          <li className="meta-chip">{total} questions</li>
          <li className="meta-chip">No time limit</li>
          <li className="meta-chip">Results shown at the end</li>
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" className="btn-primary btn-lg" onClick={start}>
            Start test
            <HiArrowRight aria-hidden="true" />
          </button>
        </div>
        <p className="mt-5 text-xs text-muted">
          Practice only — these results are not an official assessment or certification.
        </p>
      </div>
    );
  }

  if (phase === "results") {
    const percent = Math.round((score / total) * 100);
    return (
      <div className="surface-panel p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Results</p>
            <h3 ref={headingRef} tabIndex={-1} className="mt-3 text-3xl focus:outline-none">
              {score} / {total}
            </h3>
            <p className="mt-1 text-muted">{percent}% correct</p>
          </div>
          <div className="sm:text-right">
            <button type="button" className="btn-primary" onClick={start}>
              Try again
            </button>
          </div>
        </div>

        <div className="progress-bar mt-6" role="img" aria-label={`${percent}% correct`}>
          <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
        </div>

        <ol className="mt-7 grid gap-4">
          {questions.map((item, i) => {
            const correct = answers[i] === item.answer;
            const skipped = answers[i] === null;
            return (
              <li key={item.id} className="surface-soft p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className={correct ? "mt-0.5 shrink-0 text-primary" : "mt-0.5 shrink-0 text-destructive"}>
                    {correct ? (
                      <HiCheckCircle aria-hidden="true" size={20} />
                    ) : (
                      <HiXCircle aria-hidden="true" size={20} />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-fg">
                      {i + 1}. {item.question}
                    </p>
                    <p className="mt-1.5 text-sm text-muted">
                      {skipped
                        ? "Not answered. "
                        : `Your answer: ${item.options[answers[i]].replace(/[.!?]+$/, "")}. `}
                      <span className="font-semibold text-fg">
                        Correct: {item.options[item.answer].replace(/[.!?]+$/, "")}.
                      </span>
                    </p>
                    {item.explanation ? (
                      <p className="mt-1.5 text-sm text-muted">{item.explanation}</p>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-xs text-muted">
          Practice results are for your own use. They are not stored, shared, or recognised as a certification.
        </p>
      </div>
    );
  }

  const answered = answers[index] !== null;
  const progress = Math.round((answeredCount / total) * 100);

  return (
    <div className="surface-panel p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">{title}</p>
        <p className="text-sm text-muted" aria-live="polite">
          Question <span className="font-semibold text-fg">{index + 1}</span> of {total}
        </p>
      </div>

      <div className="progress-bar mt-3" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Quiz progress">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          goNext();
        }}
      >
        <fieldset className="border-0 p-0 m-0">
          <legend
            ref={headingRef}
            tabIndex={-1}
            className="text-xl font-semibold text-fg focus:outline-none sm:text-2xl"
          >
            {question.question}
          </legend>

          <div className="mt-5 grid gap-3">
            {question.options.map((option, optionIndex) => (
              <label
                key={option}
                className={`surface-soft flex cursor-pointer items-start gap-3 p-4 transition-colors ${
                  answers[index] === optionIndex ? "border-primary" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  className="field-checkbox mt-1"
                  value={optionIndex}
                  checked={answers[index] === optionIndex}
                  onChange={() => selectOption(optionIndex)}
                />
                <span className="text-sm leading-relaxed sm:text-base">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <button type="button" className="btn-secondary" onClick={goPrevious} disabled={index === 0}>
            <HiArrowLeft aria-hidden="true" />
            Previous
          </button>
          <button type="submit" className="btn-primary" disabled={!answered}>
            {index === total - 1 ? "See results" : "Next question"}
            <HiArrowRight aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
