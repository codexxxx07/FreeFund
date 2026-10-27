import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiBriefcase,
  HiCheckCircle,
  HiClipboardDocumentCheck,
  HiCommandLine,
  HiDocumentText,
  HiAcademicCap,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import WhatsAppCta from "../components/common/WhatsAppCta";
import WhatsAppCommunity from "../components/common/WhatsAppCommunity";
import TypewriterText from "../components/common/TypewriterText";
import { BRAND_NAME, CONTACT_PLACEHOLDERS, isPlaceholder } from "../data/constants";

const resources = [
  {
    to: "/resume-builder",
    title: "Resume Builder",
    body: "Fill in a guided form and export a clean, ATS-friendly resume as a PDF — stored only in your browser.",
    icon: HiDocumentText,
  },
  {
    to: "/practice-tools",
    title: "Free Practice Tools",
    body: "Typing speed, English and basic computer tests that run entirely in your browser with instant results.",
    icon: HiClipboardDocumentCheck,
  },
  {
    to: "/career-guidance",
    title: "Career Guidance",
    body: "Short, practical articles on resume writing, job search, interviews and workplace readiness.",
    icon: HiAcademicCap,
  },
  {
    to: "/free-training",
    title: "Free Training",
    body: "Job-readiness programmes run by our team — eligibility, skills covered and how to register.",
    icon: HiCommandLine,
  },
];

const whatWeDo = [
  {
    icon: HiBriefcase,
    title: "A recruitment consultancy first",
    body: "We work with authorised employers hiring across India, and guide candidates through each step of the hiring process.",
  },
  {
    icon: HiCheckCircle,
    title: "Preparation tools that are free to use",
    body: "A resume builder, practice tests and short guidance articles — all running in your browser, with nothing to install.",
  },
  {
    icon: HiShieldCheck,
    title: "Honest guidance, no false promises",
    body: "We never ask candidates for money, and suspicious offers or listings can be raised through the contact page.",
  },
  {
    icon: HiUserGroup,
    title: "Candidate support",
    body: "Questions about an offer, a process step or a suspicious message can be raised through the contact page and will be reviewed.",
  },
];

const commitments = [
  "Your personal details are never displayed publicly on this website.",
  "Career tools and practice tests run in your browser and are not submitted anywhere.",
];

export default function Home() {
  const showEmail = !isPlaceholder(CONTACT_PLACEHOLDERS.email);
  const showPhone = !isPlaceholder(CONTACT_PLACEHOLDERS.phone);
  const showRegion = !isPlaceholder(CONTACT_PLACEHOLDERS.region);
  const heroRef = useRef(null);
  const diagonalRef = useRef(null);

  // Subtle mouse parallax on the diagonal hero visual (off for reduced motion).
  useEffect(() => {
    const hero = heroRef.current;
    const diagonal = diagonalRef.current;
    if (!hero || !diagonal) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    function onPointerMove(event) {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      diagonal.style.setProperty("--px", `${(x * 16).toFixed(1)}px`);
      diagonal.style.setProperty("--py", `${(y * 12).toFixed(1)}px`);
    }

    function onPointerLeave() {
      diagonal.style.setProperty("--px", "0px");
      diagonal.style.setProperty("--py", "0px");
    }

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div>
      <PageMeta
        title="Home"
        description={`${BRAND_NAME} is a recruitment consultancy offering a resume builder, free practice tools, career guidance and a WhatsApp community for career updates.`}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-blob" aria-hidden="true">
          <span className="blob-a" />
          <span className="blob-b" />
          <span className="blob-c" />
        </div>

        {/* B&W cutout figure (inline SVG — no external image to break) */}
        <div className="hero-cutout" aria-hidden="true">
          <svg viewBox="0 0 220 300" role="presentation">
            <rect className="figure-ink" x="92" y="132" width="36" height="56" rx="16" />
            <circle className="figure-ink" cx="110" cy="84" r="62" />
            <path className="figure-ink" d="M6 300c0-62 46-110 104-122 6-1 10-6 11-12 1 6 5 11 11 12 58 12 104 60 104 122z" />
            <path className="figure-cut" d="M86 190l24 30 24-30" />
            <path className="figure-cut" d="M110 34c-14 10-22 28-22 48" />
          </svg>
        </div>

        <div className="page-shell relative z-[1]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            <div>
              <p className="eyebrow">Recruitment consultancy</p>
              <h1 className="hero-title mt-6">
                <span className="hero-line">Find the</span>
                <span className="hero-line">right role.</span>
              </h1>
              <p className="hero-tagline">
                {BRAND_NAME} helps candidates prepare properly — with a resume builder, practice tools, free career
                guidance and a community that shares relevant opportunities.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/career-guidance" className="btn-primary btn-lg">
                  Explore Career Resources
                  <HiArrowRight aria-hidden="true" />
                </Link>
                <Link to="/resume-builder" className="btn-secondary btn-lg">
                  Build Your Resume
                </Link>
                <WhatsAppCta className="btn-secondary btn-lg">
                  Join our WhatsApp Channel
                </WhatsAppCta>
              </div>
            </div>

            <div className="hero-visual">
              <p className="hero-accent mb-7">
                Apply with{" "}
                <span className="relative">
                  <TypewriterText words={["Clarity", "Confidence", "Purpose", "Success"]} />
                  <noscript>Clarity</noscript>
                </span>
              </p>

              <div className="hero-stage hero-diagonal" ref={diagonalRef}>
                <span className="hero-layer hero-layer-back" aria-hidden="true" />
                <span className="hero-layer hero-layer-mid" aria-hidden="true" />
                <div className="hero-panel">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="icon-tile icon-tile-solid">
                        <HiDocumentText aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display text-base font-bold uppercase tracking-wide">
                          Free career resources
                        </p>
                        <p className="text-xs text-muted">Everything runs in your browser</p>
                      </div>
                    </div>
                  </div>

                  <ul className="mt-5 grid gap-2.5">
                    {resources.map((resource) => {
                      const Icon = resource.icon;
                      return (
                        <li key={resource.to}>
                          <Link to={resource.to} className="quick-link w-full justify-between">
                            <span className="flex items-center gap-2.5">
                              <Icon aria-hidden="true" />
                              {resource.title}
                            </span>
                            <HiArrowRight aria-hidden="true" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Need help?</p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      <Link to="/contact" className="quick-link">
                        Contact us
                        <HiArrowRight aria-hidden="true" />
                      </Link>
                      <Link to="/about" className="quick-link">
                        About us
                        <HiArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tiny secondary thumbnail card with caption */}
              <div className="hero-thumb" aria-hidden="true">
                <svg className="hero-thumb-graphic" viewBox="0 0 160 96" role="presentation">
                  <rect className="tg-bg" x="0" y="0" width="160" height="96" />
                  <rect className="tg-line" x="16" y="20" width="86" height="9" rx="4.5" />
                  <rect className="tg-line" x="16" y="42" width="124" height="9" rx="4.5" />
                  <rect className="tg-line" x="16" y="64" width="66" height="9" rx="4.5" />
                  <circle className="tg-dot" cx="132" cy="68" r="15" />
                </svg>
                <span className="hero-thumb-caption">Fig. 01 — Free tools</span>
              </div>
            </div>
          </div>

          {/* Bottom row: hairline, big italic stat, small CTA, info card */}
          <div className="hero-bottom">
            <div>
              <span className="hero-stat">100%</span>
              <span className="hero-stat-label">Free career tools, always</span>
            </div>

            <Link to="/resume-builder" className="hero-cta-text">
              Build your resume
              <HiArrowRight aria-hidden="true" />
            </Link>

            <div className="hero-info-card">
              <p className="eyebrow">Support</p>
              <p>Questions about an offer, a process step or a suspicious message?</p>
              <Link to="/contact" className="btn-primary justify-self-start">
                Contact us
                <HiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WhatsApp community ───────────────────────────────────────── */}
      <WhatsAppCommunity />

      {/* ── Career resources preview ─────────────────────────────────── */}
      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Career resources"
            title="Everything around the job search"
            description="Free tools that support the consultancy work — so you arrive at an application better prepared."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.to}
                  to={resource.to}
                  className="surface-card surface-card-hover group flex h-full flex-col p-6"
                >
                  <span className="icon-tile icon-tile-lg">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{resource.body}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                    Open
                    <HiArrowRight
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Consultancy introduction ─────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="About us"
            title="What Jobs Mania – Freefund does"
            description="A recruitment consultancy first: genuine guidance for candidates, free preparation tools, and support when you need it."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {whatWeDo.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="surface-card surface-card-hover p-6">
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-7">
            <Link to="/about" className="btn-secondary">
              More about us
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust and support ────────────────────────────────────────── */}
      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Trust and support"
            title="What you can count on"
            description="These are things the site does today, not promises about the future."
          />

          <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <ul className="surface-card grid content-center gap-4 p-6 sm:p-8">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted">{item}</p>
                </li>
              ))}
            </ul>

            <div className="surface-card flex flex-col justify-center p-6 sm:p-8">
              <p className="eyebrow">Support</p>
              <h3 className="mt-3 text-2xl">Talk to a person</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Questions about an offer, a process step or a suspicious message can be raised on the contact page.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Contact us
                  <HiArrowRight aria-hidden="true" />
                </Link>
                <WhatsAppCta className="btn-secondary">WhatsApp Channel</WhatsAppCta>
              </div>

              {showEmail || showPhone || showRegion ? (
                <ul className="mt-6 grid gap-2 border-t border-line pt-5 text-sm text-muted">
                  {showEmail ? <li className="break-words">{CONTACT_PLACEHOLDERS.email}</li> : null}
                  {showPhone ? <li>{CONTACT_PLACEHOLDERS.phone}</li> : null}
                  {showRegion ? <li>{CONTACT_PLACEHOLDERS.region}</li> : null}
                </ul>
              ) : (
                <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
                  Verified contact details will appear here once confirmed by the owner.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <div className="cta-panel p-8 sm:p-10 lg:p-12">
            <span className="cta-shape cta-shape-lg" aria-hidden="true" />
            <span className="cta-shape cta-shape-sm" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1.25fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="eyebrow">Ready to start</p>
                <h2 className="mt-3 text-balance text-3xl sm:text-4xl">Looking for your next opportunity?</h2>
                <p className="mt-3 text-lg">
                  Prepare a resume that reads well, practise before the interview, and reach out when you are ready to
                  talk.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/resume-builder" className="btn-inverse btn-lg">
                    Build Your Resume
                    <HiArrowRight aria-hidden="true" />
                  </Link>
                  <Link to="/practice-tools" className="btn-outline-inverse btn-lg">
                    Free Practice Tools
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <span className="grid h-24 w-24 place-items-center rounded-3xl border border-white/20 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_18px_36px_-18px_rgba(17,17,17,0.45)]">
                  <HiBriefcase size={30} aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
