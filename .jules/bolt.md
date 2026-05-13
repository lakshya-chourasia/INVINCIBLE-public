## 2024-05-23 - [O(N) Math.random() Bottleneck in Canvas Rendering]
**Learning:** Performing a probabilistic check (`if (Math.random() < chance)`) inside a high-frequency rendering loop for a large grid (e.g., 14,000+ cells) is a significant CPU bottleneck.
**Action:** Optimization is achieved by decoupling the update logic: pre-calculating the exact number of updates required (`numUpdates = Math.floor(totalCells * chance)`) and directly selecting random indices to update, thereby reducing O(N) calls to the random number generator.
