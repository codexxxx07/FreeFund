import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiBriefcase,
  HiCheckCircle,
  HiEnvelope,
  HiExclamationTriangle,
  HiMapPin,
  HiPhone,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi2";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import FounderCard from "../components/common/FounderCard";
import FaqList from "../components/common/FaqList";
import WhatsAppCta from "../components/common/WhatsAppCta";
import { BRAND_NAME } from "../data/constants";
import aboutConfig from "../data/aboutConfig";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

/** Returns true if the value is a non-empty, non-placeholder string. */
function hasValue(v) {
  if (!v && v !== 0) return false;
  const s = String(v).trim();
  if (s === "") return false;
  if (s === "0") return false;
  const lower = s.toLowerCase();
  return (
    !lower.includes("to be confirmed") &&
    !lower.includes("placeholder") &&
    !lower.includes("example.com") &&
    !lower.includes("xxxxx")
  );
}

/* ─── data ────────────────────────────────────────────────────────────────── */

const whatWeDo = [
  {
    icon: HiBriefcase,
    title: "Recruitment across India",
    body: "We work with authorised employers hiring for customer support, BPO, sales and back-office roles — including work-from-home, office and hybrid positions.",
  },
  {
    icon: HiCheckCircle,
    title: "Free preparation tools",
    body: "A resume builder, practice tests and short guidance articles help you arrive at any application better prepared.",
  },
  {
    icon: HiShieldCheck,
    title: "Honest guidance at every step",
    body: "We never charge candidates a fee, and we will never ask you for money, an OTP or bank details at any stage.",
  },
  {
    icon: HiUserGroup,
    title: "Candidate support",
    body: "Have a question about an offer or a process step? Use the Contact page to reach our team.",
  },
];

const hiringSteps = [
  { label: "Contact us", detail: "Tell us the kind of role you are looking for through the Contact page." },
  { label: "Share your profile", detail: "Send your resume — the Resume Builder can help you put one together." },
  { label: "We match you", detail: "Our recruitment team checks your profile against roles from authorised employers." },
  { label: "HR contacts you", detail: "If your profile matches, the relevant HR team will reach out." },
  { label: "Interview and outcome", detail: "The employer leads the interview process and communicates the result." },
];

const commitments = [
  "Your personal details are never displayed publicly.",
  "We provide a clear privacy notice and ask for consent before you share your details.",
];

// Our Promise — the four commitments shown as cards.
// Keep these in step with the wording supplied by the founder.
const promises = [
  {
    title: "Free job alerts and employment updates",
    body: "Job openings and employment updates shared with candidates at no cost.",
  },
  {
    title: "Helpful career resources and guidance",
    body: "Career resources and guidance candidates can use free of charge.",
  },
  {
    title: "A planned free community for interview preparation",
    body: "A community for interview preparation that is still being planned.",
  },
  {
    title: "A supportive environment to learn and grow",
    body: "A place where candidates can learn, practise and grow at their own pace.",
  },
];

// Our Future Vision — a free learning community (planned, not yet launched).
const futureVision = [
  "Prepare for interviews.",
  "Improve their communication skills.",
  "Practise common interview questions.",
  "Learn how to face interviews with confidence.",
];

// ── Founder contact channels ────────────────────────────────────────────
// Every value is read from aboutConfig (the single source of truth for the
// founder's links) so nothing has to be updated in two places. An entry whose
// value is missing or still a placeholder is filtered out and never rendered.
const founderProfile = aboutConfig.founder;

const founderContacts = [
  {
    key: "email",
    label: "Email",
    value: founderProfile.email || "",
    href: founderProfile.email ? `mailto:${founderProfile.email}` : "",
    icon: HiEnvelope,
    external: false,
    action: "Send an email",
    ariaLabel: "Email Pahulpreet Singh — opens your email app",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: "Direct message",
    href: founderProfile.social.whatsapp,
    icon: FaWhatsapp,
    external: true,
    action: "Chat on WhatsApp",
    ariaLabel: "Chat with Pahulpreet Singh on WhatsApp (opens in a new tab)",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "Pahulpreet Singh",
    href: founderProfile.social.linkedin,
    icon: FaLinkedinIn,
    external: true,
    action: "View profile",
    ariaLabel: "Pahulpreet Singh on LinkedIn (opens in a new tab)",
  },
  {
    key: "instagram",
    label: "Instagram",
    value: "@hrpahulpreetofficial",
    href: founderProfile.social.instagram,
    icon: FaInstagram,
    external: true,
    action: "View profile",
    ariaLabel: "Pahulpreet Singh on Instagram (opens in a new tab)",
  },
].filter((item) => hasValue(item.href));

const safetyTips = [
  "Never pay money to anyone — not to an employer, recruiter, or agent — to get a job. Legitimate employers do not ask for payment.",
  "Verify any offer with our team before you engage. If an employer or recruiter cannot be traced back to us, be cautious.",
  "Be careful with unknown WhatsApp numbers or numbers not listed on our Contact page.",
  "We will never ask you for an OTP, bank password, or any financial information.",
];

const faqItems = [
  {
    id: "faq-free",
    question: "Is it free to apply?",
    answer: aboutConfig.noFeePolicyConfirmed
      ? "Yes — applying through Jobs Mania - Freefund costs nothing. We do not charge candidates any fee at any stage."
      : "We do not charge candidates a platform fee to browse or submit applications through this website. However, please read our Terms and the specific job listing carefully, as individual hiring processes can vary. If you are ever asked to pay money to secure a job, stop and report it.",
  },
  {
    id: "faq-multiple",
    question: "Can I be considered for more than one role?",
    answer:
      "Yes. Tell us about every kind of role you are genuinely interested in and qualify for, and our team will put you forward where there is a match.",
  },
  {
    id: "faq-after-apply",
    question: "What happens after I apply?",
    answer:
      "Your application goes to our recruitment team for review. If your profile fits the requirements, the relevant HR contact will reach out to you. We cannot guarantee a response time or an outcome — selection is at the employer's discretion.",
  },
  {
    id: "faq-edit",
    question: "Can I edit my application after submitting?",
    answer:
      "If you made a mistake or your details have changed, contact us through the Contact page as soon as possible and we will update our records.",
  },
  {
    id: "faq-data",
    question: "How is my personal data used?",
    answer: (
      <>
        Your information is used only to process your enquiry and any role we put you forward for. Please read our{" "}
        <Link to="/privacy-policy" className="underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        for full details on how we collect, store, and protect your data.
      </>
    ),
  },
  {
    id: "faq-fake",
    question: "How do I report a fake or suspicious job?",
    answer: (
      <>
        If someone contacts you claiming to be from Jobs Mania -{" "}
        Freefund but asks for money or sensitive information, please{" "}
        <Link to="/contact" className="underline underline-offset-2">
          contact us immediately
        </Link>
        . We take fraud reports seriously and will investigate promptly.
      </>
    ),
  },
  {
    id: "faq-employer",
    question: "I'm an employer. Can my company list vacancies?",
    answer: (
      <>
        Yes. If you want to list a vacancy with us,{" "}
        <Link to="/contact?topic=employer" className="underline underline-offset-2">
          get in touch with us
        </Link>
        . We only work with authorised, genuine employers.
      </>
    ),
  },
];

/* ─── JSON-LD ─────────────────────────────────────────────────────────────── */

function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: typeof window !== "undefined" ? window.location.origin : "",
    description:
      "A recruitment consultancy that helps candidates across India prepare properly, connect with authorised employers and get support at every step of the hiring process.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

/* ─── page ────────────────────────────────────────────────────────────────── */

export default function About() {
  // Company details — only render rows with real values
  const companyRows = [
    { label: "Legal name", value: aboutConfig.legalName },
    { label: "Registered address", value: aboutConfig.registeredAddress },
    { label: "Contact email", value: aboutConfig.contactEmail },
    { label: "Contact phone", value: aboutConfig.contactPhone },
    { label: "Year established", value: aboutConfig.establishedYear },
  ].filter((row) => hasValue(row.value));

  const showCompanySection = companyRows.length > 0;

  return (
    <div>
      <PageMeta
        title="About Us"
        description={`${BRAND_NAME} is a recruitment consultancy that helps candidates across India prepare properly, connect with authorised employers and get support at every step.`}
      />
      <OrganizationJsonLd />

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-12 sm:py-14">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title={`About ${BRAND_NAME}`}
            description="A recruitment consultancy that helps candidates across India prepare properly, connect with authorised employers, and get support at every step."
          />
          {aboutConfig.noFeePolicyConfirmed && (
            <div className="about-fee-banner" role="note" aria-label="No fee policy">
              <HiCheckCircle aria-hidden="true" size={18} />
              <span>Applying through this platform is free for candidates.</span>
            </div>
          )}
        </div>
      </section>

      {/* ── 2. Founder profile card ────────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            align="center"
            eyebrow="Meet the founder"
            title={`The person behind ${BRAND_NAME}`}
            data-reveal
          />
          <div
            className="mt-8 flex justify-center"
            data-reveal="scale"
            style={{ "--reveal-delay": "60ms" }}
          >
            <FounderCard />
          </div>
        </div>
      </section>

      {/* ── 3. Our Mission ──────────────────────────────────────────────── */}
      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading eyebrow="Mission" title="Our Mission" data-reveal />
          <div
            className="mt-6 max-w-3xl space-y-4 text-[1.02rem]"
            data-reveal
            style={{ "--reveal-delay": "90ms" }}
          >
            <p>
              At Jobs Mania Freefund, we believe that everyone deserves a fair opportunity to
              build a successful career, regardless of their financial background.
            </p>
            <p>
              Our mission is to help job seekers discover employment opportunities, access useful
              career resources, and move forward with confidence. We aim to make job information
              and career support accessible to everyone, completely free of cost.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. About the Founder ────────────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading eyebrow="Founder" title="About the Founder" data-reveal />
          <div
            className="mt-6 max-w-3xl space-y-4 text-[1.02rem]"
            data-reveal
            style={{ "--reveal-delay": "90ms" }}
          >
            <p className="font-semibold text-primary">
              Pahulpreet Singh <span className="text-muted">|</span> HR &amp; Recruitment
              Professional
            </p>
            <p>
              Pahulpreet Singh is from Amritsar, Punjab, and has professional experience in HR,
              recruitment, talent acquisition, and academic counselling.
            </p>
            <p>
              Throughout his professional journey, he has interacted with candidates from
              different backgrounds and understood the challenges they face while searching for
              jobs, preparing for interviews, and building their careers.
            </p>
            <p>
              He believes that people sometimes lack not talent, but the right guidance,
              opportunities, and support.
            </p>
            <p>This belief inspired him to create Jobs Mania Freefund.</p>
          </div>
        </div>
      </section>

      {/* ── 5. Why I Started This Initiative ────────────────────────────── */}
      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Motivation"
            title="Why I Started This Initiative"
            data-reveal
          />
          <div
            className="mt-6 max-w-3xl space-y-4 text-[1.02rem]"
            data-reveal
            style={{ "--reveal-delay": "90ms" }}
          >
            <p>
              The vision behind Jobs Mania Freefund is not just to share job openings, but to
              help people take meaningful steps towards employment and career growth.
            </p>
            <p>
              Through this platform, the aim is to share genuine job opportunities, provide
              helpful career resources, and guide candidates who need support in their
              professional journey.
            </p>
            <p>
              Helping someone find a job can make a real difference in their life and their
              family's future.
            </p>
            <p>
              That is why the goal is to keep job opportunities and candidate support free of
              charge.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Our Future Vision ────────────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="What's next"
            title="Our Future Vision — A Free Learning Community"
            data-reveal
          />
          <p className="mt-6 max-w-3xl text-[1.02rem]" data-reveal style={{ "--reveal-delay": "90ms" }}>
            Jobs Mania Freefund aims to build a free community where job seekers can:
          </p>
          <ul
            className="mt-4 grid max-w-3xl gap-3 sm:grid-cols-2"
            aria-label="Planned free learning community"
          >
            {futureVision.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3"
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` }}
              >
                <HiCheckCircle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-sm text-muted" data-reveal="fade">
            This community is a future initiative that is still being planned — it is not a
            service we offer today. The objective is to help candidates become better prepared
            for employment without charging them for guidance or interview preparation.
          </p>
        </div>
      </section>

      {/* ── 7. Our Promise ──────────────────────────────────────────────── */}
      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading eyebrow="Our word" title="Our Promise" data-reveal />
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {promises.map((item, index) => (
              <article
                key={item.title}
                className="surface-card surface-card-hover about-card p-5"
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="icon-tile shrink-0">
                    <HiCheckCircle aria-hidden="true" />
                  </span>
                  <h3 className="text-base leading-snug">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Closing statement ────────────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <div className="founder-closing px-6 py-10 sm:px-10 sm:py-14" data-reveal>
            <p className="eyebrow justify-center">Our belief</p>
            <p className="founder-closing-quote mx-auto mt-5 max-w-3xl text-balance">
              &ldquo;Jobs Mania Freefund is built on one simple belief: helping people move
              forward in their careers should not always come with a price tag.&rdquo;
            </p>
            <span className="mx-auto mt-7 block h-px w-20 bg-white/25" aria-hidden="true" />
            <p className="founder-closing-tagline mx-auto mt-7 max-w-2xl">
              Your Career. Your Opportunities. Your Future.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. Contact the founder ──────────────────────────────────────── */}
      {founderContacts.length > 0 && (
        <section className="section-band py-12 sm:py-14">
          <div className="page-shell">
            <SectionHeading
              eyebrow="Contact"
              title="Get in touch"
              description="Questions about an opportunity, a collaboration, or this initiative — reach Pahulpreet Singh directly."
              data-reveal
            />
            <ul
              className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              aria-label="Founder contact details"
            >
              {founderContacts.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={item.key} data-reveal style={{ "--reveal-delay": `${index * 70}ms` }}>
                    <a
                      className="surface-card surface-card-hover about-card group flex h-full flex-col p-5"
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      aria-label={item.ariaLabel}
                    >
                      <span className="icon-tile">
                        <Icon aria-hidden="true" />
                      </span>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold text-primary">{item.value}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
                        {item.action}
                        <HiArrowRight
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-sm text-muted" data-reveal="fade">
              Prefer a form? The{" "}
              <Link to="/contact" className="font-semibold text-primary underline underline-offset-2">
                Contact page
              </Link>{" "}
              sends your message straight to the team.
            </p>
          </div>
        </section>
      )}

      {/* ── 10. What we do ────────────────────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="What we do"
            title="Recruitment help, and free preparation tools"
            description="Genuine guidance from a real team, plus free tools that help you arrive better prepared."
            data-reveal
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="surface-card surface-card-hover about-card p-5 sm:p-6"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` }}
                >
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 11. How hiring works ──────────────────────────────────────────── */}
      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="How it works"
            title="Your path from search to outcome"
            description="A straightforward five-step journey — no surprises."
            data-reveal
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Hiring steps">
            {hiringSteps.map((step, index) => (
              <li
                key={step.label}
                className="surface-card surface-card-hover about-card p-5"
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="icon-tile font-display text-sm font-bold" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < hiringSteps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-line lg:block" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-4 text-base font-semibold">{step.label}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 12. Our commitments ───────────────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Our commitments"
            title="What you can count on"
            description="These are things we do today, not promises about the future."
            data-reveal
          />
          <ul className="mt-7 grid gap-4 sm:grid-cols-2" aria-label="Commitments">
            {commitments.map((c, index) => (
              <li
                key={c}
                className="surface-card surface-card-hover about-card flex items-start gap-4 p-5"
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` }}
              >
                <HiCheckCircle
                  aria-hidden="true"
                  className="about-card-icon mt-0.5 shrink-0 text-primary"
                  size={20}
                />
                <p className="text-sm leading-relaxed text-muted">{c}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted" data-reveal="fade">
            By using this site you agree to our{" "}
        <Link to="/privacy-policy" className="underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link to="/terms-and-conditions" className="underline underline-offset-2">
          Terms &amp; Conditions
        </Link>
            .
          </p>
        </div>
      </section>

      {/* ── 13. Stay safe from job scams ──────────────────────────────────── */}
      <section className="section-band py-12 sm:py-14">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Safety"
            title="Stay safe from job scams"
            description="Genuine jobs don't ask for money. Here's how to protect yourself."
            data-reveal
          />
          <div className="mt-7 surface-card surface-card-hover about-card p-6 sm:p-8" data-reveal>
            <div className="flex items-start gap-4 border-b border-line pb-6 mb-6">
              <span className="icon-tile icon-tile-solid shrink-0">
                <HiExclamationTriangle aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Red flags to watch for</h3>
                <p className="mt-1 text-sm text-muted">
                  If something feels off, trust your instinct and verify before sharing personal information.
                </p>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {safetyTips.map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <HiExclamationTriangle
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-muted"
                    size={16}
                  />
                  <p className="text-sm text-muted">{tip}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-sm text-muted">
                Seen something suspicious?{" "}
                <Link to="/contact" className="font-semibold text-primary underline underline-offset-2">
                  Report it to us
                </Link>
                {" "}and we will investigate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. Company details ───────────────────────────────────────────── */}
      {showCompanySection && (
        <section className="section py-12 sm:py-14">
          <div className="page-shell">
            <SectionHeading eyebrow="Company" title="Company details" data-reveal />
            <dl
              className="mt-7 surface-card surface-card-hover about-card divide-y divide-line overflow-hidden"
              data-reveal
            >
              {companyRows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 px-6 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:items-baseline"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted pt-1">
                    {row.label}
                  </dt>
                  <dd className="text-sm text-primary">
                    {row.label === "Contact email" ? (
                      <a href={`mailto:${row.value}`} className="underline underline-offset-2">
                        {row.value}
                      </a>
                    ) : row.label === "Contact phone" ? (
                      <a href={`tel:${String(row.value).replace(/\s/g, "")}`} className="underline underline-offset-2">
                        {row.value}
                      </a>
                    ) : (
                      String(row.value)
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ── 15. FAQ ───────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className={`${showCompanySection ? "section-band" : "section"} py-12 sm:py-14`}
      >
        <div className="page-shell">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Honest answers about how this platform works today."
            data-reveal
          />
          <div className="mt-7 surface-card surface-card-hover about-card" data-reveal>
            <FaqList items={faqItems} />
          </div>
        </div>
      </section>

      {/* ── 16. Employer / partner enquiry CTA ───────────────────────────── */}
      <section className={`${showCompanySection ? "section" : "section-band"} py-12 sm:py-14`}>
        <div className="page-shell">
          <div
            className="surface-card surface-card-hover about-card p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8"
            data-reveal
          >
            <div className="max-w-xl">
              <p className="eyebrow">For employers</p>
              <h2 className="mt-3 text-2xl sm:text-3xl">Want to list a vacancy?</h2>
              <p className="mt-2 text-muted">
                We work only with authorised, genuine employers. If you are an employer or hiring partner with a
                role to fill, reach out and we will walk you through the process.
              </p>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <Link to="/contact?topic=employer" className="btn-primary btn-lg">
                <HiEnvelope aria-hidden="true" />
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 17. Final CTA band ────────────────────────────────────────────── */}
      <section className="section py-12 sm:py-14">
        <div className="page-shell">
          <div className="cta-panel p-8 sm:p-10 lg:p-12" data-reveal>
            <span className="cta-shape cta-shape-lg" aria-hidden="true" />
            <span className="cta-shape cta-shape-sm" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1.25fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="eyebrow">Ready?</p>
                <h2 className="mt-3 text-balance text-3xl sm:text-4xl">Ready when you are</h2>
                <p className="mt-3 text-lg">
                  Prepare your resume, practise for the interview, and get in touch when you are ready to talk.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/resume-builder" className="btn-inverse btn-lg">
                    Build Your Resume
                    <HiArrowRight aria-hidden="true" />
                  </Link>
                  <Link to="/contact" className="btn-outline-inverse btn-lg">
                    Contact us
                  </Link>
                  <WhatsAppCta className="btn-outline-inverse btn-lg">
                    Join our WhatsApp Channel
                  </WhatsAppCta>
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
