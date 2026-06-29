## 2024-05-18 - Canvas High-Frequency Loop Optimization
**Learning:** In high-frequency Canvas rendering loops, evaluating probabilistic checks (e.g., `Math.random() < chance`) for every cell iteratively is a major performance bottleneck.
**Action:** Pre-calculate the total number of updates needed (`Math.floor(totalCells * chance)`) and directly update randomly selected indices to significantly reduce execution time.
