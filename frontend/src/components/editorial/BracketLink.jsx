import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

/**
 * BracketLink — the recurring [ LABEL ] navigation affordance. Brackets animate
 * on hover and the optional arrow nudges forward.
 */
export default function BracketLink({
  to,
  href,
  children,
  arrow = false,
  className = "",
  onClick,
  ...rest
}) {
  const content = (
    <>
      <span aria-hidden="true" className="ed-bracket">
        [
      </span>
      <span>{children}</span>
      <span aria-hidden="true" className="ed-bracket">
        ]
      </span>
      {arrow ? <HiArrowRight aria-hidden="true" /> : null}
    </>
  );

  const classes = `ed-link ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
