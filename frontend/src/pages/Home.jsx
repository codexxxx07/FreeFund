import { Link } from "react-router-dom";
import { HiArrowDown, HiArrowRight, HiArrowUpRight, HiCheckBadge } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import Asterisk from "../components/editorial/Asterisk";
import BracketLink from "../components/editorial/BracketLink";
import Button from "../components/editorial/Button";
import LimeCard from "../components/editorial/LimeCard";
import Marquee from "../components/editorial/Marquee";
import SectionLabel from "../components/editorial/SectionLabel";
import StatCard from "../components/editorial/StatCard";
import WhatsAppCommunity from "../components/common/WhatsAppCommunity";
import { BRAND_NAME } from "../data/constants";

const services = [
  {
    to: "/resume-builder",
    label: "01 · Resume",
    index: "A4",
    title: "Resume Builder",
    meta: "Live editor · 4 templates",
    body:
      "Type once and watch a real A4 page assemble itself. Four layout directions, an honest ATS score, and a print-ready PDF when you are done.",
    action: "Open the editor",
  },
  {
    to: "/free-training",
    label: "02 · Cohort",
    index: "14d",
    title: "Free Training",
    meta: "Next batch · seats limited",
    body:
      "A fixed two-week cohort with live mentors, a session-by-session plan and no cost to join. You leave with an application you can actually send.",
    action: "See the next batch",
  },
  {
    to: "/practice-tools",
    label: "03 · Practice",
    index: "8×",
    title: "Practice Tools",
    meta: "Aptitude · Typing · English",
    body:
      "A practice floor, not a quiz graveyard. Search a weak spot, start in one click, and let the streak panel remember what you have worked on.",
    action: "Start a drill",
  },
  {
    to: "/career-guidance",
    label: "04 · Direction",
    index: "5Q",
    title: "Career Guidance",
    meta: "Quiz · Roadmap · 1:1",
    body:
      "Five questions, one honest recommendation. Then a skill-gap roadmap, realistic salary bands and a slot with a counsellor if you want a second opinion.",
    action: "Find your direction",
  },
];

const partners = [
  "Northline",
  "Vertex BPO",
  "Kite Retail",
  "Blue Oak",
  "Signal Ops",
  "Harbor Care",
];

const quotes = [
  {
    text:
      "I rebuilt my resume on a Sunday and had two interview calls by Wednesday. The ATS feedback was the part nobody had explained to me before.",
    name: "Priya S.",
    role: "Customer Support Executive",
  },
  {
    text:
      "The interview drill showed me I was answering the question next to the one being asked. Fixing that changed the whole conversation.",
    name: "Arjun M.",
    role: "Operations Associate",
  },
  {
    text:
      "No fees, no vague promises. Someone actually read my profile before sending me a role that made sense for my shift and my city.",
    name: "Neha K.",
    role: "MIS Executive",
  },
];

export default function Home() {
  return (
    <div>
      <PageMeta
        title="Recruitment Consultancy & Free Career Tools"
        description={`${BRAND_NAME} places candidates and prepares them properly: a live resume builder, free practice tools, cohort training and a 5-question career quiz. No candidate fees.`}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hm-hero" aria-labelledby="home-title">
        <div className="hm-hero__art" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80"
            alt=""
            loading="eager"
            width="1600"
            height="1067"
          />
        </div>

        <div className="hm-hero__meta hm-hero__meta--tl">
          <span>Recruitment consultancy</span>
          <span>India</span>
        </div>
        <div className="hm-hero__meta hm-hero__meta--tr">
          <span>No candidate fees</span>
          <span>Est. 2021</span>
        </div>

        <div className="ed-shell hm-hero__inner">
          <p className="ed-label ed-label--lime hm-hero__eyebrow">
            <Asterisk size={14} />
            [ People first, paperwork second ]
          </p>

          <h1 id="home-title" className="ed-display hm-word">
            <span>Jobs</span>
            <span>
              Man<em>ia</em>
            </span>
          </h1>

          <div className="hm-hero__foot">
            <div>
              <p className="hm-hero__claim">
                Recruitment without the runaround. Free preparation tools, honest guidance, and a human
                who answers when you ask what happens next.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.5rem" }}>
                <Button to="/contact" variant="lime" size="lg">
                  Talk to a recruiter
                  <HiArrowUpRight aria-hidden="true" size={16} />
                </Button>
                <Button to="/free-training" size="lg">
                  Join the next cohort
                  <HiArrowRight aria-hidden="true" size={16} />
                </Button>
              </div>
            </div>

            <a href="#the-work" className="hm-scroll">
              Scroll to explore
              <HiArrowDown aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Live statistics ──────────────────────────────────────────── */}
      <section aria-labelledby="stats-title">
        <div className="ed-shell" style={{ paddingTop: "1.25rem" }}>
          <div className="ed-sechead" style={{ paddingBottom: "0.75rem" }}>
            <span className="ed-label ed-label--lime">
              <Asterisk size={13} />
              [ By the numbers ]
            </span>
            <span id="stats-title" className="ed-label">
              [ Sample data · replace with verified figures ]
            </span>
          </div>
        </div>
        <div className="hm-stats">
          <StatCard value={1240} suffix="+" label="Placements supported" note="Across support, sales and back office" />
          <StatCard value={38} label="Hiring partners" note="Verified employer mandates" />
          <StatCard value={4600} suffix="+" label="Candidates coached" note="Tools, cohorts and 1:1 sessions" />
          <StatCard value="₹0" label="Candidate fees" note="Always. Report anyone who asks." />
        </div>
      </section>

      {/* ── Four ways in ─────────────────────────────────────────────── */}
      <section className="ed-section" id="the-work" aria-labelledby="work-title">
        <div className="ed-shell">
          <SectionLabel aside="[ Four ways in ]">What we do</SectionLabel>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              marginTop: "2rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              alignItems: "end",
            }}
          >
            <h2 id="work-title" className="ed-display ed-h2">
              Pick the part
              <br />
              you need <span style={{ color: "var(--lime)" }}>today.</span>
            </h2>
            <p className="ed-lead" style={{ justifySelf: "end", maxWidth: "42ch" }}>
              Everything below is free and works without an account. Start with the tool that matches
              the problem in front of you — the resume, the interview, or the direction.
            </p>
          </div>

          <div className="hm-services">
            {services.map((service) => (
              <LimeCard
                key={service.to}
                to={service.to}
                label={service.label}
                index={service.index}
                title={service.title}
                meta={service.meta}
                action={service.action}
                className="hm-service"
              >
                {service.body}
              </LimeCard>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "No candidate fees",
          "Real humans on WhatsApp",
          "ATS-friendly resumes",
          "Cohort training",
          "Practice with a memory",
        ]}
        lime
        duration={38}
      />

      {/* ── Hiring partners ──────────────────────────────────────────── */}
      <section className="hm-partners" aria-labelledby="partners-title">
        <div className="ed-shell">
          <SectionLabel aside="[ Placeholder marks ]">Hiring partners</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", marginTop: "1.5rem" }}>
            <h2 id="partners-title" className="ed-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
              Teams that hire through us
            </h2>
            <p className="ed-label" style={{ textTransform: "none", letterSpacing: "0.02em", maxWidth: "36ch" }}>
              Partner names are placeholders until signed mandates are confirmed.
            </p>
          </div>
          <div className="hm-partners__grid">
            {partners.map((partner) => (
              <div className="hm-partner" key={partner}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="ed-section" aria-labelledby="quotes-title">
        <div className="ed-shell">
          <SectionLabel aside="[ Illustrative · replace with consented quotes ]">Candidate stories</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginTop: "1.5rem" }}>
            <h2 id="quotes-title" className="ed-display ed-h2">
              What happens
              <br />
              after the <span style={{ color: "var(--lime)" }}>first draft.</span>
            </h2>
            <p className="ed-lead" style={{ maxWidth: "40ch" }}>
              These are sample stories used to test the layout. Verified, consented quotes will replace
              them before launch — we do not publish invented outcomes.
            </p>
          </div>

          <div className="hm-quotes">
            {quotes.map((quote) => (
              <figure className="hm-quote" key={quote.name}>
                <span className="hm-quote__mark" aria-hidden="true">
                  “
                </span>
                <blockquote className="hm-quote__text">{quote.text}</blockquote>
                <figcaption className="hm-quote__person">
                  <div>
                    <p className="hm-quote__name">{quote.name}</p>
                    <p className="hm-quote__role">{quote.role}</p>
                  </div>
                  <span className="ed-badge ed-badge--lime">
                    <HiCheckBadge aria-hidden="true" size={14} />
                    Sample
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.75rem" }}>
            <BracketLink to="/about" arrow>
              How we work
            </BracketLink>
            <BracketLink to="/contact" arrow>
              Ask us anything
            </BracketLink>
          </div>
        </div>
      </section>

      {/* ── WhatsApp community ─────────────────────────────────────── */}
      <WhatsAppCommunity />

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="hm-cta" aria-labelledby="home-cta-title">
        <div className="ed-shell">
          <p className="ed-label ed-label--ink">
            <Asterisk size={13} />
            [ No account · no upload · no fee ]
          </p>
          <h2 id="home-cta-title" className="ed-display hm-cta__word" style={{ marginTop: "1rem" }}>
            <span>Ready</span>
            <span>when you</span>
            <span>
              <em>are.</em>
            </span>
          </h2>

          <div className="hm-cta__row">
            <p className="hm-cta__copy">
              Start with a resume, a practice drill, or one message to a recruiter. You do not need an
              account, a paid plan, or a perfect draft to begin.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              <Link to="/resume-builder" className="ed-btn ed-btn--ink ed-btn--lg">
                Build my resume
                <HiArrowRight aria-hidden="true" size={16} />
              </Link>
              <Link to="/career-guidance" className="ed-btn ed-btn--lg" style={{ borderColor: "rgba(30,30,32,.4)", color: "var(--ink)" }}>
                Take the 5-question quiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
