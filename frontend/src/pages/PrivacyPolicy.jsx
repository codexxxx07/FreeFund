import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { BRAND_NAME, IS_DEMO } from "../data/constants";
import siteConfig from "../data/siteConfig";

function Section({ title, children, first = false }) {
  return (
    <section className={first ? "" : "border-t border-line pt-8"}>
      <h2 className="text-xl sm:text-2xl">{title}</h2>
      <div className="mt-2.5 grid gap-3 text-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  const hasVerifiedContact = Boolean(siteConfig.contact.email) && !siteConfig.contact.email.includes("example.com");

  return (
    <div>
      <PageMeta
        title="Privacy Policy"
        description={`How ${BRAND_NAME} handles the information you enter on this website: local browser storage only, no accounts, no server-side database.`}
        canonicalPath="/privacy-policy"
      />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-12 sm:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Privacy Policy"
            description="Last updated: 25 October 2026. This policy describes what the website actually does today. Items that still need the owner's confirmation are marked."
          />
        </div>
      </section>

      <div className="page-shell py-12 sm:py-14">
        <article className="surface-panel mx-auto max-w-4xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 border-b border-line pb-6">
            <span className="badge badge-primary">Frontend-only website</span>
            <span className="badge">Owner details pending confirmation</span>
          </div>

          <p className="mt-6 text-muted">
            {BRAND_NAME} runs entirely in your browser. There is no user account, no login and no server-side database
            behind this release. This page explains exactly what that means for the information you type.
          </p>

          <div className="mt-8 grid gap-8">
            <Section title="Information you enter" first>
              <p>
                <strong className="text-fg">Application forms.</strong> Details you enter on a job application are
                validated in your browser.{" "}
                {IS_DEMO
                  ? "In this release they are kept in this browser tab's session storage only, are never sent to an employer, and are deleted when the tab closes."
                  : "Nothing is transmitted until a delivery step you choose is completed."}
              </p>
              <p>
                <strong className="text-fg">Resume Builder.</strong> Everything you type is saved to your browser's
                local storage on your own device so that you can continue later. It is not uploaded, backed up or
                shared. Use the “Clear saved data” button on the Resume Builder page to erase it from this device at any
                time, or clear this site's data in your browser settings.
              </p>
              <p>
                <strong className="text-fg">Practice tools.</strong> The typing, English and computer tests are
                calculated entirely in your browser. Scores are not stored or transmitted, and they disappear when you
                refresh or close the page.
              </p>
              <p>
                <strong className="text-fg">Contact form.</strong> Nothing is stored on this website. When you continue
                from the form you choose how to send the message yourself — through your email app or WhatsApp — so it
                goes directly from you to us.
              </p>
            </Section>

            <Section title="Information this website does not collect">
              <p>
                This release does not create accounts, set tracking cookies, or include analytics, advertising or
                session-replay scripts.
              </p>
              <p>
                We do not ask for bank details, payment information, OTPs or identity documents. Anyone requesting
                those while claiming to represent {BRAND_NAME} should be reported through the contact page.
              </p>
            </Section>

            <Section title="External links">
              <p>
                The site links out to a WhatsApp Channel and may link to employer application pages or public form
                providers. Those services operate under their own privacy policies, and anything you submit to them is
                handled outside our control.
              </p>
            </Section>

            <Section title="Job listings and accuracy">
              <p>
                {IS_DEMO
                  ? "Listings currently published are labelled sample content and exist to demonstrate the site. They are not genuine employment offers."
                  : "Listings are published in good faith. We do not warrant that every listing is still current when you read it — the status shown on the listing page is the authoritative one."}
              </p>
              <p>
                Guidance articles and practice tests are general information for job seekers, not personalised career,
                legal or assessment advice.
              </p>
            </Section>

            <Section title="Sharing and future processing">
              <p>
                Nothing you enter on this website is shared with third parties by this website today. If an applicant
                tracking system, employer handover or email service is introduced later, this policy will be updated
                before that happens, together with the retention period.
              </p>
              <p className="text-sm">
                [To confirm before launch: data controller legal name, registered address, retention period, and the
                grievance or data-protection contact person.]
              </p>
            </Section>

            <Section title="Your requests">
              <p>
                Because your resume and practice data stay in your own browser, you can remove them yourself at any time
                using the buttons provided or your browser's site data settings.
              </p>
              <p>
                For anything held outside the website — an application you sent, or a message you chose to email or
                WhatsApp — you can ask about access, correction or deletion by contacting us.
                {hasVerifiedContact ? null : " A verified contact address will be published here once confirmed."}
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                The “Last updated” date at the top of this page changes whenever this policy changes. Using the website
                after a change means you are reading the updated version.
              </p>
            </Section>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-sm text-muted">
              Questions about this policy can be raised through the{" "}
              <a href="/contact" className="font-semibold underline underline-offset-2">
                contact page
              </a>
              .
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
