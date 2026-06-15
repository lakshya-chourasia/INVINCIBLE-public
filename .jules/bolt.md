## 2025-06-15 - Decoupled Rendering from Random Checking
**Learning:** Performing a probabilistic check (`Math.random() < chance`) inside a high-frequency rendering loop for a large grid creates a CPU bottleneck.
**Action:** Decouple update logic by precalculating the exact number of updates required (`numUpdates = Math.floor(totalCells * chance)`) and directly selecting random indices to update, reducing O(N) calls to the random number generator.
