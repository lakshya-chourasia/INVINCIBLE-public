## 2023-10-25 - [Canvas Performance Bottleneck]
**Learning:** Performing a probabilistic check (`if (Math.random() < chance)`) inside a high-frequency rendering loop for a large grid is a CPU bottleneck.
**Action:** Decouple update logic by pre-calculating the exact number of required updates and selecting random indices, reducing O(N) calls to O(1) random selections.
