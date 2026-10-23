export default function SectionHeading({ as, eyebrow, title, description, align = "left", action }) {
  const Heading = as || "h2";
  const centered = align === "center";
  const headingSize =
    as === "h1"
      ? "text-balance text-3xl sm:text-4xl lg:text-[2.9rem]"
      : "text-balance text-2xl sm:text-3xl lg:text-[2.35rem]";

  return (
    <div
      className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${
        centered ? "items-center text-center" : ""
      }`}
    >
      <div className={`max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {eyebrow ? (
          <p className={`eyebrow mb-3 ${centered ? "justify-center" : ""}`}>{eyebrow}</p>
        ) : null}
        <Heading className={headingSize}>{title}</Heading>
        {description ? <p className="mt-3 max-w-xl text-muted sm:text-[1.02rem]">{description}</p> : null}
      </div>
      {action ? <div className="flex-shrink-0">{action}</div> : null}
    </div>
  );
}
