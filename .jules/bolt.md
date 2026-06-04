## 2025-03-05 - Optimize random updates in rendering loop
**Learning:** Performing a probabilistic check inside a high-frequency rendering loop for a large grid is a significant CPU bottleneck. Optimization is achieved by decoupling the update logic: pre-calculating the exact number of updates required (numUpdates = Math.floor(totalCells * chance)) and directly selecting random indices to update, thereby reducing O(N) calls to the random number generator.
**Action:** Decouple update logic to reduce Math.random() calls from O(N) to O(updateChance * N).
