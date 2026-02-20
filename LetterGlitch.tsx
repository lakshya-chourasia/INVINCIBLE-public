import React, { useEffect, useRef } from 'react';

export const LetterGlitch: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Increased font size for better clarity and less "noisy" feel
    const fontSize = 12;
    const chars = '01<{}>[]/\\+-*=&|^!%~?#@';
    const baseColors = ['#080808', '#0a0a0a', '#0c0c0c', '#0e0e0e'];
    const accents = ['#5227FF', '#FE8BBB', '#ffffff'];
    let cols = Math.ceil(w / fontSize);
    let rows = Math.ceil(h / fontSize);

    // Offscreen canvas for caching static grid state
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = w;
    offscreenCanvas.height = h;
    const offscreenCtx = offscreenCanvas.getContext('2d', { alpha: true });

    // Pre-calculate font string to resolve CSS variables on detached canvas
    const computedFontFamily = getComputedStyle(document.body).getPropertyValue('--font-mono') || 'monospace';
    const fontString = `${fontSize}px ${computedFontFamily}`;

    const generateGrid = () => Array(cols).fill(null).map(() => Array(rows).fill(null).map(() => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      color: baseColors[Math.floor(Math.random() * baseColors.length)],
      opacity: 0.15
    })));

    let grid = generateGrid();

    // Helper to draw the full grid to the offscreen canvas (e.g. on resize)
    const drawFullGridToOffscreen = () => {
      if (!offscreenCtx) return;
      offscreenCtx.clearRect(0, 0, w, h);
      offscreenCtx.font = fontString;
      offscreenCtx.textBaseline = 'top';

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cell = grid[i][j];
          offscreenCtx.fillStyle = cell.color;
          offscreenCtx.globalAlpha = cell.opacity;
          offscreenCtx.fillText(cell.char, i * fontSize, j * fontSize);
        }
      }
    };

    // Initial draw
    drawFullGridToOffscreen();

    let frame = 0;
    let lastTime = 0;
    const fps = 30; // Throttle to 30fps for better performance
    const interval = 1000 / fps;
    let rafId: number;

    const loop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= interval) {
        lastTime = currentTime - (deltaTime % interval);
        frame++;

        // Only update every other frame for even better performance
        if (frame % 2 === 0) {
          // Clear with slight transparency for a smooth "phosphor trail" effect
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.fillRect(0, 0, w, h);

          // Draw the cached grid
          // Optimization: Using cached offscreen canvas reduces thousands of fillText calls to 1 drawImage call per frame
          ctx.globalAlpha = 1;
          ctx.drawImage(offscreenCanvas, 0, 0);

          // Update only a subset of cells per frame for better performance
          const updateChance = 0.015; // Reduced from 0.02

          if (offscreenCtx) {
            // Ensure context settings are correct for updates
            offscreenCtx.font = fontString;
            offscreenCtx.textBaseline = 'top';

            for (let i = 0; i < cols; i++) {
              for (let j = 0; j < rows; j++) {
                if (Math.random() < updateChance) {
                  const cell = grid[i][j];
                  cell.char = chars[Math.floor(Math.random() * chars.length)];

                  if (Math.random() < 0.03) {
                    cell.color = accents[Math.floor(Math.random() * accents.length)];
                    cell.opacity = 0.6;
                  } else {
                    cell.color = baseColors[Math.floor(Math.random() * baseColors.length)];
                    cell.opacity = 0.15;
                  }

                  // Update offscreen canvas
                  const x = i * fontSize;
                  const y = j * fontSize;
                  // Clear strict rect to avoid artifacts
                  offscreenCtx.clearRect(x, y, fontSize, fontSize);
                  offscreenCtx.fillStyle = cell.color;
                  offscreenCtx.globalAlpha = cell.opacity;
                  offscreenCtx.fillText(cell.char, x, y);
                }
              }
            }
          }

          // Refined radial gradient for better central visibility
          ctx.globalAlpha = 1;
          const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.8);
          grad.addColorStop(0, 'rgba(0,0,0,0.85)');
          grad.addColorStop(0.4, 'rgba(0,0,0,0.4)');
          grad.addColorStop(1, 'rgba(0,0,0,0.1)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);
        }
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      // Update offscreen canvas size
      offscreenCanvas.width = w;
      offscreenCanvas.height = h;

      cols = Math.ceil(w / fontSize);
      rows = Math.ceil(h / fontSize);
      grid = generateGrid();

      // Redraw full grid to cache
      drawFullGridToOffscreen();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};
