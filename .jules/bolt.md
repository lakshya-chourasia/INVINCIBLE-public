## 2025-03-05 - Avoid elementFromPoint in RequestAnimationFrame Loops
**Learning:** Calling `document.elementFromPoint` forces synchronous layout recalculations, causing significant layout thrashing when executed continuously inside a high-frequency event loop like `requestAnimationFrame` for a custom mouse cursor.
**Action:** Instead of relying on `elementFromPoint(mouseX, mouseY)` every frame, capture `e.target` directly in the underlying `mousemove` event and reference it asynchronously within the `requestAnimationFrame` callback.
