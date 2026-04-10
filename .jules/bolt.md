## 2024-05-15 - Remove synchronous layout recalculation in mousemove
**Learning:** Using `document.elementFromPoint` in high-frequency events (like `mousemove` inside `requestAnimationFrame`) forces synchronous layout recalculations and degrades performance severely.
**Action:** Instead, rely on the original event's `e.target`. To make this work seamlessly with global visual overlays, apply CSS `pointer-events: none` to those overlays so that the interactive elements beneath correctly register as `e.target`.
