## 2025-04-26 - Layout Thrashing with `document.elementFromPoint` in requestAnimationFrame
**Learning:** Using `document.elementFromPoint` inside `requestAnimationFrame` for high-frequency events (like `mousemove`) forces synchronous layout recalculations (layout thrashing).
**Action:** Always capture `e.target` directly from the event handler in a closure variable (e.g., `let currentTarget`), and reference that variable within the deferred `requestAnimationFrame` callback.
