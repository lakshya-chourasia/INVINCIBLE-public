## 2024-03-28 - Removed document.elementFromPoint in mousemove RAF

**Learning:** Calling `document.elementFromPoint` within high-frequency events (like `mousemove` inside `requestAnimationFrame`) forces synchronous layout recalculations and causes layout thrashing, severely degrading performance. Global overlays like `.noise-overlay` utilizing `pointer-events: none` ensure that `e.target` captures the actual underlying interactive elements perfectly without needing coordinates-based hit testing.

**Action:** Always prefer capturing `e.target` directly from the event object to identify interactive elements during mouse events instead of computing intersections programmatically. When using RAF to throttle events, declare `target` in the outer `useEffect` scope to avoid stale closures.
