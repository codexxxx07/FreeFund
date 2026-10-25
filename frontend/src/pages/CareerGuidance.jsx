import { Link, useSearchParams } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import SectionHeading from "../components/common/SectionHeading";
import EmptyState from "../components/common/EmptyState";
import ArticleCard from "../components/career/ArticleCard";
import { BRAND_NAME } from "../data/constants";
import { CAREER_CATEGORIES, careerArticles } from "../data/careerArticles";

export default function CareerGuidance() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const visible = activeCategory
    ? careerArticles.filter((article) => article.category === activeCategory)
    : careerArticles;

  function setCategory(category) {
    const params = new URLSearchParams(searchParams);
    if (category) params.set("category", category);
    else params.delete("category");
    setSearchParams(params, { replace: true });
  }

  return (
    <div>
      <PageMeta
        title="Career Guidance"
        description={`Practical, plain-language career guidance for job seekers: resume writing, job search, interview preparation, professional communication and workplace readiness. ${BRAND_NAME}.`}
      />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-10 lg:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Career resources"
            title="Career Guidance"
            description="Short, practical articles you can act on today — no theory, no guarantees, just the habits that make a job search and a first job easier."
          />

          <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
            <button
              type="button"
              className={`btn-tab${activeCategory === "" ? " is-selected" : ""}`}
              aria-pressed={activeCategory === ""}
              onClick={() => setCategory("")}
            >
              All topics
              <span className="badge ml-1" aria-hidden="true">
                {careerArticles.length}
              </span>
            </button>
            {CAREER_CATEGORIES.map((category) => {
              const count = careerArticles.filter((article) => article.category === category).length;
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  className={`btn-tab${selected ? " is-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => setCategory(category)}
                >
                  {category}
                  <span className="badge ml-1" aria-hidden="true">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="page-shell py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            Showing <span className="font-semibold text-fg">{visible.length}</span>{" "}
            {visible.length === 1 ? "article" : "articles"}
            {activeCategory ? ` in ${activeCategory}` : ""}.
          </p>
          {activeCategory ? (
            <button type="button" className="btn-ghost min-h-0 px-2 py-1" onClick={() => setCategory("")}>
              Clear filter
            </button>
          ) : null}
        </div>

        {visible.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No articles in this topic yet"
            description="Try another category — more articles are added over time."
            action={
              <button type="button" className="btn-primary" onClick={() => setCategory("")}>
                Show all topics
              </button>
            }
          />
        )}

        <section className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="surface-card p-6">
            <p className="eyebrow">Practise</p>
            <h2 className="mt-3 text-xl sm:text-2xl">Test yourself before the real thing</h2>
            <p className="mt-2 text-sm text-muted">
              Free typing, English and computer practice tools run entirely in your browser.
            </p>
            <Link to="/practice-tools" className="btn-primary mt-5">
              Open practice tools
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="surface-card p-6">
            <p className="eyebrow">Apply</p>
            <h2 className="mt-3 text-xl sm:text-2xl">Put the advice into a resume</h2>
            <p className="mt-2 text-sm text-muted">
              Build a clean, single-column resume and export it as a PDF in minutes.
            </p>
            <Link to="/resume-builder" className="btn-primary mt-5">
              Open resume builder
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
