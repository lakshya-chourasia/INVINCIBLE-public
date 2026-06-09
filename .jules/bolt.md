## 2024-05-24 - O(N) Math.random() bottleneck in canvas grids
**Learning:** Calling Math.random() probabilistically for 14,000+ cells per frame creates a massive CPU bottleneck during rendering, making animations stutter.
**Action:** Decouple updates from grid iteration by pre-calculating required updates (total * chance) and directly mutating random indices.
