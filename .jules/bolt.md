## 2026-05-26 - Decouple Probabilistic Updates from Render Loop
**Learning:** Performing a probabilistic check (`if (Math.random() < chance)`) inside a high-frequency rendering loop for a large grid (e.g., 14,000+ cells in `LetterGlitch`) can be a significant CPU bottleneck.
**Action:** Optimization is achieved by decoupling the update logic: pre-calculating the exact number of updates required (`numUpdates = Math.floor(totalCells * chance)`) and directly selecting random indices to update, thereby drastically reducing O(N) calls to the random number generator before the drawing loop.
