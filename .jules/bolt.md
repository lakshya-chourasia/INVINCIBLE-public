## 2025-03-05 - Prevent Synchronous Layout Thrashing in MouseMove Event
**Learning:** Calling `document.elementFromPoint` inside a `requestAnimationFrame` loop that also updates styles forces synchronous layout recalculation, causing severe layout thrashing.
**Action:** When tracking the target element from mouse events to check for interactivity (like in a custom cursor), capture `e.target` directly from the event payload and cache it in the outer scope, rather than using `document.elementFromPoint(mouseX, mouseY)` inside the RAF loop.
