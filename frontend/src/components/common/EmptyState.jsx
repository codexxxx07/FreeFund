import { HiMagnifyingGlass } from "react-icons/hi2";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="surface-panel relative overflow-hidden px-6 py-12 text-center sm:px-10">
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bg-muted text-accent">
          <HiMagnifyingGlass aria-hidden="true" size={22} />
        </span>
        <h2 className="mt-5 text-xl sm:text-2xl">{title}</h2>
        <p className="mt-2 text-ink-muted">{description}</p>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
      <span className="skew-decor -bottom-10 -left-12 h-24 w-24 opacity-40" aria-hidden="true" />
    </div>
  );
}
