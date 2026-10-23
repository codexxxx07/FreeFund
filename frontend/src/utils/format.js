export function formatDate(iso) {
  if (!iso) return "Not specified";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function statusLabel(status) {
  if (status === "open") return "Open";
  if (status === "paused") return "Paused";
  if (status === "closed") return "Closed";
  return status;
}
