import { useId, useState } from "react";

/**
 * Accordion — one open panel at a time. Items: [{ id, title, content }].
 * `indexLabel` renders a two-digit counter in the trigger.
 */
export default function Accordion({ items, initial = 0, className = "" }) {
  const [openId, setOpenId] = useState(items[initial]?.id ?? null);
  const baseId = useId();

  return (
    <div className={`tr-accordion ${className}`.trim()}>
      {items.map((item, index) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div className={`tr-acc${open ? " is-open" : ""}`} key={item.id}>
            <button
              type="button"
              className="tr-acc__trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="tr-acc__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="tr-acc__title">{item.title}</span>
              <span className="tr-acc__plus" aria-hidden="true">
                +
              </span>
            </button>
            <div className="tr-acc__panel" id={panelId} role="region">
              <div className="tr-acc__inner">
                <div className="tr-acc__content">{open ? item.content : null}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
