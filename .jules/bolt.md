## 2024-10-24 - [Optimizing Probabilistic Checks in High-Frequency Canvas Rendering]
**Learning:** Performing a probabilistic check (e.g., `if (Math.random() < chance)`) inside a high-frequency rendering loop for a large grid (e.g., 14,000+ cells) creates a significant CPU bottleneck due to O(N) calls to the random number generator.
**Action:** Decouple update logic from rendering by pre-calculating the exact number of updates required (`numUpdates = Math.floor(totalCells * chance)`) and directly selecting random indices, reducing redundant RNG calls.
