## 2023-10-27 - [Prevent Layout Thrashing in MouseMove]
**Learning:** Calling `document.elementFromPoint` within high-frequency events (like `mousemove` inside `requestAnimationFrame`) forces synchronous layout recalculations and causes severe layout thrashing.
**Action:** Always prefer using `e.target` from the original event, capturing it outside the RAF callback and evaluating it inside, to identify interactive elements efficiently without forcing reflows.
