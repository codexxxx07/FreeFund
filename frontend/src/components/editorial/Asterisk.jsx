/**
 * Asterisk — the brand mark. Eight tapered rays in a 24×24 box, drawn with
 * currentColor so it inherits lime or ink depending on its surface.
 */
export default function Asterisk({ size = 20, className = "", title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        <path d="M12 2.5v19" />
        <path d="M3.77 7.25l16.46 9.5" />
        <path d="M3.77 16.75l16.46-9.5" />
        <path d="M6.6 4.2l10.8 15.6" />
        <path d="M17.4 4.2L6.6 19.8" />
      </g>
    </svg>
  );
}
