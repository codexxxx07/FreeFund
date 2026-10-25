import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { BRAND_NAME, IS_DEMO } from "../data/constants";

function Section({ title, children, first = false }) {
  return (
    <section className={first ? "" : "border-t border-line pt-8"}>
      <h2 className="text-xl sm:text-2xl">{title}</h2>
      <div className="mt-2.5 grid gap-3 text-muted">{children}</div>
    </section>
  );
}

export default function Terms() {
  return (
    <div>
      <PageMeta
        title="Terms & Conditions"
        description={`Terms for using the ${BRAND_NAME} website, its job listings, resume builder, practice tools and career guidance.`}
        canonicalPath="/terms-and-conditions"
      />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-10 lg:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Terms & Conditions"
            description="Last updated: 25 October 2026. These terms cover how this website may be used. Commercial and jurisdiction details are marked where the owner still needs to confirm them."
          />
        </div>
      </section>

      <div className="page-shell py-10">
        <article className="surface-panel mx-auto max-w-4xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 border-b border-line pb-6">
            <span className="badge badge-primary">Frontend-only website</span>
            <span className="badge">Owner details pending confirmation</span>
          </div>

          <p className="mt-6 text-muted">
            These terms describe acceptable use of the {BRAND_NAME} website. They are not a complete commercial
            contract and have not been independently legally reviewed.
          </p>

          <div className="mt-8 grid gap-8">
            <Section title="Using this website" first>
              <p>
                You may browse the site, use the resume builder and practice tools, read the guidance articles, and
                make enquires through the contact page for lawful purposes.
              </p>
              <p>
                Do not submit other people's personal information, attempt to disrupt the site, misrepresent a
                prototype submission as a completed hiring action, or use the content to mislead another person about
                an employment opportunity.
              </p>
            </Section>

            <Section title="Job listings and applications">
              <p>
                {IS_DEMO
                  ? "Listings shown in this release are sample records. They must not be treated as genuine employment offers, and submitting the application form does not create any relationship with an employer."
                  : "Listings are provided for information. Submitting an application form does not create a candidate–employer relationship; that begins only if the employer chooses to engage with you directly."}
              </p>
              <p>
                Each listing shows its own status. When a role is marked paused or closed, applications for it are
                disabled, and we are not obliged to reopen or re-advertise it.
              </p>
            </Section>

            <Section title="No employment guarantee">
              <p>
                {BRAND_NAME} does not guarantee an interview, selection, salary, job offer or employment outcome.
                Recruiters contacting you, if at all, do so as part of the hiring process for a specific role and
                remain at the employer's discretion.
              </p>
              <p>We never ask for money to apply or to be considered. If someone asks you for payment claiming to represent us, stop and report it through the contact page.</p>
            </Section>

            <Section title="Free tools, guidance and practice tests">
              <p>
                The resume builder, typing test, English quiz, basic computer test and guidance articles are provided
                free for general use. They are not an official assessment, a certification, or personalised career,
                legal or training advice.
              </p>
              <p>
                Practice scores are calculated in your browser for your own reference. No employer or educational
                institution is notified of them, and they carry no formal recognition.
              </p>
            </Section>

            <Section title="Your data and local storage">
              <p>
                The resume builder stores what you type in your own browser so you can continue later. You can erase it
                at any time with the “Clear saved data” button or your browser's site settings. See the{" "}
                <a href="/privacy-policy" className="font-semibold underline underline-offset-2">
                  Privacy Policy
                </a>{" "}
                for the full description of what is and is not stored.
              </p>
            </Section>

            <Section title="External links">
              <p>
                Links to a WhatsApp Channel, employer sites or public form providers are provided for convenience. We do
                not control those services and are not responsible for their content, availability or handling of
                anything you submit to them.
              </p>
            </Section>

            <Section title="Payments">
              <p>
                This website does not process payments, subscriptions or advertising. Any commercial arrangement for
                recruitment services is agreed separately and in writing.
              </p>
            </Section>

            <Section title="Limitation and governing law">
              <p>
                The website is provided as-is and as-available. To the extent permitted by law, we are not liable for
                losses arising from reliance on listings, guidance or third-party sites.
              </p>
              <p className="text-sm">
                [To confirm before launch: registered entity name, jurisdiction, governing law, and any limitation or
                dispute-resolution language required for the business.]
              </p>
            </Section>

            <Section title="Changes to these terms">
              <p>
                We may update these terms as the website changes. The “Last updated” date at the top shows when that
                last happened, and continued use after a change means you accept the updated version.
              </p>
            </Section>
          </div>
        </article>
      </div>
    </div>
  );
}
