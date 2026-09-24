import { useEffect, useRef } from "react";

export function useOverlay({ active, onClose, containerRef }) {
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    lastFocus.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // captureKeys false still used for nested overlays via active flag

    const node = containerRef?.current;
    const focusables = () =>
      node
        ? [
            ...node.querySelectorAll(
              'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            ),
          ]
        : [];

    const first = focusables()[0];
    first?.focus();

    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const items = focusables();
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      lastFocus.current?.focus?.();
    };
  }, [active, onClose, containerRef]);
}
