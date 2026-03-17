## 2024-05-18 - High-Frequency Event State Thrashing
**Learning:** Using React state (`useState`) to track high-frequency events like `mousemove` causes excessive re-renders and severe layout thrashing. This is especially problematic during drag-to-resize operations in React components.
**Action:** Always prefer updating DOM styles directly via `useRef` + `requestAnimationFrame` for continuous tracking. By decoupling the visual position (CSS variables on a wrapper ref) from the component lifecycle, the interaction remains smooth without trigerring the expensive React render cycle.
