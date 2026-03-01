## 2024-05-24 - [Avoid synchronous layout in high-frequency mouse events]
**Learning:** `document.elementFromPoint(mouseX, mouseY)` was being called inside `requestAnimationFrame` on every mouse move in `GlobalInteraction.tsx`. This causes synchronous layout thrashing/recalculation, which is a massive performance bottleneck for an interaction component meant to run smoothly at 60fps.
**Action:** Use `e.target` directly from the `MouseEvent` when tracking mouse position instead of calling `elementFromPoint`.
## 2024-05-24 - [Scope of CSS variables]
**Learning:** Attempting to restrict global CSS variables like `--x` and `--y` to specific local refs (e.g. `glowRef`) inside shared interaction components like `GlobalInteraction.tsx` is an anti-pattern when those variables are relied upon globally by other components in the application.
**Action:** Avoid localizing CSS variables that define global states unless thoroughly verifying all downstream usages across the repository.
