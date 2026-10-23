import { Link } from "react-router-dom";
import { HiArrowRight, HiMagnifyingGlass } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[70vh] items-center py-16">
      <PageMeta title="Not Found" description="The requested page or job could not be found." />
      <div className="surface-panel mx-auto w-full max-w-xl p-8 text-center sm:p-10">
        <span className="icon-tile icon-tile-solid icon-tile-lg mx-auto">
          <HiMagnifyingGlass size={24} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-5 justify-center">Error 404</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-muted">
          The job or page you requested could not be found.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/jobs" className="btn-primary">
            Back to jobs
            <HiArrowRight aria-hidden="true" />
          </Link>
          <Link to="/" className="btn-secondary">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
