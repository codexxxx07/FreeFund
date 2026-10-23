import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CATEGORIES, LOCATIONS } from "../../data/constants";

export default function JobSearchBar({ initialQuery = "", compact = false }) {
  const navigate = useNavigate();
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    navigate(`/jobs${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form onSubmit={onSubmit} className={`surface-panel relative overflow-hidden p-4 sm:p-5 ${compact ? "" : "lg:grid lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-center lg:gap-3"}`}>
      <label className={`${compact ? "" : "lg:col-span-1"}`}>
        <span className="sr-only">Job title, category, or location</span>
        <div className="relative">
          <HiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
          <input
            className="field-input pl-11"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search job title, ID, or keyword"
          />
        </div>
      </label>
      {compact ? null : (
        <>
          <label>
            <span className="sr-only">Category</span>
            <select className="field-select" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">All categories</option>
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Location</span>
            <select className="field-select" value={location} onChange={(event) => setLocation(event.target.value)}>
              <option value="">All locations</option>
              {LOCATIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      <button type="submit" className="btn-primary w-full lg:w-auto">
        Search jobs
      </button>
      <span className="skew-decor -right-12 -top-8 h-24 w-24 opacity-40" aria-hidden="true" />
    </form>
  );
}
