## 2025-05-24 - Layout Thrashing in GlobalInteraction
**Learning:** `document.elementFromPoint(x, y)` inside a `mousemove` handler forces a synchronous layout calculation (reflow) on every frame, causing significant performance degradation.
**Action:** Replace with `event.target` when possible, or batch/debounce DOM reads. Also, update CSS variables on specific elements (via `ref`) rather than `document.documentElement` to avoid global style invalidation.
