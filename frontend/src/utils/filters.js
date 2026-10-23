export function matchesFilters(job, filters) {
  const query = (filters.q || "").trim().toLowerCase();
  if (query) {
    const haystack = [job.title, job.company, job.id, job.location, job.category, job.city]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (filters.location && job.city !== filters.location) return false;
  if (filters.category && job.category !== filters.category) return false;
  if (filters.workMode && job.workMode !== filters.workMode) return false;
  if (filters.experience && job.experienceLevel !== filters.experience) return false;

  return true;
}

export function readFiltersFromSearch(searchParams) {
  return {
    q: searchParams.get("q") || "",
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    workMode: searchParams.get("workMode") || "",
    experience: searchParams.get("experience") || "",
  };
}

export function filtersToSearch(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return params;
}

export function hasActiveFilters(filters) {
  return Object.values(filters).some(Boolean);
}
