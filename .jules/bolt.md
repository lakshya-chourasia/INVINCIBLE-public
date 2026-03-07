## 2024-05-15 - [Layout Thrashing on MouseMove]
**Learning:** Using `document.elementFromPoint` inside high-frequency event listeners (like `mousemove` via `requestAnimationFrame`) forces synchronous layout recalculations, leading to severe layout thrashing and dropped frames.
**Action:** Always prefer using the `e.target` provided by the original event payload and cache it in the outer closure for processing inside `requestAnimationFrame`.
