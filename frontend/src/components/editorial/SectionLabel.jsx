import Asterisk from "./Asterisk";

/**
 * SectionLabel — the small uppercase marker that opens every section, with a
 * hairline rule and optional right-hand slot.
 */
export default function SectionLabel({ children, aside, lime = true }) {
  return (
    <div className="ed-sechead">
      <span className={`ed-label${lime ? " ed-label--lime" : ""}`}>
        <Asterisk size={14} />
        {children}
      </span>
      {aside ? <span className="ed-label">{aside}</span> : null}
    </div>
  );
}
