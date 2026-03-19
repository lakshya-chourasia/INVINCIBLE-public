## 2024-03-19 - CSS Background Overlays Over Canvas fillRect
**Learning:** Drawing a static radial gradient using `ctx.createRadialGradient` and `fillRect` every single frame in a `requestAnimationFrame` loop causes a massive and unnecessary performance hit (CPU and GPU).
**Action:** Extract static overlays and gradients from canvas render loops into standard HTML `<div>` elements with hardware-accelerated CSS `background: radial-gradient(...)`. Position them with `pointer-events: none` and a z-index. This completely eliminates the per-frame canvas draw cost for that layer.
