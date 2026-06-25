## 2024-05-24 - Canvas Rendering Performance Optimization
**Learning:** In high-frequency Canvas rendering loops, iterating over thousands of cells to evaluate a probabilistic check (`Math.random() < chance`) is highly inefficient and creates a performance bottleneck.
**Action:** Pre-calculate the total number of updates needed based on probability (`totalCells * chance`) and randomly update indices. This significantly reduces `Math.random()` calls and execution time per frame.
