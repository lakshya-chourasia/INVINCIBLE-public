## 2024-05-23 - Pre-calculating Updates in Canvas Loops
**Learning:** Evaluating probabilistic checks (`Math.random() < chance`) for every cell in a high-frequency Canvas rendering loop causes unnecessary overhead.
**Action:** Pre-calculate the total number of updates needed (`Math.floor(totalCells * chance)`) and directly update randomly selected indices to significantly reduce execution time.
