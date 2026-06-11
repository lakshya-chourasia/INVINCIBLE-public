## 2024-05-24 - [Decoupling Updates in High-Frequency Render Loops]
**Learning:** Performing a probabilistic check (`if (Math.random() < chance)`) inside a high-frequency rendering loop for a large grid is a significant CPU bottleneck due to O(N) calls to the random number generator.
**Action:** Optimize by decoupling the update logic: pre-calculate the exact number of updates required (`numUpdates = Math.floor(totalCells * chance)`) and directly select random indices to update, thereby reducing RNG calls from O(N) to O(numUpdates).
