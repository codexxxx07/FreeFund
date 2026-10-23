import { useState } from "react";
import { HiChevronDown, HiFunnel } from "react-icons/hi2";
import { CATEGORIES, EXPERIENCE_FILTERS, LOCATIONS, WORK_MODES } from "../../data/constants";

function Select({ id, label, value, onChange, options, placeholder }) {
  return (
    <label htmlFor={id} className="block">
      <span className="field-label">{label}</span>
      <select id={id} className="field-select" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const item = typeof option === "string" ? { value: option, label: option } : option;
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export default function JobFilters({ filters, onChange, onClear, resultCount }) {
  const [open, setOpen] = useState(false);

  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  const hasFilters = Boolean(filters.q || filters.location || filters.category || filters.workMode || filters.experience);

  return (
    <aside className="surface-panel h-fit p-5 lg:sticky lg:top-28" aria-label="Job filters">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="icon-tile">
            <HiFunnel aria-hidden="true" />
          </span>
          <h2 className="text-lg">Filters</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-primary" aria-live="polite">
            {resultCount} open
          </span>
          <button
            type="button"
            className="btn-secondary min-h-0 px-3 py-2 lg:hidden"
            aria-expanded={open}
            aria-controls="job-filter-fields"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Hide" : "Show"}
            <HiChevronDown
              className={`transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div
        id="job-filter-fields"
        className={`${open ? "grid" : "hidden"} mt-5 gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-1`}
      >
        <label htmlFor="job-search" className="sm:col-span-2 lg:col-span-1">
          <span className="field-label">Search</span>
          <input
            id="job-search"
            className="field-input"
            value={filters.q}
            onChange={(event) => update("q", event.target.value)}
            placeholder="Title, ID, or keyword"
          />
        </label>
        <Select
          id="filter-location"
          label="Location"
          value={filters.location}
          onChange={(value) => update("location", value)}
          options={LOCATIONS}
          placeholder="All locations"
        />
        <Select
          id="filter-category"
          label="Category"
          value={filters.category}
          onChange={(value) => update("category", value)}
          options={CATEGORIES}
          placeholder="All categories"
        />
        <Select
          id="filter-mode"
          label="Work mode"
          value={filters.workMode}
          onChange={(value) => update("workMode", value)}
          options={WORK_MODES}
          placeholder="All work modes"
        />
        <Select
          id="filter-experience"
          label="Experience"
          value={filters.experience}
          onChange={(value) => update("experience", value)}
          options={EXPERIENCE_FILTERS}
          placeholder="All experience levels"
        />
        <button
          type="button"
          className="btn-secondary mt-1 sm:col-span-2 lg:col-span-1"
          onClick={onClear}
          disabled={!hasFilters}
        >
          Clear filters
        </button>
      </div>
    </aside>
  );
}
