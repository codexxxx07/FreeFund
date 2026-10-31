import Counter from "./Counter";

/**
 * StatCard — one figure in a statistics strip. `value` may be a number (then
 * it animates) or a ready-made node. `note` is a short qualifier.
 */
export default function StatCard({ value, label, note, prefix, suffix, decimals = 0 }) {
  return (
    <div className="ed-stat">
      <span className="ed-stat__value">
        {typeof value === "number" ? (
          <Counter to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        ) : (
          value
        )}
      </span>
      <span className="ed-stat__label">{label}</span>
      {note ? <span className="ed-stat__note">{note}</span> : null}
    </div>
  );
}
