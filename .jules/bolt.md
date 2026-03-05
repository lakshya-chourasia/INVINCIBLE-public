## 2024-05-14 - Prevent Layout Thrashing in MouseMove Listeners
**Learning:** `document.elementFromPoint()` forces a synchronous layout recalculation when called, resulting in severe layout thrashing and performance degradation when used inside a high-frequency `mousemove` event handler or `requestAnimationFrame` loop.
**Action:** Always capture the `event.target` directly from the `MouseEvent` payload (e.g., `const target = e.target;`) rather than programmatically querying the DOM based on coordinates for interaction states.
