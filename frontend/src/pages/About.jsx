import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { BRAND_NAME } from "../data/constants";

export default function About() {
  return (
    <div className="page-shell py-10">
      <PageMeta title="About Us" description={`About ${BRAND_NAME}, a recruitment website prototype.`} />
      <SectionHeading
        eyebrow="About"
        title="A refined recruitment website"
        description="Built to make job discovery clear, honest, and easy to act on."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-panel space-y-5 p-6 sm:p-8">
          <p>
            {BRAND_NAME} is being built as a place for candidates to review job information, keep track of unique Job
            IDs, and submit applications against a specific vacancy.
          </p>
          <p className="text-ink-muted">
            This Phase 1 website is a frontend prototype. It does not yet connect to a database, CRM, or recruiter
            dashboard. Sample listings exist so the browsing and application experience can be tested.
          </p>
          <p className="text-ink-muted">
            The intended approach is simple: publish only authorised vacancies, show job status clearly, and collect
            applications against the correct Job ID. Verified company background, team credentials, client names, and
            performance statistics will be added by the business owner when they are available.
          </p>
          <p className="text-ink-muted">
            {BRAND_NAME} does not guarantee interviews, selection, or employment. Any future recruitment communication
            will depend on processes that have not been implemented in this phase.
          </p>
        </div>
        <aside className="surface-panel relative overflow-hidden p-6 sm:p-8">
          <div className="relative">
            <h2 className="text-xl">Design direction</h2>
            <p className="mt-2 text-ink-muted">
              Skewmorphism and minimalism come together — dimensional surfaces with soft shadows, layered geometry,
              restrained accents, and generous whitespace for clarity.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-ink-muted">
              <li>• Clean typography and strong hierarchy</li>
              <li>• Consistent color tokens and components</li>
              <li>• Responsive layouts across all pages</li>
              <li>• Purposeful interactions with reduced motion support</li>
            </ul>
          </div>
          <span className="skew-decor -bottom-12 -right-14 h-28 w-28 opacity-40" aria-hidden="true" />
        </aside>
      </div>
    </div>
  );
}
