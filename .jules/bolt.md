## 2024-05-24 - Canvas probabilistic check optimization
**Learning:** In high-frequency Canvas rendering loops, evaluating probabilistic checks iteratively over the entire grid can be a major CPU bottleneck.
**Action:** Pre-calculate the total number of updates needed and directly update randomly selected indices to avoid redundant math operations on every cell.
