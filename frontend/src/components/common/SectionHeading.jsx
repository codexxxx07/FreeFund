export default function SectionHeading({ eyebrow, title, description, align = "left", action }) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${alignment ? "items-center" : ""}`}>
      <div className={`max-w-2xl ${alignment}`}>
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
        ) : null}
        <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl">{title}</h2>
        {description ? <p className="mt-3 max-w-xl text-ink-muted">{description}</p> : null}
      </div>
      {action ? <div className="flex-shrink-0">{action}</div> : null}
    </div>
  );
}
