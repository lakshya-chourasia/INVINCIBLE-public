## 2024-04-12 - Eliminate React Re-renders in High-Frequency Mouse Events
**Learning:** Using `useState` to track coordinates (`pos`, `op`) for visual effects (like the gradient spotlight in `SpotlightCard.tsx`) during high-frequency events (`mousemove`) forces continuous React re-renders, impacting performance.
**Action:** Use `useRef` to target the DOM element directly and update custom CSS variables via `element.style.setProperty` instead of triggering React state updates for transient visual states.
