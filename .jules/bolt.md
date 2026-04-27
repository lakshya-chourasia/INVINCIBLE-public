## 2024-05-24 - Layout Thrashing with document.elementFromPoint in High-Frequency Events
**Learning:** Using `document.elementFromPoint` within high-frequency RAF-throttled events (like `mousemove`) forces synchronous layout recalculations and causes severe CPU overhead/layout thrashing.
**Action:** Always cache the `e.target` directly from the original event rather than recalculating the DOM position from coordinates. Ensure to declare the cache variable in the outer closure alongside coordinate caches to avoid stale closures with requestAnimationFrame.
