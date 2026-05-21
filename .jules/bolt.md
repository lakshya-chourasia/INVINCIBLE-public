## 2025-05-21 - [Optimizing Probabilistic Updates in High-Frequency Loops]
**Learning:** Performing `Math.random() < updateChance` checks inside a nested loop spanning thousands of cells every frame (even if throttled to 30fps) is a significant CPU bottleneck. Decoupling the update logic from the drawing logic reduces unnecessary RNG calls.
**Action:** Pre-calculate `numUpdates = Math.floor(totalCells * chance)` and directly select random indices to update, bypassing O(N) calls to the random number generator.
