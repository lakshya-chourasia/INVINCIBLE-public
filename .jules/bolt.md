## 2024-07-06 - Pre-calculated Probabilistic Checks in Canvas Loops
**Learning:** In high-frequency Canvas rendering loops, evaluating `Math.random() < chance` iteratively for every single cell consumes unnecessary CPU cycles for thousands of cells per frame, creating a performance bottleneck specific to this codebase's architecture.
**Action:** Pre-calculate the total number of updates needed (`Math.floor(totalCells * chance)`) and directly update randomly selected indices instead.
