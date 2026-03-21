## 2024-03-21 - Avoid document.elementFromPoint in mousemove
**Learning:** In high-frequency mouse event handlers (like mousemove throttled with requestAnimationFrame), using `document.elementFromPoint(x, y)` triggers expensive layout and hit-testing on the main thread, leading to layout thrashing and jank.
**Action:** Use the cached `event.target` from the original MouseEvent instead. This correctly targets the hovered element (since pointer-events: none is correctly applied to overlay elements like the custom cursor and noise layer) without forcing a synchronous layout recalculation.
