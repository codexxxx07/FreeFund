import { HiCheckBadge, HiEye, HiShieldCheck, HiSwatch } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { BRAND_NAME } from "../data/constants";

const principles = [
  {
    icon: HiEye,
    title: "Honest demo content",
    body: "Sample listings are labelled. Verified company details, client names, and performance statistics will only be added when the business owner confirms them.",
  },
  {
    icon: HiCheckBadge,
    title: "Clear job status",
    body: "Open roles remain visible while closed or paused roles are clearly marked and removed from the current vacancies list.",
  },
  {
    icon: HiShieldCheck,
    title: "No placement guarantees",
    body: `${BRAND_NAME} does not guarantee interviews, selection, or employment. Future recruitment communication depends on processes not yet implemented.`,
  },
];

const designPoints = [
  "Clean typography and strong hierarchy",
  "Consistent color tokens and components",
  "Layered depth with restrained shadows",
  "Responsive layouts across all pages",
  "Purposeful interactions with reduced-motion support",
];

export default function About() {
  return (
    <div>
      <PageMeta title="About Us" description={`About ${BRAND_NAME}, a recruitment website prototype.`} />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-10 lg:py-14">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="A refined recruitment website"
            description="Built to make job discovery clear, honest, and easy to act on."
          />
        </div>
      </section>

      <div className="page-shell py-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="surface-panel space-y-5 p-6 sm:p-8">
            <h2 className="text-2xl">What we are building</h2>
            <p>
              {BRAND_NAME} is being built as a place for candidates to review job information, keep track of unique Job
              IDs, and submit applications against a specific vacancy.
            </p>
            <p className="text-muted">
              This Phase 1 website is a frontend prototype. It does not yet connect to a database, CRM, or recruiter
              dashboard. Sample listings exist so the browsing and application experience can be tested.
            </p>
            <p className="text-muted">
              The intended approach is simple: publish only authorised vacancies, show job status clearly, and collect
              applications against the correct Job ID. Verified company background, team credentials, client names, and
              performance statistics will be added by the business owner when they are available.
            </p>
            <p className="text-muted">
              {BRAND_NAME} does not guarantee interviews, selection, or employment. Any future recruitment
              communication will depend on processes that have not been implemented in this phase.
            </p>
          </article>

          <aside className="surface-panel p-6 sm:p-8">
            <span className="icon-tile icon-tile-lg">
              <HiSwatch size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-xl">Design direction</h2>
            <p className="mt-2 text-sm text-muted">
              Minimalism and Skewmorphism come together — dimensional white surfaces, layered shadows, restrained blue
              accents, and generous whitespace for clarity.
            </p>
            <ul className="mt-5 grid gap-3">
              {designPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="mt-10">
          <SectionHeading eyebrow="Principles" title="How the prototype stays honest" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="surface-card p-5 sm:p-6">
                  <span className="icon-tile">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
