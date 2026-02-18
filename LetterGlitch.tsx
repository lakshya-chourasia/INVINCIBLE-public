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

    const generateGrid = () => Array(cols).fill(null).map(() => Array(rows).fill(null).map(() => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      color: baseColors[Math.floor(Math.random() * baseColors.length)],
      opacity: 0.15
    })));

    let grid = generateGrid();

    // Performance Optimization: Cache gradient to avoid recreation every frame
    let cachedGradient: CanvasGradient | null = null;
    const updateGradient = () => {
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.8);
      grad.addColorStop(0, 'rgba(0,0,0,0.85)');
      grad.addColorStop(0.4, 'rgba(0,0,0,0.4)');
      grad.addColorStop(1, 'rgba(0,0,0,0.1)');
      cachedGradient = grad;
    };
    updateGradient();

    // Performance Optimization: Batch rendering by color+opacity
    // Using parallel arrays to avoid object allocation per cell (GC pressure)
    // Keys are finite (7 colors * 2 opacities = 14 keys max), so no memory leak
    const batches: Record<string, {
      color: string,
      opacity: number,
      xs: number[],
      ys: number[],
      chars: string[]
    }> = {};

    let frame = 0;
    let lastTime = 0;
    const fps = 30; // Throttle to 30fps for better performance
    const interval = 1000 / fps;

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

          ctx.font = `${fontSize}px var(--font-mono)`;
          ctx.textBaseline = 'top';

          // Update only a subset of cells per frame for better performance
          const updateChance = 0.015; // Reduced from 0.02

          // Reset batches (clear arrays, keep keys)
          for (const key in batches) {
            batches[key].xs.length = 0;
            batches[key].ys.length = 0;
            batches[key].chars.length = 0;
          }

          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              const cell = grid[i][j];

              // Update cell state
              if (Math.random() < updateChance) {
                cell.char = chars[Math.floor(Math.random() * chars.length)];
                if (Math.random() < 0.03) {
                  cell.color = accents[Math.floor(Math.random() * accents.length)];
                  cell.opacity = 0.6;
                } else {
                  cell.color = baseColors[Math.floor(Math.random() * baseColors.length)];
                  cell.opacity = 0.15;
                }
              }

              // Collect for batch drawing
              // Use a composite key to handle color/opacity variations correctly
              const key = `${cell.color}-${cell.opacity}`;
              if (!batches[key]) {
                  batches[key] = {
                    color: cell.color,
                    opacity: cell.opacity,
                    xs: [],
                    ys: [],
                    chars: []
                  };
              }
              batches[key].xs.push(i * fontSize);
              batches[key].ys.push(j * fontSize);
              batches[key].chars.push(cell.char);
            }
          }

          // Draw batches to minimize context switching
          for (const key in batches) {
            const batch = batches[key];
            const count = batch.xs.length;
            if (count === 0) continue;

            ctx.globalAlpha = batch.opacity;
            ctx.fillStyle = batch.color;

            for (let k = 0; k < count; k++) {
              ctx.fillText(batch.chars[k], batch.xs[k], batch.ys[k]);
            }
          }

          // Refined radial gradient for better central visibility
          ctx.globalAlpha = 1;
          if (cachedGradient) {
            ctx.fillStyle = cachedGradient;
            ctx.fillRect(0, 0, w, h);
          }
        }
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.ceil(w / fontSize);
      rows = Math.ceil(h / fontSize);
      grid = generateGrid();
      updateGradient();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};
