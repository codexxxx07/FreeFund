import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

/** Reusable career guidance article card used on the listing page. */
export default function ArticleCard({ article }) {
  return (
    <article className="surface-card surface-card-hover flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge badge-primary">{article.category}</span>
        <span className="badge">{article.readMinutes} min read</span>
      </div>
      <h3 className="mt-4 text-xl text-balance">
        <Link to={`/career-guidance/${article.slug}`} className="focus-visible:outline-2 focus-visible:outline-offset-4">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{article.summary}</p>
      <div className="mt-auto pt-5">
        <Link to={`/career-guidance/${article.slug}`} className="btn-secondary">
          Read article
          <HiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
