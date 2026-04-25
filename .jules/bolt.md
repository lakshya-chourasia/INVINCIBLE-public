## 2024-05-24 - Layout Thrashing in requestAnimationFrame
**Learning:** Calling `document.elementFromPoint` within a `requestAnimationFrame` loop during high-frequency events (like `mousemove`) causes synchronous layout recalculations and severe layout thrashing, entirely defeating the performance benefits of using rAF.
**Action:** Always prefer using `e.target` directly from the original `MouseEvent` to identify interactive elements, caching it in the outer scope, and referencing it within the rAF callback instead of querying the DOM geometry dynamically.
