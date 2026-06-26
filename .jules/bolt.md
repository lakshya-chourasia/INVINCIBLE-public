## 2025-02-23 - Avoid probabilistic iteration in canvas loops
**Learning:** Iterating over every cell to evaluate Math.random() < chance for random updates creates an O(N) overhead per frame, which is inefficient for high-frequency Canvas renders.
**Action:** Calculate the required number of updates upfront (e.g. Math.floor(totalCells * chance)) and select random indices to achieve an O(updates) time complexity instead.
