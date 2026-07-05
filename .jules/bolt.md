## 2024-05-20 - Canvas rendering loop optimization
**Learning:** In high-frequency Canvas rendering loops, evaluating probabilistic checks (e.g., Math.random() < chance) for every cell iteratively is a significant bottleneck.
**Action:** Pre-calculate the total number of updates needed (Math.floor(totalCells * chance)) and directly update randomly selected indices to significantly reduce execution time.
