## 2024-05-18 - [Decoupled Probabilistic Rendering Loops]
**Learning:** Performing probabilistic conditional checks inside a high-frequency grid rendering loop creates an O(N) CPU bottleneck when dealing with large canvases (e.g., 14,000+ cells).
**Action:** Decouple state updates from rendering: pre-calculate the exact number of updates required (`Math.floor(totalCells * chance)`) and directly target random indices to reduce overhead significantly.
