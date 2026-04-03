## 2025-04-03 - Avoid Synchronous Layout Thrashing in requestAnimationFrame

**Learning:** Using `document.elementFromPoint` inside high-frequency event handlers like `requestAnimationFrame` (such as tracking a mouse cursor) forces synchronous layout recalculations, causing significant performance degradation and layout thrashing. This is especially true if the DOM changes dynamically.

**Action:** Prefer capturing the event target from the original event (`e.target`) and storing it in a variable accessible by the `requestAnimationFrame` callback. Ensure the variable is declared in the outer scope of the listener (e.g., inside the `useEffect` alongside coordinate tracking) to prevent stale closure traps.