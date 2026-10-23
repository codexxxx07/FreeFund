import { HiMagnifyingGlass } from "react-icons/hi2";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="surface-panel px-6 py-14 text-center sm:px-10">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <span className="icon-tile icon-tile-lg">
          <HiMagnifyingGlass aria-hidden="true" size={22} />
        </span>
        <h2 className="mt-5 text-xl sm:text-2xl">{title}</h2>
        <p className="mt-2 text-muted">{description}</p>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </div>
  );
}
