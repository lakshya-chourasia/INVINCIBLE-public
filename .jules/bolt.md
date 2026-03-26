## 2024-05-18 - Avoiding document.elementFromPoint in High-Frequency Events
**Learning:** Calling `document.elementFromPoint` within high-frequency events (like `mousemove` inside `requestAnimationFrame`) forces synchronous layout recalculations and causes layout thrashing, severely degrading framerate.
**Action:** Always prefer using `e.target` from the original event to identify interactive elements, passing it to the animation frame via a closure variable to avoid re-querying the DOM and prevent layout thrashing.
