## 2024-05-15 - Layout Thrashing in requestAnimationFrame
**Learning:** Using `document.elementFromPoint()` inside `requestAnimationFrame` immediately after setting custom CSS properties (e.g. `style.setProperty`) forces a synchronous layout recalculation (layout thrashing), causing severe performance degradation during high-frequency events like `mousemove`.
**Action:** Cache the event target from the original event object (e.g. `e.target`) into an outer-scope variable and use that cached value inside the RAF callback instead of recalculating the element from coordinates.
