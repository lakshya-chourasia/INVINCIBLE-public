## 2023-10-24 - Pre-calculating Probabilistic Updates in Render Loops
**Learning:** In high-frequency Canvas rendering loops, evaluating probabilistic checks (e.g., `Math.random() < chance`) for every cell iteratively introduces massive overhead.
**Action:** Pre-calculate the total number of updates needed (`Math.floor(totalCells * chance)`) and directly update randomly selected indices to significantly reduce execution time and `Math.random()` calls.
