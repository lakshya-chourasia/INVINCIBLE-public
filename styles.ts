
export const globalStyles = `
:root {
  --primary-purple: #5227FF; 
  --primary-pink: #FE8BBB;
  --bg-deep: #000000;
  --bg-card: #09090b;
  --border-glass: rgba(255, 255, 255, 0.08);
  --font-mono: 'JetBrains Mono', monospace;
}

body {
  cursor: none;
  background-color: var(--bg-deep);
  color: #fafafa;
  overflow-x: hidden;
  font-family: var(--font-mono);
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.02em;
}

::-webkit-scrollbar { display: none; }
body { -ms-overflow-style: none; scrollbar-width: none; }

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.02; /* Further reduced for better performance */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  will-change: opacity;
}

.global-glow {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle 800px at var(--x) var(--y), rgba(82, 39, 255, 0.05), transparent 80%);
}

.custom-cursor {
  position: fixed;
  top: 0; left: 0;
  width: 8px;
  height: 8px;
  background: var(--primary-purple);
  pointer-events: none;
  z-index: 9999;
  border-radius: 50%;
  box-shadow: 0 0 10px var(--primary-purple);
  will-change: transform;
  transform: translateZ(0); /* Force GPU acceleration */
}

.cursor-ring {
  position: fixed;
  top: 0; left: 0;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
  z-index: 9999;
  border-radius: 50%;
  will-change: transform, background-color;
  transform: translateZ(0); /* Force GPU acceleration */
}

.glass-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  backdrop-filter: blur(12px);
  border-radius: 32px;
}

.purple-liquid-glass {
  background: rgba(82, 39, 255, 0.25) !important;
  backdrop-filter: blur(24px) saturate(160%); /* Reduced blur slightly for better performance and less breaking */
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 
    0 10px 40px -10px rgba(82, 39, 255, 0.3),
    inset 0 0 20px 0 rgba(255, 255, 255, 0.1);
}

/* Staggered Menu Styles - Backdrop */
.staggered-menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  pointer-events: none;
}

.staggered-menu-wrapper[data-open='true'] {
  pointer-events: auto;
}

.staggered-menu-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.staggered-menu-wrapper[data-open='true'] .staggered-menu-backdrop {
  opacity: 1;
}

@media (max-width: 768px) {
  .sm-panel-item {
    font-size: 2.5rem;
  }
}
`;
