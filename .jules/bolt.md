## 2024-03-20 - Avoid Layout Thrashing in requestAnimationFrame
**Learning:** Using `document.elementFromPoint` inside high-frequency events (like `mousemove`) wrapped in `requestAnimationFrame` forces synchronous layout recalculations, causing layout thrashing.
**Action:** When throttling events with `requestAnimationFrame`, cache `e.target` from the original event handler in an outer scope variable instead of recalculating the target asynchronously.
