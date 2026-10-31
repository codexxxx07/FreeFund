import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiCalendarDays,
  HiCheck,
  HiClock,
  HiSignal,
  HiUserGroup,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import FaqList from "../components/common/FaqList";
import WhatsAppCta from "../components/common/WhatsAppCta";
import Accordion from "../components/editorial/Accordion";
import Asterisk from "../components/editorial/Asterisk";
import Button from "../components/editorial/Button";
import Drawer from "../components/editorial/Drawer";
import Marquee from "../components/editorial/Marquee";
import SectionLabel from "../components/editorial/SectionLabel";
import { BRAND_NAME } from "../data/constants";
import { cohort, checklist, faqs, mentors, modules, outcomes, weeks } from "../data/trainingPrograms";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const diff = Math.max(0, new Date(target).getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function EnrolForm({ onDone }) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", goal: "" });
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = "Enter the name you want us to use.";
    if (!values.email.trim()) next.email = "Enter an email address.";
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setReady(true);
  }

  const subject = `Cohort 04 enrolment · ${values.name.trim() || "candidate"}`;
  const contactHref = `/contact?topic=training&subject=${encodeURIComponent(subject)}`;

  if (ready) {
    return (
      <div style={{ display: "grid", gap: "1.25rem" }}>
        <div style={{ border: "1px solid var(--lime)", padding: "1.25rem" }}>
          <p className="ed-label ed-label--lime">
            <Asterisk size={12} /> [ Nothing sent yet ]
          </p>
          <p style={{ marginTop: "0.75rem", color: "var(--paper)", lineHeight: 1.6 }}>
            Thanks, {values.name.split(" ")[0] || "there"}. This drawer does not submit anywhere. Continue to the
            contact page and your request is prefilled — you press send yourself.
          </p>
          <p style={{ marginTop: "0.75rem", fontSize: "0.84rem", lineHeight: 1.6 }}>
            Add your current role or goal in the message so a mentor can reply with the right next step. Slots are
            confirmed by a person, not automatically.
          </p>
        </div>

        <div style={{ display: "grid", gap: "0.6rem" }}>
          <Button to={contactHref} variant="lime" block>
            Continue to contact form
            <HiArrowRight aria-hidden="true" size={16} />
          </Button>
          <WhatsAppCta className="ed-btn ed-btn--lime" variant="button">
            Ask on the WhatsApp Channel
          </WhatsAppCta>
          <Button onClick={() => setReady(false)} block>
            Edit my details
          </Button>
        </div>

        <button
          type="button"
          className="ed-btn"
          onClick={onDone}
          style={{ background: "transparent", borderColor: "transparent", color: "var(--muted)" }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "1rem" }} noValidate>
      <p style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>
        Tell us who you are and what you are aiming for. We use this only to route your request — there is no account
        and no stored enrolment.
      </p>

      <label className="ed-field">
        <span className="ed-field__label">Full name (required)</span>
        <input
          className="ed-input"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <span className="ed-error">{errors.name}</span> : null}
      </label>

      <label className="ed-field">
        <span className="ed-field__label">Email (required)</span>
        <input
          className="ed-input"
          type="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <span className="ed-error">{errors.email}</span> : null}
      </label>

      <label className="ed-field">
        <span className="ed-field__label">Phone / WhatsApp (optional)</span>
        <input
          className="ed-input"
          type="tel"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          autoComplete="tel"
        />
      </label>

      <label className="ed-field">
        <span className="ed-field__label">What are you aiming for?</span>
        <textarea
          className="ed-textarea"
          placeholder="Example: first customer support role, comfortable with night shifts."
          value={values.goal}
          onChange={(event) => update("goal", event.target.value)}
        />
      </label>

      <div style={{ border: "1px solid var(--line)", padding: "0.9rem", fontSize: "0.78rem", lineHeight: 1.6, color: "var(--muted)" }}>
        <strong style={{ color: "var(--paper)" }}>What happens next:</strong> you continue to the contact page with
        this request prefilled, send it yourself, and a mentor replies with availability. A seat is not held until
        that reply.
      </div>

      <Button type="submit" variant="lime" size="lg" block>
        Prepare my request
        <HiArrowRight aria-hidden="true" size={16} />
      </Button>
    </form>
  );
}

export default function FreeTraining() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const countdown = useCountdown(cohort.startDate);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const startLabel = new Date(cohort.startDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const seatsTaken = cohort.seatsTotal - cohort.seatsLeft;
  const filled = Math.round((seatsTaken / cohort.seatsTotal) * 100);

  return (
    <div>
      <PageMeta
        title="Free Training Cohorts"
        description="Join a free 14-day job readiness cohort: live sessions, resume clinics, recorded mock interviews and a 1:1 review. See the schedule, syllabus and seats."
        canonicalPath="/free-training"
      />

      {/* ── Cohort hero ──────────────────────────────────────────────── */}
      <section className="tr-hero" aria-labelledby="training-title">
        <div className="ed-shell">
          <div className="tr-hero__grid">
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <span className="ed-badge ed-badge--lime">{cohort.code}</span>
                <span className="ed-badge">{cohort.duration}</span>
                <span className="ed-badge ed-badge--solid">{cohort.fee}</span>
                <span className="ed-badge">Sample schedule</span>
              </div>

              <h1 id="training-title" className="ed-display tr-hero__title">
                Two weeks
                <br />
                to a <em>better</em>
                <br />
                application.
              </h1>

              <p className="ed-lead" style={{ marginTop: "1.5rem" }}>
                Not a video library. A fixed cohort with live mentors, a resume clinic and a recorded mock
                interview — built for people applying to their first serious role.
              </p>

              <div className="tr-hero__facts" style={{ marginTop: "1.25rem" }}>
                <span className="ed-badge">
                  <HiCalendarDays aria-hidden="true" size={13} /> Starts {startLabel}
                </span>
                <span className="ed-badge">
                  <HiClock aria-hidden="true" size={13} /> {cohort.schedule}
                </span>
                <span className="ed-badge">
                  <HiSignal aria-hidden="true" size={13} /> {cohort.mode}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.75rem" }}>
                <Button onClick={() => setDrawerOpen(true)} variant="lime" size="lg">
                  Enrol free
                  <HiArrowRight aria-hidden="true" size={16} />
                </Button>
                <Button href="#syllabus" size="lg">
                  Read the syllabus
                </Button>
              </div>
              <p style={{ marginTop: "0.85rem", fontSize: "0.76rem", maxWidth: "48ch" }}>
                Sample cohort: dates, seats and mentors are placeholders until the owner confirms them.
              </p>
            </div>

            <aside className="tr-hero__aside" aria-label="Next batch countdown and seats">
              <p className="ed-label ed-label--lime">
                <Asterisk size={12} /> Next batch starts in
              </p>

              <div className="tr-count" aria-live="off">
                <div className="tr-count__unit">
                  <span className="tr-count__num">{String(countdown.days).padStart(2, "0")}</span>
                  <span className="tr-count__label">Days</span>
                </div>
                <div className="tr-count__unit">
                  <span className="tr-count__num">{String(countdown.hours).padStart(2, "0")}</span>
                  <span className="tr-count__label">Hours</span>
                </div>
                <div className="tr-count__unit">
                  <span className="tr-count__num">{String(countdown.minutes).padStart(2, "0")}</span>
                  <span className="tr-count__label">Min</span>
                </div>
                <div className="tr-count__unit">
                  <span className="tr-count__num">{String(countdown.seconds).padStart(2, "0")}</span>
                  <span className="tr-count__label">Sec</span>
                </div>
              </div>

              <div className="tr-seats">
                <div className="tr-seats__top">
                  <span>Seats remaining</span>
                  <span className="tr-seats__num">
                    {cohort.seatsLeft} / {cohort.seatsTotal}
                  </span>
                </div>
                <div
                  className="tr-seats__track"
                  role="img"
                  aria-label={`${seatsTaken} of ${cohort.seatsTotal} seats taken`}
                >
                  <div className="tr-seats__fill" style={{ width: `${filled}%` }} />
                </div>
                <p style={{ fontSize: "0.74rem", lineHeight: 1.5 }}>
                  A request is confirmed by a mentor. The seat is held only after that reply.
                </p>
              </div>

              <Button onClick={() => setDrawerOpen(true)} variant="lime" block>
                Enrol free
                <HiArrowRight aria-hidden="true" size={15} />
              </Button>

              <p style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
                No fee · No card · No certificate claim
              </p>
            </aside>
          </div>
        </div>
      </section>

      <Marquee
        items={["No fee to join", "Live mentors", "Peer review", "Recorded mock interview", "1:1 review", "Seats limited"]}
        duration={30}
      />

      {/* ── Weekly timeline ──────────────────────────────────────────── */}
      <section className="ed-section" aria-labelledby="schedule-title">
        <div className="ed-shell">
          <SectionLabel aside="[ 14 days · 16 sessions ]">The schedule</SectionLabel>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1.25rem", marginTop: "1.5rem" }}>
            <h2 id="schedule-title" className="ed-display ed-h2">
              Two weeks,
              <br />
              four <span style={{ color: "var(--lime)" }}>movements.</span>
            </h2>
            <p className="ed-lead" style={{ maxWidth: "42ch" }}>
              Each week has one job. There is homework, but it is the work you already need to do to apply —
              not extra reading.
            </p>
          </div>

          <div className="tr-timeline">
            {weeks.map((week) => (
              <article className="tr-week" key={week.week}>
                <div>
                  <p className="tr-week__num">{week.week}</p>
                  <p className="tr-week__day">{week.dates}</p>
                </div>
                <div>
                  <h3 className="tr-week__title">{week.title}</h3>
                  <div className="tr-week__tags">
                    {week.tags.map((tag) => (
                      <span className="ed-badge" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="tr-week__desc">{week.description}</p>
              </article>
            ))}
          </div>

          <p style={{ marginTop: "1rem", fontSize: "0.78rem" }}>
            Sample outline. Session timings move by a day for national holidays and are confirmed on enrolment.
          </p>
        </div>
      </section>

      {/* ── Syllabus accordion ───────────────────────────────────────── */}
      <section className="ed-section" id="syllabus" aria-labelledby="syllabus-title">
        <div className="ed-shell">
          <SectionLabel aside="[ 4 modules · 16 sessions ]">Syllabus</SectionLabel>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1.25rem", marginTop: "1.5rem" }}>
            <h2 id="syllabus-title" className="ed-display ed-h2">
              Open a module.
              <br />
              See every <span style={{ color: "var(--lime)" }}>session.</span>
            </h2>
            <p className="ed-lead" style={{ maxWidth: "38ch" }}>
              No mystery curriculum. Each module lists the exact sessions, their length and what you leave
              with.
            </p>
          </div>

          <Accordion
            items={modules.map((module) => ({
              id: module.id,
              title: module.title,
              content: (
                <>
                  <p className="tr-acc__copy">{module.copy}</p>
                  <div className="tr-acc__sessions">
                    {module.sessions.map((session) => (
                      <div className="tr-acc__session" key={session.label}>
                        <span>{session.label}</span>
                        <span>{session.detail}</span>
                      </div>
                    ))}
                  </div>
                </>
              ),
            }))}
          />
        </div>
      </section>

      {/* ── Mentors ──────────────────────────────────────────────────── */}
      <section className="ed-section" aria-labelledby="mentors-title">
        <div className="ed-shell">
          <SectionLabel aside="[ Sample profiles ]">Who teaches</SectionLabel>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.25rem", marginTop: "1.5rem" }}>
            <h2 id="mentors-title" className="ed-display ed-h2">
              Three people
              <br />
              who read <span style={{ color: "var(--lime)" }}>closely.</span>
            </h2>
            <p className="ed-lead" style={{ maxWidth: "38ch" }}>
              Mentors are practitioners from our recruitment team. Profiles below are samples until the
              confirmed cohort team is published.
            </p>
          </div>

          <div className="tr-mentors">
            {mentors.map((mentor) => (
              <article className="tr-mentor" key={mentor.id}>
                <div className="tr-mentor__mono" aria-hidden="true">
                  {mentor.initials}
                </div>
                <div>
                  <p className="tr-mentor__name">{mentor.name}</p>
                  <p className="tr-mentor__role">{mentor.role}</p>
                </div>
                <p className="tr-mentor__bio">{mentor.bio}</p>
                <span className="ed-badge" style={{ alignSelf: "flex-start" }}>
                  Sample profile
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcomes + what you get ──────────────────────────────────── */}
      <section className="ed-section" aria-labelledby="outcomes-title">
        <div className="ed-shell">
          <SectionLabel aside="[ What you leave with ]">Outcomes</SectionLabel>

          <h2 id="outcomes-title" className="ed-display ed-h2" style={{ marginTop: "1.5rem" }}>
            Six things at
            <br />
            the <span style={{ color: "var(--lime)" }}>end.</span>
          </h2>

          <div className="tr-outcomes">
            {outcomes.map((outcome) => (
              <span className="tr-outcome" key={outcome}>
                <HiCheck aria-hidden="true" size={15} />
                {outcome}
              </span>
            ))}
          </div>

          <div className="tr-get">
            <div>
              <p className="ed-label ed-label--lime" style={{ marginBottom: "0.85rem" }}>
                <Asterisk size={12} /> What you get
              </p>
              <div className="tr-checklist">
                {checklist.map((item) => (
                  <div className="tr-check" key={item}>
                    <HiCheck aria-hidden="true" size={17} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="tr-get__card">
              <p className="ed-label ed-label--lime">
                <Asterisk size={12} /> What this is not
              </p>
              <div style={{ display: "grid", gap: "0.9rem", marginTop: "1rem" }}>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                  It is not a job guarantee, a placement promise, or a certificate. We do not publish
                  outcomes we cannot verify, and we do not ask candidates for money.
                </p>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                  It is not a subscription. There is no paid tier waiting at the end of the two weeks.
                </p>
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.9rem" }}>
                  <p className="ed-label">Eligibility</p>
                  <p style={{ marginTop: "0.4rem", fontSize: "0.88rem", color: "var(--paper)" }}>
                    {cohort.eligibility}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="ed-section" aria-labelledby="training-faq-title">
        <div className="ed-shell">
          <SectionLabel aside="[ Still deciding? ]">Questions</SectionLabel>

          <div className="tr-faq" style={{ marginTop: "1.5rem" }}>
            <div>
              <h2 id="training-faq-title" className="ed-display ed-h2">
                Ask before
                <br />
                you <span style={{ color: "var(--lime)" }}>enrol.</span>
              </h2>
              <p className="ed-lead" style={{ marginTop: "1rem" }}>
                If the answer you need is not here, message us. A mentor replies, not an autoresponder.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.5rem" }}>
                <Button onClick={() => setDrawerOpen(true)} variant="lime">
                  Enrol free
                  <HiArrowRight aria-hidden="true" size={15} />
                </Button>
                <Link to="/contact?topic=training" className="ed-btn">
                  Ask a question
                </Link>
              </div>
              <p className="ed-label" style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem" }}>
                <HiUserGroup aria-hidden="true" size={15} /> {cohort.seatsLeft} seats left in {cohort.code}
              </p>
            </div>

            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        title="Enrol in Cohort 04"
        eyebrow="[ Free · no card ]"
      >
        <EnrolForm onDone={closeDrawer} />
      </Drawer>
    </div>
  );
}
