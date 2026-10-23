import { HiFunnel } from "react-icons/hi2";
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
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <aside className="surface-panel relative h-fit overflow-hidden p-6">
      <div className="relative mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-bg-muted text-accent">
            <HiFunnel aria-hidden="true" />
          </span>
          <h2 className="text-lg">Filters</h2>
        </div>
        <p className="text-sm text-ink-muted">{resultCount} open roles</p>
      </div>
      <div className="relative grid gap-4">
        <label htmlFor="job-search">
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
        <button type="button" className="btn-secondary" onClick={onClear}>
          Clear filters
        </button>
      </div>
      <span className="skew-decor -bottom-10 -right-12 h-24 w-24 opacity-40" aria-hidden="true" />
    </aside>
  );
}
