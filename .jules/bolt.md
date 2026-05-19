## 2024-05-24 - Pre-calculating updates to avoid O(N) random calls
**Learning:** Performing a probabilistic check (`if (Math.random() < chance)`) inside a high-frequency rendering loop for a large grid is a CPU bottleneck.
**Action:** Decouple the update logic: pre-calculate the exact number of updates (`numUpdates = Math.floor(totalCells * chance)`) and directly select random indices to update, reducing O(N) calls to the random number generator.
