import { Link } from "react-router-dom";
import { HiArrowRight, HiCheckCircle, HiClock, HiInformationCircle } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import WhatsAppCta from "../components/common/WhatsAppCta";
import { BRAND_NAME, IS_DEMO } from "../data/constants";
import { TRAINING_STATUS, getVisiblePrograms } from "../data/trainingPrograms";
import { hasWhatsAppEnquiry, whatsappEnquiryLink } from "../data/siteConfig";

function RegistrationAction({ program }) {
  const enquiry = whatsappEnquiryLink(`Hello, I would like to know more about the ${program.title} programme.`);

  if (program.status === "open" && program.registrationUrl) {
    return (
      <a
        className="btn-primary btn-lg"
        href={program.registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Register for ${program.title} (opens in a new tab)`}
      >
        Register for this programme
        <HiArrowRight aria-hidden="true" />
      </a>
    );
  }

  if (enquiry) {
    return (
      <a
        className="btn-primary btn-lg"
        href={enquiry}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ask about ${program.title} on WhatsApp (opens in a new tab)`}
      >
        Ask about this programme
        <HiArrowRight aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link to={`/contact?topic=training&subject=${encodeURIComponent(program.title)}`} className="btn-primary btn-lg">
      Ask about this programme
      <HiArrowRight aria-hidden="true" />
    </Link>
  );
}

export default function FreeTraining() {
  const programs = getVisiblePrograms(IS_DEMO);

  return (
    <div>
      <PageMeta
        title="Free Training"
        description={`Free training and job-readiness programmes from ${BRAND_NAME}. Check eligibility, skills covered and how to register.`}
      />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-12 sm:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Career resources"
            title="Free Training"
            description="Practical, job-focused programmes for candidates who want to improve their chances — taught by our recruitment team."
          />

          {IS_DEMO ? (
            <div className="demo-notice mt-7 max-w-3xl" role="note" aria-label="Sample content notice">
              <HiInformationCircle size={18} aria-hidden="true" />
              <p>
                Sample programme outlines. Titles, eligibility, durations and registration details must be confirmed
                by the owner before publication — registration is not open until the status on a card says so.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <div className="page-shell py-12 sm:py-14">
        {programs.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {programs.map((program) => {
              const status = TRAINING_STATUS[program.status] || TRAINING_STATUS["not-open"];
              return (
                <article key={program.id} className="surface-card surface-card-hover flex h-full flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={status.badge}>{status.label}</span>
                    {program.isSample && IS_DEMO ? <span className="badge">Sample</span> : null}
                  </div>

                  <h2 className="mt-4 text-2xl text-balance">{program.title}</h2>
                  <p className="mt-2.5 leading-relaxed text-muted">{program.summary}</p>

                  <dl className="mt-5 grid gap-3">
                    <div className="surface-inset p-4">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Who it is for</dt>
                      <dd className="mt-1 text-sm">{program.audience}</dd>
                    </div>
                    {program.duration ? (
                      <div className="surface-inset flex items-start gap-2.5 p-4">
                        <HiClock className="mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Duration</dt>
                          <dd className="mt-1 text-sm">{program.duration}</dd>
                        </div>
                      </div>
                    ) : null}
                    {program.format ? (
                      <div className="surface-inset p-4">
                        <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Format</dt>
                        <dd className="mt-1 text-sm">{program.format}</dd>
                      </div>
                    ) : null}
                  </dl>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Skills covered</p>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {program.skills.map((skill) => (
                        <li key={skill} className="badge badge-neutral px-3 py-1.5 text-sm">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    <RegistrationAction program={program} />
                    {program.status !== "open" ? (
                      <p className="mt-3 text-xs text-muted">
                        Registration details are not confirmed yet, so this action asks about the programme instead of
                        enrolling you.
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="surface-panel p-8 text-center sm:p-12">
            <h2 className="text-2xl">No programmes published yet</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Confirmed training programmes will appear here as soon as they are added.
            </p>
            <Link to="/contact?topic=training" className="btn-primary mt-6">
              Ask us what is coming
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}

        <section className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="surface-card p-6 sm:p-8">
            <p className="eyebrow">How registration works</p>
            <h2 className="mt-3 text-2xl">Registration happens with our team, not in a database</h2>
            <p className="mt-3 leading-relaxed text-muted">
              This website does not store enrolments. When you start a registration you are either opening the official
              form supplied to us, messaging us on WhatsApp, or sending an enquiry — nothing is recorded here until
              that outside step is completed.
            </p>
            <ul className="mt-5 grid gap-3">
              {[
                "Check the eligibility and skills listed on the programme card.",
                "Use the registration action on the card to open the official form or message us.",
                "We confirm your seat directly — a seat is not booked until you hear back.",
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-muted">
                  <span className="icon-tile font-display text-sm font-bold" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1.5 text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-6 sm:p-8">
            <p className="eyebrow">Talk to us</p>
            <h2 className="mt-3 text-2xl">Not sure which programme fits?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Tell us your background and what role you are aiming for, and we will point you to the right option — or
              to the free practice tools if you are not ready yet.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppCta>WhatsApp Channel</WhatsAppCta>
              <Link to="/contact?topic=training" className="btn-secondary">
                Contact us
              </Link>
            </div>
            {!hasWhatsAppEnquiry() ? (
              <p className="mt-4 text-xs text-muted">
                One-to-one WhatsApp enquiries are available once a verified number is configured.
              </p>
            ) : null}
            <div className="mt-6 border-t border-line pt-5">
              <ul className="grid gap-2.5 text-sm text-muted">
                <li className="flex items-start gap-2.5">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  Free career resources are always available without registration.
                </li>
                <li className="flex items-start gap-2.5">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  No programme promises employment or an interview.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
