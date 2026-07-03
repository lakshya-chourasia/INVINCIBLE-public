## 2024-05-15 - Optimize High-Frequency Canvas Rendering Loops
**Learning:** In high-frequency Canvas rendering loops, evaluating probabilistic checks like `Math.random() < chance` iteratively across large grids (e.g. 14,000+ cells) is extremely expensive and causes frame drops.
**Action:** Pre-calculate the absolute number of needed updates based on the grid size and probability (e.g. `Math.floor(totalCells * chance)`), then directly update randomly selected indices to bypass iterating all cells for random checks.
