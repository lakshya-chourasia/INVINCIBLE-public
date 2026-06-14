## 2024-06-14 - Optimize Canvas Rendering Loop
**Learning:** Performing a probabilistic check (e.g., `if (Math.random() < chance)`) inside a high-frequency rendering loop for a large grid (e.g., 14,000+ cells) is a significant CPU bottleneck.
**Action:** Decouple the update logic: pre-calculate the exact number of updates required (`numUpdates = Math.floor(totalCells * chance)`) and directly select random indices to update, reducing O(N) calls to the random number generator.
