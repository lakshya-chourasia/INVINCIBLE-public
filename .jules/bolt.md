## 2024-07-02 - Optimize Canvas Probabilistic Rendering Check
**Learning:** In high-frequency Canvas rendering loops, iterating over every single cell with a probabilistic check (`Math.random() < chance`) is very slow (O(N)), especially for dense grids like `LetterGlitch`.
**Action:** Instead, pre-calculate the total number of updates needed (`Math.floor(totalCells * chance)`) and directly update randomly selected indices to significantly reduce execution time (O(K)). This avoids evaluating the random chance for every cell iteratively.
