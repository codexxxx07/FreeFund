import { Link } from "react-router-dom";
import Asterisk from "./Asterisk";

/**
 * LimeCard — thin-outline card with a lime title bar. `to` makes the whole card
 * a link; otherwise it renders as an article.
 */
export default function LimeCard({
  to,
  index,
  label,
  title,
  meta,
  children,
  action,
  className = "",
}) {
  const Tag = to ? Link : "article";
  const props = to ? { to } : {};

  return (
    <Tag className={`ed-limecard ${className}`.trim()} {...props}>
      <div className="ed-limecard__bar">
        <span>{label || title}</span>
        {index ? <span>{index}</span> : <Asterisk size={13} />}
      </div>
      <div className="ed-limecard__body">
        {title ? <h3 className="ed-limecard__title">{title}</h3> : null}
        {meta ? <p className="hm-service__meta">{meta}</p> : null}
        {children ? <div className="hm-service__body">{children}</div> : null}
        {action ? (
          <div className="hm-service__cta">
            <span>{action}</span>
            <Asterisk size={16} />
          </div>
        ) : null}
      </div>
    </Tag>
  );
}
