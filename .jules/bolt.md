## 2024-05-04 - [Avoid Layout Thrashing in React requestAnimationFrame Throttling]
**Learning:** Using `document.elementFromPoint(mouseX, mouseY)` within a throttled `requestAnimationFrame` loop forced synchronous layout recalculations every frame during mouse movement, causing severe layout thrashing.
**Action:** When throttling high-frequency events (like `mousemove`), cache the `e.target` directly from the original event into an outer scope variable and consume the cached target within the `requestAnimationFrame` callback instead of recalculating the layout.
