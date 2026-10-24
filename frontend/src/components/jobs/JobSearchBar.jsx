import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CATEGORIES, LOCATIONS } from "../../data/constants";
import SelectDropdown from "../common/SelectDropdown";

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
    <form
      onSubmit={onSubmit}
      className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}
      role="search"
      aria-label="Search jobs"
    >
      <label className={compact ? "" : "sm:col-span-2"}>
        <span className="sr-only">Job title, ID, or keyword</span>
        <div className="relative">
          <HiMagnifyingGlass
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            className="field-input pl-10"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Job title, ID, or keyword"
          />
        </div>
      </label>
      {compact ? null : (
        <>
          <SelectDropdown
            label="Category"
            labelHidden
            value={category}
            onChange={setCategory}
            options={CATEGORIES}
            placeholder="All categories"
          />
          <SelectDropdown
            label="Location"
            labelHidden
            value={location}
            onChange={setLocation}
            options={LOCATIONS}
            placeholder="All locations"
          />
        </>
      )}
      <button type="submit" className={`btn-primary w-full ${compact ? "" : "sm:col-span-2"}`}>
        <HiMagnifyingGlass aria-hidden="true" />
        Search jobs
      </button>
    </form>
  );
}
