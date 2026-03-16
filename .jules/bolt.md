## 2024-05-19 - StaggeredMenu resize performance optimization
**Learning:** React state updates on every `mousemove` event during dragging/resizing cause entire component tree re-renders, creating significant performance bottlenecks, especially in components with many child elements like `StaggeredMenu`.
**Action:** Instead of `useState`, use `useRef` to store changing coordinates/dimensions and `requestAnimationFrame` to throttle updates while applying style changes directly to the DOM using `element.style.setProperty`. This bypasses React's render cycle for high-frequency updates.
