## 2024-05-24 - Pre-calculating Probabilistic Updates in Canvas Loops
**Learning:** In high-frequency Canvas rendering loops, evaluating probabilistic checks (like `Math.random() < chance`) for every cell iteratively creates a significant bottleneck due to the sheer volume of operations.
**Action:** Always pre-calculate the total number of expected updates (`Math.floor(totalCells * chance)`) and directly update randomly selected indices to vastly reduce the iteration overhead.
