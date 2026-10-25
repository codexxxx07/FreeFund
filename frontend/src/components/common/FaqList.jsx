import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  const panelId = `${item.id}-panel`;

  return (
    <div className={`faq-item${open ? " is-open" : ""}`}>
      <button
        type="button"
        id={item.id}
        aria-expanded={open}
        aria-controls={panelId}
        className="faq-trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{item.question}</span>
        <span className="faq-chevron-tile" aria-hidden="true">
          <HiChevronDown className={`faq-chevron${open ? " faq-chevron-open" : ""}`} size={18} />
        </span>
      </button>

      <div id={panelId} role="region" aria-labelledby={item.id} className={`faq-panel${open ? " is-open" : ""}`}>
        <div className="faq-panel-inner">
          <div className="faq-answer">{item.answer}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Shared FAQ accordion.
 * items: [{ id, question, answer }] — answer may be a string or a node.
 * The row styles live in styles/index.css (.faq-*).
 */
export default function FaqList({ items, className = "" }) {
  return (
    <div className={`faq-list ${className}`}>
      {items.map((item) => (
        <FaqItem key={item.id} item={item} />
      ))}
    </div>
  );
}
