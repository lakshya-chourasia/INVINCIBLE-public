## 2024-03-06 - Avoid elementFromPoint in high-frequency event handlers
**Learning:** `document.elementFromPoint` forces a synchronous layout calculation and hit-test. Running this inside a `requestAnimationFrame` loop driven by `mousemove` (e.g., in `GlobalInteraction.tsx`) causes unnecessary CPU overhead and can lead to layout thrashing.
**Action:** Use `event.target` from the `MouseEvent` directly instead of querying the DOM by coordinates. Ensure that the target is captured in the outer scope of the event listener to avoid stale closures if using `requestAnimationFrame` for throttling.
