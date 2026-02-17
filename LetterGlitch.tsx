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

    const drawCell = (x: number, y: number, cell: { char: string, color: string, opacity: number }) => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000000';
      ctx.fillRect(x * fontSize, y * fontSize, fontSize, fontSize);

      ctx.fillStyle = cell.color;
      ctx.globalAlpha = cell.opacity;
      ctx.fillText(cell.char, x * fontSize, y * fontSize);
    };

    const drawFullGrid = () => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px var(--font-mono)`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          drawCell(i, j, grid[i][j]);
        }
      }
    };

    drawFullGrid();

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
          ctx.font = `${fontSize}px var(--font-mono)`;
          ctx.textBaseline = 'top';

          // Optimized rendering: Only redraw cells that change (approx 1.5% per frame)
          // instead of clearing and redrawing the entire canvas (14,000+ operations).
          const updateChance = 0.015;

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

                drawCell(i, j, cell);
              }
            }
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
      drawFullGrid();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.8 }}
      />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          // Optimized: CSS overlay for radial gradient avoids per-frame canvas redraw
          background: 'radial-gradient(circle 80vmax at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)',
          opacity: 0.8
        }}
      />
    </>
  );
};
