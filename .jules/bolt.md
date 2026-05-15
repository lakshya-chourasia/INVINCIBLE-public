## 2024-05-15 - Decoupling Random Updates in High-Frequency Grids
**Learning:** Performing probabilistic checks (`Math.random() < chance`) inside a high-frequency grid rendering loop (e.g., 14,000+ cells) is a major CPU bottleneck.
**Action:** Pre-calculate the exact number of updates required (`numUpdates = Math.floor(totalCells * chance)`) and randomly select indices to update, effectively reducing the O(N) random generator calls to a fraction.
