import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import PageMeta from "../components/common/PageMeta";
import EmptyState from "../components/common/EmptyState";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";
import SectionHeading from "../components/common/SectionHeading";
import { EXPERIENCE_FILTERS, IS_DEMO } from "../data/constants";
import { getOpenJobs } from "../utils/jobsApi";
import { filtersToSearch, hasActiveFilters, matchesFilters, readFiltersFromSearch } from "../utils/filters";

const FILTER_LABELS = {
  q: "Search",
  location: "Location",
  category: "Category",
  workMode: "Work mode",
  experience: "Experience",
};

function filterValueLabel(key, value) {
  if (key === "experience") {
    return EXPERIENCE_FILTERS.find((item) => item.value === value)?.label || value;
  }
  return value;
}

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

  function removeFilter(key) {
    const next = { ...filters };
    next[key] = "";
    updateFilters(next);
  }

  const activeChips = Object.entries(filters)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => ({
      key,
      label: `${FILTER_LABELS[key] || key}: ${filterValueLabel(key, value)}`,
    }));

  return (
    <div>
      <PageMeta
        title="Jobs"
        description="Browse job listings by location, category, work mode, and experience."
      />

      <section className="border-b border-line bg-secondary">
        <div className="page-shell py-10 lg:py-12">
          <SectionHeading
            as="h1"
            eyebrow="Vacancies"
            title="Jobs"
            description={
              IS_DEMO
                ? "Open sample listings. Closed and paused roles are hidden from this list."
                : "Browse available roles and apply when you're ready."
            }
          />
        </div>
      </section>

      <div className="page-shell py-8 sm:py-10">
        <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
          <JobFilters
            filters={filters}
            onChange={updateFilters}
            onClear={clearFilters}
            resultCount={results.length}
          />

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">
                Showing <span className="font-semibold text-fg">{results.length}</span> open{" "}
                {IS_DEMO ? "sample " : ""}
                {results.length === 1 ? "role" : "roles"}
                {hasActiveFilters(filters) ? " matching your filters" : ""}.
              </p>
            </div>

            {activeChips.length ? (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => removeFilter(chip.key)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-secondary px-3 py-1.5 text-xs font-semibold text-fg"
                    aria-label={`Remove filter ${chip.label}`}
                  >
                    {chip.label}
                    <HiXMark aria-hidden="true" />
                  </button>
                ))}
                <button type="button" className="btn-ghost min-h-0 px-2 py-1" onClick={clearFilters}>
                  Clear all
                </button>
              </div>
            ) : null}

            {results.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {results.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No matching jobs"
                description={
                  IS_DEMO
                    ? "No open sample roles match these filters. Try another location, category, or clear the filters."
                    : "No roles match these filters. Try another location, category, or clear the filters."
                }
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
    </div>
  );
}
