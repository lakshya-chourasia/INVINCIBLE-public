## 2024-05-18 - [Optimize Layout Thrashing on MouseMove]
**Learning:** Using `document.elementFromPoint` within high-frequency events (like `mousemove`) inside `requestAnimationFrame` forces synchronous layout recalculations (layout thrashing).
**Action:** Always prefer caching `e.target` from the original event to identify interactive elements, declaring the cache variable outside the event handler to prevent stale closures.
