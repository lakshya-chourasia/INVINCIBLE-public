## 2024-05-17 - Avoid document.elementFromPoint in requestAnimationFrame
**Learning:** Calling `document.elementFromPoint` inside a high-frequency `requestAnimationFrame` loop forces the browser to perform synchronous layout recalculations, causing a significant performance bottleneck and potential jank during mouse movement.
**Action:** Always prefer capturing the element directly from the original event (`e.target`) and storing it in a variable within the closure, rather than recalculating it later inside the animation frame callback.
