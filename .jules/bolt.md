## 2024-07-08 - Canvas Loop Optimization
**Learning:** In high-frequency Canvas rendering loops, evaluating probabilistic checks (e.g., Math.random() < chance) for every cell iteratively is a major bottleneck.
**Action:** Pre-calculate the total number of updates needed and directly update randomly selected indices to significantly reduce execution time.
