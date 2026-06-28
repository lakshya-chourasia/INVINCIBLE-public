## 2024-07-02 - O(N) Iteration in Canvas Render Loops
**Learning:** In high-frequency Canvas rendering loops, evaluating probabilistic checks (`Math.random() < chance`) for every cell iteratively causes massive CPU overhead and frame drops.
**Action:** Always pre-calculate the total number of updates needed (`Math.floor(totalCells * chance)`) and directly update randomly selected indices.
