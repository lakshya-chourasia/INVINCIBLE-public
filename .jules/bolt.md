## 2024-04-08 - Prevent layout thrashing in mouse events
**Learning:** Using `document.elementFromPoint` inside high-frequency events (like `mousemove` via `requestAnimationFrame`) forces synchronous layout recalculations, causing significant performance bottlenecks.
**Action:** Instead of querying the DOM by coordinates, cache the native event target (`e.target`) from the outer event listener and pass it to the animation frame to completely eliminate layout thrashing.
