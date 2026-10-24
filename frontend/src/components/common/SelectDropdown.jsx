import { useCallback, useEffect, useId, useRef, useState } from "react";
import { HiCheck, HiChevronDown } from "react-icons/hi2";

// Must match the .select-menu.is-closing animation duration in styles/index.css
// so the element unmounts exactly when the exit animation finishes.
const CLOSE_MS = 150;

function normalize(option) {
  return typeof option === "string" ? { value: option, label: option } : option;
}

/**
 * Accessible listbox-style dropdown that mirrors a native <select> API:
 * value / onChange(options) / placeholder / disabled, plus an optional
 * onBlur fired when the menu closes (after having been open).
 *
 * The menu stays mounted through a short closing phase so the exit
 * animation always completes, and rapid open/close toggling is handled
 * by cancelling the pending unmount timer.
 */
export default function SelectDropdown({
  id,
  label,
  labelHidden = false,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  invalid = false,
  ariaDescribedBy,
  onBlur,
  className = "",
}) {
  // The placeholder doubles as the "empty" option (value "") exactly like a
  // native <select>'s first option, so filters can be cleared and optional
  // fields reset from inside the menu.
  const items = [{ value: "", label: placeholder }, ...options.map(normalize)];
  const baseId = useId();
  const menuId = `${baseId}-listbox`;
  const labelId = `${baseId}-label`;

  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const closeTimerRef = useRef(null);
  const blurRef = useRef(onBlur);
  blurRef.current = onBlur;

  const [phase, setPhase] = useState("closed"); // "closed" | "opening" | "open" | "closing"
  const [activeIndex, setActiveIndex] = useState(-1);

  const isOpen = phase !== "closed";
  const isClosing = phase === "closing";
  const selectedIndex = items.findIndex((item) => item.value === value);
  const selected = selectedIndex >= 0 ? items[selectedIndex] : null;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  function openMenu(startIndex) {
    clearCloseTimer();
    setActiveIndex(startIndex);
    setPhase("opening");
  }

  const closeMenu = useCallback(
    ({ restoreFocus = false } = {}) => {
      clearCloseTimer();
      setPhase((current) => (current === "closed" ? current : "closing"));
      closeTimerRef.current = window.setTimeout(() => {
        closeTimerRef.current = null;
        setPhase("closed");
        setActiveIndex(-1);
        blurRef.current?.();
      }, CLOSE_MS);
      if (restoreFocus) triggerRef.current?.focus();
    },
    [clearCloseTimer],
  );

  function selectOption(index) {
    const item = items[index];
    if (!item) return;
    onChange(item.value);
    closeMenu({ restoreFocus: true });
  }

  function moveActive(step) {
    setActiveIndex((current) => {
      if (items.length === 0) return -1;
      const next = current < 0 ? 0 : (current + step + items.length) % items.length;
      return next;
    });
  }

  // Swap the mount animation for the completed-state fill once painted.
  useEffect(() => {
    if (phase !== "opening") return undefined;
    const frame = window.requestAnimationFrame(() => setPhase("open"));
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  // Keep DOM focus on the active option while navigating (roving focus).
  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    const node = optionRefs.current[activeIndex];
    node?.focus({ preventScroll: true });
    node?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  // Close when clicking or tapping outside the dropdown.
  useEffect(() => {
    if (!isOpen) return undefined;
    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) closeMenu();
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen, closeMenu]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  function onTriggerKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu(selectedIndex >= 0 ? selectedIndex : 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(selectedIndex >= 0 ? selectedIndex : items.length - 1);
    } else if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeMenu();
    }
  }

  function onMenuKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveActive(-1);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectOption(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        break;
      case "Tab":
        closeMenu();
        break;
      default:
        break;
    }
  }

  return (
    <div ref={rootRef} className={`select-root${className ? ` ${className}` : ""}`}>
      {label ? (
        <span id={labelId} className={labelHidden ? "sr-only" : "field-label"}>
          {label}
        </span>
      ) : null}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className="field-select select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        onClick={() =>
          isOpen && !isClosing
            ? closeMenu()
            : openMenu(selectedIndex >= 0 ? selectedIndex : 0)
        }
        onKeyDown={onTriggerKeyDown}
      >
        <span className="select-value">{selected ? selected.label : placeholder}</span>
        <HiChevronDown className="select-chevron" aria-hidden="true" />
      </button>
      {isOpen ? (
        <ul
          id={menuId}
          role="listbox"
          className={`select-menu${isClosing ? " is-closing" : ""}`}
          aria-labelledby={label ? labelId : undefined}
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item, index) => {
            const isSelected = item.value === value;
            return (
              <li
                key={item.value}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                className={`select-option${isSelected ? " is-selected" : ""}${
                  index === activeIndex ? " is-active" : ""
                }`}
                onClick={() => selectOption(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="select-option-label" title={item.label}>
                  {item.label}
                </span>
                {isSelected ? <HiCheck className="select-option-check" aria-hidden="true" /> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
