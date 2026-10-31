import Asterisk from "./Asterisk";

/**
 * Marquee — duplicated track so the loop is seamless. Items can be strings or
 * nodes. The second copy is hidden from assistive tech. Duration is set in
 * seconds; hover pauses; reduced motion switches to a scrollable strip.
 */
export default function Marquee({
  items,
  duration = 34,
  reverse = false,
  lime = false,
  className = "",
}) {
  const group = (hidden) => (
    <div className="ed-marquee__group" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span className="ed-marquee__item" key={`${index}-${typeof item === "string" ? item : "node"}`}>
          <Asterisk size={15} />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`ed-marquee${reverse ? " ed-marquee--reverse" : ""}${lime ? " ed-marquee--lime" : ""} ${className}`.trim()}
      style={{ "--marquee-duration": `${duration}s` }}
    >
      <div className="ed-marquee__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
