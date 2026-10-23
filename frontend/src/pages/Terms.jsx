import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { BRAND_NAME } from "../data/constants";

export default function Terms() {
  return (
    <div>
      <PageMeta title="Terms & Conditions" description={`Terms for using the ${BRAND_NAME} website prototype.`} />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-10 lg:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Terms & Conditions"
            description="Last updated: 23 October 2026. Governing-law and company details are pending confirmation."
          />
        </div>
      </section>

      <div className="page-shell py-10">
        <article className="surface-panel mx-auto max-w-4xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 border-b border-line pb-6">
            <span className="badge badge-primary">Draft document</span>
            <span className="badge">Requires owner confirmation</span>
          </div>

          <p className="mt-6 text-muted">
            These terms describe acceptable use of the {BRAND_NAME} website prototype. They are not a complete
            commercial contract and have not been independently legally reviewed.
          </p>

          <div className="mt-8 grid gap-8">
            <section>
              <h2 className="text-xl sm:text-2xl">Sample content</h2>
              <p className="mt-2 text-muted">
                Job listings currently shown are sample/demo records. They must not be treated as genuine employment
                offers. Applying through this prototype does not create a candidate–employer relationship.
              </p>
            </section>

            <section className="border-t border-line pt-8">
              <h2 className="text-xl sm:text-2xl">Acceptable use</h2>
              <p className="mt-2 text-muted">
                Do not submit other people&apos;s personal information, attempt to disrupt the site, or represent demo
                submissions as completed hiring actions.
              </p>
            </section>

            <section className="border-t border-line pt-8">
              <h2 className="text-xl sm:text-2xl">No employment guarantee</h2>
              <p className="mt-2 text-muted">
                {BRAND_NAME} does not guarantee interviews, selection, salary, or employment. Recruiter contact, if it
                happens later, depends on processes that are not part of Phase 1.
              </p>
            </section>

            <section className="border-t border-line pt-8">
              <h2 className="text-xl sm:text-2xl">Limitation</h2>
              <p className="mt-2 text-muted">
                The site is provided as a design and navigation prototype. [To confirm: registered company name,
                jurisdiction, and any liability language required before launch.]
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
