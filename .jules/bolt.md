## 2024-05-24 - Layout Thrashing with document.elementFromPoint
**Learning:** Calling `document.elementFromPoint` within high-frequency events (like `mousemove` inside `requestAnimationFrame`) forces synchronous layout recalculations, causing layout thrashing and performance degradation.
**Action:** Always prefer using `e.target` from the original event to identify interactive elements under the cursor, combined with `pointer-events: none` on global overlays to ensure accurate event targeting.
