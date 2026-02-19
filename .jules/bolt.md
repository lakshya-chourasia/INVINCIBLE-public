## 2024-05-22 - Global Style Invalidation
**Learning:** Updating CSS variables on `document.documentElement` (`:root`) invalidates styles for the entire document tree, causing expensive style recalculations on every frame if used in an animation loop.
**Action:** Scope high-frequency CSS variable updates (like mouse tracking) to specific element refs using `element.style.setProperty()`.

## 2024-05-22 - Layout Thrashing in Mouse Handlers
**Learning:** `document.elementFromPoint(x, y)` forces a synchronous layout/reflow to determine the element at the coordinates.
**Action:** Use `event.target` in `mousemove` handlers when overlay elements have `pointer-events: none`, as the browser has already calculated the target.
