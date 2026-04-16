## 2024-03-05 - Avoid layout thrashing in high-frequency mouse events
**Learning:** Using `document.elementFromPoint()` inside a `requestAnimationFrame` callback triggered by `mousemove` causes synchronous layout recalculations (layout thrashing), severely degrading scroll and interactive performance.
**Action:** Prefer using the event's original target (`e.target`) over recalculating the target position dynamically, especially within high-frequency event listeners where avoiding forced synchronous layouts is critical.
