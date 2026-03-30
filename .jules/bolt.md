## 2024-05-14 - Prevent Layout Thrashing in High-Frequency Events
**Learning:** Calling `document.elementFromPoint` within high-frequency events (like `mousemove` inside `requestAnimationFrame`) forces synchronous layout recalculations and causes severe layout thrashing.
**Action:** Always prefer using `e.target` from the original event to identify interactive elements. To prevent stale closure bugs inside the `requestAnimationFrame` callback, explicitly declare the target variable in the outer `useEffect` scope and update it inside the event listener alongside mouse coordinates.
