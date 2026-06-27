## 2024-06-27 - Optimizing Probabilistic Checks in High-Frequency Canvas Render Loops
**Learning:** In high-frequency rendering loops (like Canvas animations running at 30fps+), evaluating probabilistic checks like `Math.random() < chance` iteratively for every single pixel/cell creates an immense performance bottleneck.
**Action:** Instead of per-cell evaluation, always pre-calculate the absolute number of required updates (`Math.floor(totalCells * chance)`) and directly update randomly selected indices. This eliminates redundant mathematical operations for untouched elements.
