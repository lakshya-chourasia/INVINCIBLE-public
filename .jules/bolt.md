## 2024-05-30 - Decoupling Probabilistic Checks from Rendering Loops
**Learning:** In the `LetterGlitch` component, calling `if (Math.random() < chance)` inside a high-frequency rendering loop for a large grid (14,000+ cells) caused a significant CPU bottleneck due to O(N) calls to the random number generator per frame.
**Action:** Decouple the update logic from the render loop. Pre-calculate the exact number of updates required (`Math.floor(totalCells * chance)`) and directly select random indices to update, reducing the RNG calls to O(updates) instead of O(N).
