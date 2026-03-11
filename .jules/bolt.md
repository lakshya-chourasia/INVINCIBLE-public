## 2024-03-11 - [Optimize Mouse Interaction Targeting]
**Learning:** Using `document.elementFromPoint()` within high-frequency events like `mousemove` causes layout thrashing because it forces the browser to recalculate layout/styles to find the element at a specific coordinate.
**Action:** Always prefer using `event.target` over `document.elementFromPoint()` in mouse event listeners, especially those tied to `requestAnimationFrame`, to avoid performance bottlenecks.
