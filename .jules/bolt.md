
## 2025-05-15 - Layout Thrashing with `elementFromPoint` in requestAnimationFrame
**Learning:** `document.elementFromPoint(x, y)` triggers synchronous layout/reflow calculations. Calling it inside a high-frequency loop like `requestAnimationFrame` for mouse movements causes severe main thread stuttering. Because all global overlay visual elements (`.custom-cursor`, `.noise-overlay`) correctly implement `pointer-events: none`, the native `e.target` from the mouse event natively points to the correct underlying interactive element, completely eliminating the need for manual geometry lookups.
**Action:** Always prefer `e.target` over `document.elementFromPoint` in mouse handlers when global overlays use `pointer-events: none`.
