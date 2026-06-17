## 2024-05-24 - Decoupling Probabilistic Update Checks in Large Grids
**Learning:** Performing a probabilistic check (e.g., if (Math.random() < chance)) inside a high-frequency rendering loop for a large grid (e.g., 14,000+ cells) can be a significant CPU bottleneck.
**Action:** Decouple the update logic: pre-calculate the exact number of updates required (numUpdates = Math.floor(totalCells * chance)) and directly select random indices to update, thereby reducing O(N) calls to the random number generator.
