import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCalendarDays,
  HiCheck,
  HiClock,
  HiSparkles,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import WhatsAppCta from "../components/common/WhatsAppCta";
import Asterisk from "../components/editorial/Asterisk";
import Button from "../components/editorial/Button";
import SectionLabel from "../components/editorial/SectionLabel";
import { careerArticles } from "../data/careerArticles";
import { fitOrder, fitQuestions, getFitResult, successStories } from "../data/careerFit";

const TIME_SLOTS = ["10:00 AM", "12:30 PM", "4:00 PM", "6:30 PM"];

function upcomingDays(count) {
  const days = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() !== 0) days.push(new Date(cursor));
  }
  return days;
}

export default function CareerGuidance() {
  const [phase, setPhase] = useState("quiz"); // quiz | result
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => fitQuestions.map(() => null));
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [storyIndex, setStoryIndex] = useState(0);

  const questionRef = useRef(null);
  const resultRef = useRef(null);
  const shouldScroll = useRef(false);

  const days = useMemo(() => upcomingDays(5), []);
  const result = useMemo(() => getFitResult(answers), [answers]);
  const question = fitQuestions[index];
  const answeredCount = answers.filter(Boolean).length;

  useEffect(() => {
    if (phase === "quiz") questionRef.current?.focus({ preventScroll: true });
  }, [index, phase]);

  useEffect(() => {
    if (phase !== "result" || !shouldScroll.current) return;
    shouldScroll.current = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    resultRef.current?.focus({ preventScroll: true });
  }, [phase]);

  function choose(cluster) {
    const next = [...answers];
    next[index] = cluster;
    setAnswers(next);
    if (index === fitQuestions.length - 1) {
      shouldScroll.current = true;
      setPhase("result");
    } else {
      setIndex(index + 1);
    }
  }

  function back() {
    if (index > 0) setIndex(index - 1);
  }

  function restart() {
    setAnswers(fitQuestions.map(() => null));
    setIndex(0);
    setPhase("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selectedDayLabel = days[selectedDay]?.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const requestSubject = selectedTime
    ? `Counselling request · ${selectedDayLabel} at ${selectedTime}`
    : "";
  const requestHref = `/contact?topic=candidate&subject=${encodeURIComponent(requestSubject)}`;

  return (
    <div>
      <PageMeta
        title="Career Fit Quiz, Roadmap & 1:1 Guidance"
        description="Take a five-question career fit quiz, get realistic role suggestions, a skill-gap roadmap and salary bands, then request a 1:1 counselling slot. No login."
        canonicalPath="/career-guidance"
      />

      {/* ── Quiz hero ────────────────────────────────────────────────── */}
      <section className="cg-hero" aria-labelledby="guidance-title">
        <div className="ed-shell">
          <div className="cg-hero__top">
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <span className="ed-badge ed-badge--lime">[ Career fit ]</span>
                <span className="ed-badge">5 questions</span>
                <span className="ed-badge">About 90 seconds</span>
              </div>
              <h1 id="guidance-title" className="ed-display cg-title">
                What should
                <br />
                you do <em>next?</em>
              </h1>
            </div>

            <p className="ed-lead" style={{ maxWidth: "38ch", paddingBottom: "0.5rem" }}>
              Not a personality test. Five choices about how you like to work, followed by a concrete
              direction, a skill-gap plan and the salary band to check before you commit.
            </p>
          </div>

          <div className="cg-quiz">
            {phase === "quiz" ? (
              <>
                <div className="cg-quiz__head">
                  <p className="ed-label ed-label--lime">
                    <Asterisk size={12} /> Question {String(index + 1).padStart(2, "0")} / 05
                  </p>
                  <div className="cg-dots" aria-hidden="true">
                    {fitQuestions.map((item, i) => (
                      <span
                        key={item.id}
                        className={`cg-dot${i < index ? " is-done" : ""}${i === index ? " is-current" : ""}`}
                      />
                    ))}
                  </div>
                  <span className="ed-label">{answeredCount} answered</span>
                </div>

                <h2 className="cg-quiz__q" ref={questionRef} tabIndex={-1} style={{ outline: "none" }}>
                  {question.prompt}
                </h2>

                <div className="cg-options" role="group" aria-labelledby="guidance-title">
                  {question.options.map((option, optionIndex) => (
                    <button
                      type="button"
                      key={option.label}
                      className="cg-option"
                      onClick={() => choose(option.cluster)}
                    >
                      <span className="cg-option__key" aria-hidden="true">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span>{option.label}</span>
                      <HiArrowRight className="cg-option__arrow" aria-hidden="true" size={17} />
                    </button>
                  ))}
                </div>

                <div className="cg-quiz__foot">
                  <button type="button" className="cg-back" onClick={back} disabled={index === 0}>
                    <HiArrowLeft aria-hidden="true" size={13} style={{ verticalAlign: "-2px", marginRight: "0.35rem" }} />
                    Back
                  </button>
                  <p className="ed-label" style={{ letterSpacing: "0.06em", textTransform: "none" }}>
                    No email required. Answers stay in this tab.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="cg-quiz__head">
                  <p className="ed-label ed-label--lime">
                    <Asterisk size={12} /> Result ready
                  </p>
                  <div className="cg-dots" aria-hidden="true">
                    {fitQuestions.map((item) => (
                      <span key={item.id} className="cg-dot is-done" />
                    ))}
                  </div>
                  <span className="ed-label">5 / 5 answered</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", paddingTop: "1.5rem" }}>
                  <div>
                    <p className="cg-quiz__q" style={{ padding: 0, maxWidth: "22ch" }}>
                      {result.cluster.name}
                    </p>
                    <p style={{ marginTop: "0.6rem", fontSize: "0.9rem" }}>
                      {result.tally[result.cluster.key]} of 5 answers point this way. Read the detail below
                      before you agree with it.
                    </p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                    <a href="#your-result" className="ed-btn ed-btn--lime">
                      See the plan
                      <HiArrowRight aria-hidden="true" size={15} />
                    </a>
                    <Button onClick={restart}>Retake</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Result + roadmap ─────────────────────────────────────────── */}
      <section
        className="ed-section"
        id="your-result"
        aria-labelledby="result-title"
        ref={resultRef}
        tabIndex={-1}
        style={{ outline: "none" }}
      >
        <div className="ed-shell">
          <SectionLabel aside="[ Indicative, not a verdict ]">Your result</SectionLabel>

          {phase === "result" ? (
            <div className="cg-result" style={{ marginTop: "1.5rem" }}>
              <div className="cg-result__hero">
                <p className="cg-result__label">
                  <HiSparkles aria-hidden="true" style={{ verticalAlign: "-3px", marginRight: "0.4rem" }} />
                  Recommended direction
                </p>
                <h2 id="result-title" className="cg-result__cluster">
                  {result.cluster.name}
                </h2>
                <p className="cg-result__copy">{result.cluster.summary}</p>
                <div className="cg-result__facts">
                  <span className="ed-badge ed-badge--lime">{result.cluster.salary}</span>
                  <span className="ed-badge">{result.cluster.demand}</span>
                  <span className="ed-badge">{result.cluster.demandTone}</span>
                </div>
              </div>

              <div style={{ display: "grid", gap: "1.5rem" }}>
                <div>
                  <p className="ed-label ed-label--lime" style={{ marginBottom: "0.75rem" }}>
                    Roles to search for
                  </p>
                  <div className="cg-roles">
                    {result.cluster.roles.map((role) => (
                      <div className="cg-role" key={role.name}>
                        <span className="cg-role__name">{role.name}</span>
                        <span className="cg-role__pay">{role.pay}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: "0.6rem", fontSize: "0.74rem", lineHeight: 1.5 }}>
                    Entry-level bands for India, indicative only. Verify against live listings in your city
                    before quoting a number.
                  </p>
                </div>

                <div>
                  <p className="ed-label ed-label--lime" style={{ marginBottom: "0.75rem" }}>
                    Skill-gap roadmap
                  </p>
                  <div className="cg-roadmap">
                    {result.cluster.roadmap.map((step, stepIndex) => (
                      <div className="cg-phase" key={step.title}>
                        <span className="cg-phase__num">{String(stepIndex + 1).padStart(2, "0")}</span>
                        <div>
                          <p className="cg-phase__title">{step.title}</p>
                          <p className="cg-phase__desc">{step.desc}</p>
                          <p className="cg-phase__tag">{step.tag}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="ed-label ed-label--lime" style={{ marginBottom: "0.6rem" }}>
                    Skills to close
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {result.cluster.skills.map((skill) => (
                      <span className="ed-badge" key={skill}>
                        <HiCheck aria-hidden="true" size={12} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", borderTop: "1px solid var(--line)", paddingTop: "1.25rem" }}>
                  <a href="#book" className="ed-btn ed-btn--lime">
                    Book a 1:1 with a counsellor
                    <HiCalendarDays aria-hidden="true" size={15} />
                  </a>
                  <Button to="/practice-tools">Practise the weak spot</Button>
                  <Button to="/resume-builder">Build the resume</Button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "1.5rem", maxWidth: "62ch" }}>
              <h2 id="result-title" className="ed-display ed-h2">
                Your plan appears here.
              </h2>
              <p className="ed-lead" style={{ marginTop: "0.75rem" }}>
                Finish the five questions above. You will get one direction, three roles to search for, a
                four-step skill plan and the salary band to check.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem" }}>
                {fitOrder.map((key) => (
                  <span className="ed-badge" key={key}>
                    {key === "tech" ? "Tech & product" : key === "data" ? "Data & reporting" : key === "sales" ? "Sales & growth" : "Support & operations"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Booking ──────────────────────────────────────────────────── */}
      <section className="ed-section" id="book" aria-labelledby="booking-title">
        <div className="ed-shell">
          <div className="cg-booking">
            <div className="cg-booking__copy">
              <SectionLabel aside="[ 20 minutes ]">1:1 counselling</SectionLabel>
              <h2 id="booking-title" className="ed-display ed-h2" style={{ marginTop: "1.25rem" }}>
                Bring the result.
                <br />
                Leave with a <span style={{ color: "var(--lime)" }}>plan.</span>
              </h2>
              <p className="ed-lead">
                A counsellor reads your quiz result before the call, then asks the questions a quiz cannot.
                You leave with two roles to pursue and the first three actions for each.
              </p>

              <div className="tr-checklist" style={{ marginTop: "0.5rem" }}>
                {[
                  "20 minutes, online or on the phone.",
                  "Bring one job ad you are actually considering.",
                  "No fee, no sales pitch, no course upsell.",
                  "If we are not the right fit, we will say so.",
                ].map((item) => (
                  <div className="tr-check" key={item}>
                    <HiCheck aria-hidden="true" size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
                Slot requests are reviewed by a person. Choosing a time does not confirm a booking — you will
                receive a reply with the counsellor's availability.
              </p>
            </div>

            <div className="cg-slots">
              <p className="ed-label ed-label--lime">
                <HiCalendarDays aria-hidden="true" size={13} /> Pick a day
              </p>

              <div className="cg-days" role="group" aria-label="Choose a counselling day">
                {days.map((day, dayIndex) => (
                  <button
                    type="button"
                    key={day.toISOString()}
                    className={`cg-day${selectedDay === dayIndex ? " is-active" : ""}`}
                    aria-pressed={selectedDay === dayIndex}
                    onClick={() => {
                      setSelectedDay(dayIndex);
                      setSelectedTime("");
                    }}
                  >
                    <span className="cg-day__dow">
                      {day.toLocaleDateString("en-IN", { weekday: "short" })}
                    </span>
                    <span className="cg-day__num">{day.getDate()}</span>
                    <span className="cg-day__dow">
                      {day.toLocaleDateString("en-IN", { month: "short" })}
                    </span>
                  </button>
                ))}
              </div>

              <p className="ed-label ed-label--lime" style={{ marginTop: "1.25rem" }}>
                <HiClock aria-hidden="true" size={13} /> Pick a time
              </p>

              <div className="cg-times" role="group" aria-label="Choose a counselling time">
                {TIME_SLOTS.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`cg-time${selectedTime === time ? " is-active" : ""}`}
                    aria-pressed={selectedTime === time}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <p className="cg-slot-note" aria-live="polite">
                {selectedTime ? (
                  <>
                    Selected: <strong>{selectedDayLabel} at {selectedTime}</strong>. Continue to the contact
                    page to send the request yourself.
                  </>
                ) : (
                  "Choose a time to prepare the request. Nothing is booked automatically."
                )}
              </p>

              <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
                {selectedTime ? (
                  <Link className="ed-btn ed-btn--lime ed-btn--block" to={requestHref}>
                    Request this slot
                    <HiArrowRight aria-hidden="true" size={15} />
                  </Link>
                ) : (
                  <button type="button" className="ed-btn ed-btn--lime ed-btn--block" disabled>
                    Choose a time first
                  </button>
                )}
                <WhatsAppCta className="ed-btn ed-btn--block">Ask on the WhatsApp Channel</WhatsAppCta>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Success stories carousel ─────────────────────────────────── */}
      <section className="ed-section" aria-labelledby="stories-title">
        <div className="ed-shell">
          <SectionLabel aside="[ Illustrative stories ]">Success stories</SectionLabel>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginTop: "1.25rem" }}>
            <h2 id="stories-title" className="ed-display ed-h2">
              The direction
              <br />
              was already <span style={{ color: "var(--lime)" }}>there.</span>
            </h2>
            <p className="ed-label" style={{ textTransform: "none", letterSpacing: "0.01em", maxWidth: "34ch", lineHeight: 1.6 }}>
              Sample stories for layout. Consented, verified stories replace these before launch.
            </p>
          </div>

          <div className="cg-stories">
            <div className="cg-story">
              <p className="cg-story__quote">
                “{successStories[storyIndex].quote}”
              </p>
              <div className="cg-story__person">
                <div>
                  <p className="cg-story__name">{successStories[storyIndex].name}</p>
                  <p className="cg-story__role">{successStories[storyIndex].role}</p>
                </div>
                <span className="ed-badge ed-badge--lime">{successStories[storyIndex].tag}</span>
              </div>
              <div className="cg-story__nav">
                <span className="ed-label">
                  {String(storyIndex + 1).padStart(2, "0")} / {String(successStories.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  className="cg-story__btn"
                  onClick={() =>
                    setStoryIndex((current) => (current - 1 + successStories.length) % successStories.length)
                  }
                  aria-label="Previous story"
                >
                  <HiArrowLeft aria-hidden="true" size={17} />
                </button>
                <button
                  type="button"
                  className="cg-story__btn"
                  onClick={() => setStoryIndex((current) => (current + 1) % successStories.length)}
                  aria-label="Next story"
                >
                  <HiArrowRight aria-hidden="true" size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reading room ─────────────────────────────────────────────── */}
      <section className="ed-section" aria-labelledby="reading-title">
        <div className="ed-shell">
          <SectionLabel aside={`[ ${careerArticles.length} guides ]`}>Reading room</SectionLabel>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginTop: "1.25rem" }}>
            <h2 id="reading-title" className="ed-display ed-h2">
              Read before
              <br />
              you <span style={{ color: "var(--lime)" }}>decide.</span>
            </h2>
            <p className="ed-lead" style={{ maxWidth: "38ch" }}>
              Plain-language guides on resumes, interviews and the first ninety days. No listicles, no
              guaranteed-outcome promises.
            </p>
          </div>

          <div className="cg-reading">
            {careerArticles.slice(0, 5).map((article) => (
              <Link className="cg-read" to={`/career-guidance/${article.slug}`} key={article.slug}>
                <div>
                  <p className="cg-read__title">{article.title}</p>
                  <p className="cg-read__meta">
                    <span>{article.category}</span>
                    <span>{article.readMinutes} min read</span>
                  </p>
                </div>
                <HiArrowRight className="cg-read__arrow" aria-hidden="true" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
