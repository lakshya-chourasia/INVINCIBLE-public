
## 2025-02-28 - Prevent layout thrashing in GlobalInteraction mousemove
**Learning:** Using `document.elementFromPoint()` within a high-frequency `mousemove` handler (even when throttled by `requestAnimationFrame`) forces synchronous layout calculation and hit-testing on the main thread, causing significant performance overhead and layout thrashing.
**Action:** When tracking mouse positions, always capture `event.target` directly from the `MouseEvent` object and cache it in the outer scope, rather than recalculating it via `document.elementFromPoint()`.
