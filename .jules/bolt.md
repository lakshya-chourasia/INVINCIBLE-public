## 2024-05-24 - Layout Thrashing with document.elementFromPoint
**Learning:** Calling `document.elementFromPoint` immediately after modifying styles (e.g., via `style.setProperty`) within a `requestAnimationFrame` loop forces synchronous layout/style recalculations (layout thrashing) because the style tree was invalidated.
**Action:** Use `e.target` from the original event instead of `elementFromPoint` to identify interactive elements, and cache it in the outer scope to avoid stale closures.
