import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiArrowTrendingUp,
  HiCheck,
  HiMagnifyingGlass,
  HiPlay,
  HiXMark,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import Asterisk from "../components/editorial/Asterisk";
import Button from "../components/editorial/Button";
import QuizTool from "../components/tools/QuizTool";
import TypingSpeedTest from "../components/tools/TypingSpeedTest";
import { aptitudeQuestions, PRACTICE_TOOL_CATALOG, TOOL_CATEGORIES } from "../data/practiceToolCatalog";
import {
  clearProgress,
  countAttempts,
  getBest,
  getStreak,
  getWeekActivity,
  loadProgress,
  saveAttempt,
} from "../utils/practiceProgress";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const QUICKFIRE = aptitudeQuestions.slice(0, 3);

function Quickfire({ onRecord, onOpenFull }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => QUICKFIRE.map(() => null));
  const [finished, setFinished] = useState(false);
  const recordedRef = useRef(false);

  function choose(optionIndex) {
    setAnswers((current) => {
      const next = [...current];
      next[index] = optionIndex;
      return next;
    });
  }

  function next() {
    if (index === QUICKFIRE.length - 1) {
      const correct = QUICKFIRE.reduce((sum, q, i) => (answers[i] === q.answer ? sum + 1 : sum), 0);
      setFinished(true);
      if (!recordedRef.current) {
        recordedRef.current = true;
        onRecord({
          toolId: "quickfire",
          name: "Quickfire · 3 questions",
          score: correct,
          total: QUICKFIRE.length,
          percent: Math.round((correct / QUICKFIRE.length) * 100),
          detail: `${correct}/${QUICKFIRE.length} correct`,
        });
      }
    } else {
      setIndex((value) => value + 1);
    }
  }

  function restart() {
    recordedRef.current = false;
    setAnswers(QUICKFIRE.map(() => null));
    setIndex(0);
    setFinished(false);
  }

  const question = QUICKFIRE[index];
  const selected = answers[index];
  const score = QUICKFIRE.reduce((sum, q, i) => (answers[i] === q.answer ? sum + 1 : sum), 0);

  return (
    <div className="tl-quickfire" aria-labelledby="quickfire-title">
      <div className="tl-quickfire__head">
        <div>
          <p className="ed-label ed-label--lime">
            <Asterisk size={12} /> [ Live mini-demo ]
          </p>
          <h2 id="quickfire-title" className="tl-quickfire__title" style={{ marginTop: "0.5rem" }}>
            Quickfire: <em>three questions.</em>
          </h2>
        </div>
        <span className="ed-badge ed-badge--lime">
          {finished ? `Score ${score}/${QUICKFIRE.length}` : `${index + 1} / ${QUICKFIRE.length}`}
        </span>
      </div>

      {finished ? (
        <div style={{ display: "grid", gap: "1rem" }}>
          <p className="tl-quickfire__score">
            {score}/{QUICKFIRE.length}
          </p>
          <p className="tl-quickfire__result">
            {score === QUICKFIRE.length
              ? "Clean sweep. Move to the full aptitude set and see whether the pace holds."
              : "Every miss above is a repeatable pattern, not a personality flaw. Open the full set for explanations."}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            <Button variant="lime" onClick={onOpenFull}>
              Open the full aptitude drill
              <HiArrowRight aria-hidden="true" size={15} />
            </Button>
            <Button onClick={restart}>Try quickfire again</Button>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "0.85rem" }}>
          <p className="tl-quickfire__q">{question.question}</p>
          <div className="tl-quickfire__options">
            {question.options.map((option, optionIndex) => {
              const isSelected = selected === optionIndex;
              const showCorrect = selected !== null && optionIndex === question.answer;
              const showWrong = isSelected && optionIndex !== question.answer;
              return (
                <button
                  type="button"
                  key={option}
                  className={`tl-qopt${showCorrect ? " is-correct" : ""}${showWrong ? " is-wrong" : ""}`}
                  aria-pressed={isSelected}
                  onClick={() => choose(optionIndex)}
                >
                  <span className="tl-qopt__key" aria-hidden="true">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span>{option}</span>
                  {showCorrect ? <HiCheck aria-hidden="true" style={{ marginLeft: "auto" }} /> : null}
                </button>
              );
            })}
          </div>

          {selected !== null ? (
            <p style={{ fontSize: "0.84rem", lineHeight: 1.55, color: "var(--muted)" }}>
              <strong style={{ color: "var(--lime)" }}>Why:</strong> {question.explanation}
            </p>
          ) : null}

          <div className="tl-quickfire__foot">
            <span className="ed-label" style={{ letterSpacing: "0.1em" }}>
              No login · answers stay here
            </span>
            <Button variant="lime" onClick={next} disabled={selected === null}>
              {index === QUICKFIRE.length - 1 ? "See score" : "Next question"}
              <HiArrowRight aria-hidden="true" size={15} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolStage({ tool, onClose, onComplete }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="tl-stage" role="dialog" aria-modal="true" aria-label={`${tool.name} practice stage`}>
      <div className="tl-stage__panel">
        <div className="tl-stage__bar">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <span className="ed-badge ed-badge--lime">{tool.category}</span>
            <span style={{ fontSize: "0.78rem", color: "var(--paper)", fontWeight: 600 }}>{tool.name}</span>
            <span className="ed-label">{tool.difficulty} · {tool.minutes} min</span>
          </div>
          <button ref={closeRef} type="button" className="tl-stage__close" onClick={onClose} aria-label="Close practice stage">
            <HiXMark size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="tl-stage__body">
          {tool.type === "typing" ? (
            <TypingSpeedTest
              onComplete={(result) =>
                onComplete({
                  toolId: tool.id,
                  name: tool.name,
                  ...result,
                })
              }
            />
          ) : (
            <QuizTool
              title={tool.name}
              description={tool.blurb}
              questions={tool.questions}
              minutes={tool.minutes}
              onComplete={(result) =>
                onComplete({
                  toolId: tool.id,
                  name: tool.name,
                  ...result,
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function PracticeTools() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [progress, setProgress] = useState(loadProgress);
  const [activeTool, setActiveTool] = useState(null);
  const triggerRef = useRef(null);

  const attempts = progress.attempts;
  const streak = getStreak(attempts);
  const week = getWeekActivity(attempts);
  const recent = attempts.slice(0, 5);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return PRACTICE_TOOL_CATALOG.filter((tool) => {
      const matchesCategory = category === "All" || tool.category === category;
      const matchesTerm =
        !term ||
        `${tool.name} ${tool.category} ${tool.blurb}`.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });
  }, [query, category]);

  const record = useCallback((attempt) => {
    const next = saveAttempt(attempt);
    setProgress(next);
  }, []);

  const openTool = (tool, event) => {
    triggerRef.current = event?.currentTarget || null;
    setActiveTool(tool);
  };

  const closeTool = useCallback(() => {
    setActiveTool(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  function resetProgress() {
    setProgress(clearProgress());
  }

  return (
    <div>
      <PageMeta
        title="Free Practice Tools — Aptitude, Typing, English"
        description="A free practice floor for job seekers: aptitude, coding logic, interview scenarios, typing, English and mock tests. Start instantly, track your streak locally, no login."
        canonicalPath="/practice-tools"
      />

      {/* ── Tool hub hero ────────────────────────────────────────────── */}
      <section className="tl-hero" aria-labelledby="tools-title">
        <div className="ed-shell">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <span className="ed-badge ed-badge--lime">[ Tool hub ]</span>
            <span className="ed-badge">8 drills</span>
            <span className="ed-badge">No login</span>
            <span className="ed-badge">Runs locally</span>
          </div>

          <h1 id="tools-title" className="ed-display tl-title">
            The practice
            <br />
            <em>floor.</em>
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "1.5rem",
              marginTop: "1.5rem",
            }}
          >
            <p className="ed-lead" style={{ maxWidth: "48ch" }}>
              Ten minutes on one weak spot beats an hour of scrolling tips. Search a drill, start it in one
              click, and let the panel on the right remember what you have done.
            </p>
            <p className="ed-note" style={{ maxWidth: "30ch" }}>
              <Asterisk size={12} />
              <span>Nothing is uploaded. Results live in this browser only.</span>
            </p>
          </div>

          <div className="tl-search">
            <HiMagnifyingGlass aria-hidden="true" size={19} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try 'typing', 'interview' or 'SQL'"
              aria-label="Search practice tools"
            />
            <span className="tl-search__count" aria-live="polite">
              {filtered.length} of {PRACTICE_TOOL_CATALOG.length} tools
            </span>
          </div>

          <div className="tl-chips" role="group" aria-label="Filter tools by category">
            {TOOL_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className={`tl-chip${category === item ? " is-active" : ""}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item === "All" ? "[ All ]" : item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bento + progress ─────────────────────────────────────────── */}
      <div className="ed-shell">
        <div className="tl-body">
          <div className="tl-main">
            {filtered.length ? (
              <div className="tl-bento">
                {filtered.map((tool) => {
                  const best = getBest(attempts, tool.id);
                  const tries = countAttempts(attempts, tool.id);
                  return (
                    <button
                      type="button"
                      key={tool.id}
                      className={`tl-card${tool.wide ? " tl-card--wide" : ""}`}
                      onClick={(event) => openTool(tool, event)}
                      aria-label={`Start ${tool.name}`}
                    >
                      <span className="tl-card__kicker">
                        <span>
                          {tool.category} · {tool.difficulty}
                        </span>
                        <span aria-hidden="true">↗</span>
                      </span>
                      <span className="tl-card__title">{tool.name}</span>
                      <span className="tl-card__desc">{tool.blurb}</span>
                      <span className="tl-card__meta">
                        <span>{tool.minutes} min</span>
                        <span>
                          {tool.type === "typing" ? "60 sec" : `${tool.questions.length} questions`}
                        </span>
                        <span>{tries === 0 ? "No attempts yet" : `${tries} attempt${tries === 1 ? "" : "s"}`}</span>
                        {best !== null ? (
                          <span className="tl-card__best">Best {best}%</span>
                        ) : null}
                      </span>
                      <span className="tl-card__start" aria-hidden="true">
                        Start <HiPlay size={11} />
                      </span>
                    </button>
                  );
                })}

                <Quickfire
                  onRecord={record}
                  onOpenFull={() => openTool(PRACTICE_TOOL_CATALOG[0])}
                />
              </div>
            ) : (
              <div style={{ border: "1px solid var(--line)", padding: "2rem", background: "var(--surface)" }}>
                <p className="ed-label ed-label--lime">[ No match ]</p>
                <h2 className="ed-display" style={{ fontSize: "2rem", marginTop: "0.6rem" }}>
                  Nothing under this filter.
                </h2>
                <p style={{ marginTop: "0.6rem", maxWidth: "48ch" }}>
                  Try “interview”, “typing” or clear the category. Every drill here is free and needs no
                  account.
                </p>
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                  <Button
                    variant="lime"
                    onClick={() => {
                      setQuery("");
                      setCategory("All");
                    }}
                  >
                    Clear filters
                  </Button>
                  <Button to="/career-guidance">Get a direction instead</Button>
                </div>
              </div>
            )}
          </div>

          <aside className="tl-aside" aria-label="Your practice progress">
            <div className="tl-panel">
              <p className="tl-panel__title">
                <span>
                  <HiArrowTrendingUp aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: "0.35rem" }} />
                  Your progress
                </span>
                <span>[ Local ]</span>
              </p>

              <div className="tl-streak">
                <span className="tl-streak__num">{streak}</span>
                <span className="tl-streak__label">
                  day streak
                  <br />
                  {streak === 0 ? "Start with one drill today." : "Keep it small. Keep it daily."}
                </span>
              </div>

              <div className="tl-week" aria-label="This week's activity">
                {week.map((done, index) => (
                  <span
                    className={`tl-week__day${done ? " is-done" : ""}`}
                    key={`${DAY_LABELS[index]}-${index}`}
                    title={done ? "Practised" : "No attempt"}
                  >
                    {DAY_LABELS[index]}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: "0.76rem", lineHeight: 1.55 }}>
                {attempts.length === 0
                  ? "Attempts you finish appear here, including the inline quickfire."
                  : `${attempts.length} attempt${attempts.length === 1 ? "" : "s"} stored on this device.`}
              </p>
            </div>

            <div className="tl-panel">
              <p className="tl-panel__title">
                <span>Recent attempts</span>
                <span>{recent.length ? `${recent.length}/5` : "Empty"}</span>
              </p>

              {recent.length ? (
                <div className="tl-attempts">
                  {recent.map((attempt) => (
                    <div className="tl-attempt" key={attempt.id}>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ color: "var(--paper)", fontSize: "0.82rem", fontWeight: 500 }}>
                          {attempt.name}
                        </p>
                        <p className="tl-attempt__meta">
                          {new Date(attempt.at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </p>
                      </div>
                      <span className="tl-attempt__score">
                        {attempt.detail || (attempt.total ? `${attempt.score}/${attempt.total}` : `${attempt.percent}%`)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="tl-empty">
                  No attempts yet. Pick any card and finish one round — the panel updates as soon as you do.
                </p>
              )}

              {attempts.length ? (
                <button type="button" className="tl-reset" onClick={resetProgress}>
                  Clear local progress
                </button>
              ) : null}
            </div>

            <div className="tl-panel">
              <p className="tl-panel__title">
                <span>Not sure where to start?</span>
              </p>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.6, marginTop: "0.75rem" }}>
                If you are applying to support or operations roles, start with Aptitude, then Email
                Etiquette. For tech roles, start with Logic &amp; Coding.
              </p>
              <Link to="/career-guidance" className="ed-link" style={{ marginTop: "0.9rem" }}>
                Take the career quiz
                <HiArrowRight aria-hidden="true" size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {activeTool ? (
        <ToolStage tool={activeTool} onClose={closeTool} onComplete={record} />
      ) : null}
    </div>
  );
}
