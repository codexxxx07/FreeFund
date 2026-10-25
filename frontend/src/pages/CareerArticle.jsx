import { Link, useParams } from "react-router-dom";
import { HiArrowLeft, HiArrowRight, HiExclamationTriangle } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import ArticleCard from "../components/career/ArticleCard";
import NotFound from "./NotFound";
import { BRAND_NAME } from "../data/constants";
import { getArticleBySlug, getRelatedArticles } from "../data/careerArticles";

export default function CareerArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) return <NotFound />;

  const related = getRelatedArticles(article, 3);

  return (
    <div>
      <PageMeta title={article.title} description={article.summary} />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell-narrow py-8 lg:py-12">
          <Link to="/career-guidance" className="btn-ghost -ml-2 inline-flex items-center gap-2">
            <HiArrowLeft aria-hidden="true" />
            All career guidance
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="badge badge-primary badge-dot">{article.category}</span>
            <span className="badge">{article.readMinutes} min read</span>
          </div>

          <h1 className="mt-4 text-balance text-3xl sm:text-4xl lg:text-[2.7rem]">{article.title}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{article.summary}</p>
        </div>
      </section>

      <div className="page-shell-narrow py-10">
        <article className="surface-panel p-6 sm:p-9">
          <div className="grid gap-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl sm:text-2xl">{section.heading}</h2>
                {section.body ? <p className="mt-2.5 leading-relaxed text-muted">{section.body}</p> : null}
                {section.bullets?.length ? (
                  <ul className="mt-4 grid gap-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.warnings?.length ? (
                  <div className="surface-inset mt-4 p-4">
                    <p className="flex items-start gap-2.5 text-sm font-semibold text-fg">
                      <HiExclamationTriangle className="mt-0.5 shrink-0" aria-hidden="true" />
                      Keep in mind
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {section.warnings.map((warning) => (
                        <li key={warning} className="text-sm text-muted">
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            <Link to="/resume-builder" className="btn-primary">
              Resume Builder
              <HiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/practice-tools" className="btn-secondary">
              Free Practice Tools
            </Link>
            <Link to="/jobs" className="btn-secondary">
              Find Jobs
            </Link>
          </div>
        </article>

        {related.length ? (
          <section className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Keep reading</p>
                <h2 className="mt-3 text-2xl">Related articles</h2>
              </div>
              <Link to="/career-guidance" className="btn-secondary">
                All topics
                <HiArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </section>
        ) : null}

        <p className="mt-10 text-xs text-muted">
          Guidance provided by {BRAND_NAME} for general information only. No career outcome is guaranteed.
        </p>
      </div>
    </div>
  );
}
