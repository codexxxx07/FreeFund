import { Link } from "react-router-dom";

/**
 * Editorial button. Renders a router link, an anchor, or a button depending on
 * the props, with one shared class contract.
 *
 * variants: "lime" | "outline" | "ink"
 */
export default function Button({
  children,
  to,
  href,
  variant = "outline",
  size = "md",
  block = false,
  className = "",
  ...rest
}) {
  const classes = [
    "ed-btn",
    variant === "lime" ? "ed-btn--lime" : "",
    variant === "ink" ? "ed-btn--ink" : "",
    size === "lg" ? "ed-btn--lg" : "",
    block ? "ed-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
