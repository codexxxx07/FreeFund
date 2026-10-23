import { HiCheckBadge, HiEye, HiShieldCheck, HiSwatch } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import { BRAND_NAME } from "../data/constants";

const principles = [
  {
    icon: HiEye,
    title: "Clear listings",
    body: "Job status is clearly marked so candidates know what's open or closed at a glance.",
  },
  {
    icon: HiCheckBadge,
    title: "Focused application flow",
    body: "Apply directly from the job page with a job-specific form and helpful validation.",
  },
  {
    icon: HiShieldCheck,
    title: "No placement guarantees",
    body: `${BRAND_NAME} does not guarantee interviews, selection, or employment.`,
  },
];

const designPoints = [
  "Clean typography and strong hierarchy",
  "Consistent color tokens and components",
  "Responsive layouts across all pages",
  "Accessible focus states and keyboard support",
  "Purposeful interactions with reduced-motion support",
];

export default function About() {
  return (
    <div>
      <PageMeta title="About Us" description={`About ${BRAND_NAME}.`} />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-10 lg:py-14">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="Find roles with clarity"
            description="A simple place to browse jobs and apply with confidence."
          />
        </div>
      </section>

      <div className="page-shell py-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="surface-panel space-y-5 p-6 sm:p-8">
            <h2 className="text-2xl">About the site</h2>
            <p>
              {BRAND_NAME} helps candidates browse job listings, review job details, and apply through a focused
              application flow.
            </p>
            <p className="text-muted">
              Listings are kept clear and easy to scan. Open roles are easy to spot, and closed roles are marked
              accordingly.
            </p>
            <p className="text-muted">
              {BRAND_NAME} does not guarantee interviews, selection, or employment.
            </p>
          </article>

          <aside className="surface-panel p-6 sm:p-8">
            <span className="icon-tile icon-tile-lg">
              <HiSwatch size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-xl">Design direction</h2>
            <p className="mt-2 text-sm text-muted">
              Minimalism and Skewmorphism come together — dimensional white surfaces, layered shadows, monochrome
              black-and-white accents, and generous whitespace for clarity.
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
          <SectionHeading eyebrow="Principles" title="What to expect" />
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
