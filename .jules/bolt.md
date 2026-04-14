## 2024-05-24 - [Remove Synchronous Layout Thrashing in Mousemove Event]
**Learning:** Calling `document.elementFromPoint` within a high-frequency event like `mousemove` (especially when throttled by `requestAnimationFrame`) forces a synchronous layout recalculation, leading to layout thrashing and performance degradation.
**Action:** Always prefer capturing `e.target` from the original event rather than querying the DOM for the interactive element, passing it via outer-scope closure to avoid stale states in the animation callback.
