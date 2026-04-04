## 2025-01-20 - Avoid Layout Thrashing in `mousemove` Handlers
**Learning:** Using `document.elementFromPoint` inside a high-frequency `requestAnimationFrame` loop (like within a `mousemove` handler) forces the browser to perform synchronous layout recalculations, drastically impacting performance and causing layout thrashing.
**Action:** Always prefer capturing the element directly via `e.target` in the initial event and caching it in an outer scope variable for the `requestAnimationFrame` callback to evaluate.
