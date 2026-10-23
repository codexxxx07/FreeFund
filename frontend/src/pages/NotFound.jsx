import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center py-16">
      <PageMeta title="Not Found" description="The requested page or job could not be found." />
      <div className="surface-panel relative max-w-xl overflow-hidden px-6 py-12 text-center sm:px-10">
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">404</p>
          <h1 className="mt-3 text-3xl sm:text-4xl">This page is not available</h1>
          <p className="mt-3 text-ink-muted">
            The job or page you requested does not exist in this prototype. It may have an incorrect Job ID, or the
            link may be out of date.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/jobs" className="btn-primary group">
              Back to Jobs
              <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link to="/" className="btn-secondary">
              Go to Home
            </Link>
          </div>
        </div>
        <span className="skew-decor -right-16 -top-12 h-40 w-40 opacity-40" aria-hidden="true" />
      </div>
    </div>
  );
}
