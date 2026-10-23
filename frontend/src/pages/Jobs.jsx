import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageMeta from "../components/common/PageMeta";
import DemoNotice from "../components/common/DemoNotice";
import EmptyState from "../components/common/EmptyState";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";
import SectionHeading from "../components/common/SectionHeading";
import { getOpenJobs } from "../utils/jobsApi";
import { filtersToSearch, hasActiveFilters, matchesFilters, readFiltersFromSearch } from "../utils/filters";

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = readFiltersFromSearch(searchParams);

  const results = useMemo(() => {
    const current = readFiltersFromSearch(searchParams);
    return getOpenJobs().filter((job) => matchesFilters(job, current));
  }, [searchParams]);

  function updateFilters(next) {
    setSearchParams(filtersToSearch(next), { replace: true });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
  }

  return (
    <div className="page-shell py-10">
      <PageMeta
        title="Current Jobs"
        description="Browse sample job listings by location, category, work mode, and experience."
      />
      <SectionHeading
        eyebrow="Vacancies"
        title="Current jobs"
        description="Open sample vacancies only. Closed and paused roles are hidden from this list. Salary ranges appear when they were included in the demo dataset."
      />
      <div className="mt-6">
        <DemoNotice />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
        <JobFilters
          filters={filters}
          onChange={updateFilters}
          onClear={clearFilters}
          resultCount={results.length}
        />
        <div>
          {results.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {results.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No matching jobs"
              description="No open sample vacancies match these filters. Try another location, category, or clear the filters."
              action={
                hasActiveFilters(filters) ? (
                  <button type="button" className="btn-primary" onClick={clearFilters}>
                    Clear filters
                  </button>
                ) : null
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
