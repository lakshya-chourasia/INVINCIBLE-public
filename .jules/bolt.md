## 2024-07-04 - Canvas High Frequency Rendering Optimization
**Learning:** In React components with high-frequency Canvas rendering loops (like `LetterGlitch.tsx`), evaluating probabilistic checks (e.g., `Math.random() < chance`) for every cell on every frame is highly inefficient and creates a bottleneck.
**Action:** Pre-calculate the total number of updates needed per frame (`Math.floor(totalCells * updateChance)`) and directly update randomly selected indices to significantly reduce execution time.
