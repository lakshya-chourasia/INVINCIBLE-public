## 2024-05-24 - [Optimize Probabilistic Checks in Render Loops]
**Learning:** Performing a probabilistic check (e.g., `if (Math.random() < chance)`) inside a high-frequency rendering loop for a large grid (e.g., 14,000+ cells) can be a significant CPU bottleneck.
**Action:** Optimization is achieved by decoupling the update logic: pre-calculating the exact number of updates required (`numUpdates = Math.floor(totalCells * chance)`) and directly selecting random indices to update, thereby reducing O(N) calls to the random number generator.
