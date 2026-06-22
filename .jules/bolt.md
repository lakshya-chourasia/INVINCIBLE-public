## 2024-06-22 - [Optimizing Canvas Probabilistic Updates]
**Learning:** Evaluating `Math.random() < chance` iteratively across large grids (e.g., 14,400 cells) per frame in a canvas loop significantly impacts the main thread.
**Action:** Pre-calculate `totalUpdates = Math.floor(totalCells * chance)` and directly access randomly selected grid indices to bypass full-grid probabilistic checks.