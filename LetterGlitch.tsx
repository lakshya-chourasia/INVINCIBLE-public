import React, { useEffect, useRef } from 'react';

const fontSize = 12;
const chars = '01<{}>[]/\\+-*=&|^!%~?#@';
const baseColors = ['#080808', '#0a0a0a', '#0c0c0c', '#0e0e0e'];
const accents = ['#5227FF', '#FE8BBB', '#ffffff'];

// Precompute mappings to avoid lookups in the loop
const charIndexMap: Record<string, number> = {};
chars.split('').forEach((c, i) => { charIndexMap[c] = i; });

const colorRowMap: Record<string, number> = {};
baseColors.forEach((c, i) => { colorRowMap[c] = i; }); // Rows 0-3 (opacity 0.15)
accents.forEach((c, i) => { colorRowMap[c] = i + baseColors.length; }); // Rows 4-6 (opacity 0.6)

export const LetterGlitch: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    let cols = Math.ceil(w / fontSize);
    let rows = Math.ceil(h / fontSize);

    // --- Optimization: Offscreen Canvas Cache ---
    const offscreen = document.createElement('canvas');
    const charWidth = fontSize;
    const charHeight = fontSize;
    const totalColors = baseColors.length + accents.length;

    offscreen.width = chars.length * charWidth;
    offscreen.height = totalColors * charHeight;

    const offCtx = offscreen.getContext('2d', { alpha: true });
    if (!offCtx) return;

    // Use computed style to ensure correct font stack
    const computedFont = getComputedStyle(document.body).getPropertyValue('--font-mono') || 'monospace';
    offCtx.font = `${fontSize}px ${computedFont}`;
    offCtx.textBaseline = 'top';

    // Draw all sprites
    // Rows 0-3: Base colors (opacity 0.15)
    baseColors.forEach((color, row) => {
      offCtx.fillStyle = color;
      offCtx.globalAlpha = 0.15;
      chars.split('').forEach((char, col) => {
        offCtx.fillText(char, col * charWidth, row * charHeight);
      });
    });

    // Rows 4-6: Accent colors (opacity 0.6)
    accents.forEach((color, i) => {
      const row = baseColors.length + i;
      offCtx.fillStyle = color;
      offCtx.globalAlpha = 0.6;
      chars.split('').forEach((char, col) => {
        offCtx.fillText(char, col * charWidth, row * charHeight);
      });
    });
    // --------------------------------------------

    const generateGrid = () => Array(cols).fill(null).map(() => Array(rows).fill(null).map(() => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      color: baseColors[Math.floor(Math.random() * baseColors.length)],
    })));

    let grid = generateGrid();

    let frame = 0;
    let lastTime = performance.now();
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

          // Reset alpha for drawImage (as sprites already have alpha baked in)
          ctx.globalAlpha = 1.0;

          // Update only a subset of cells per frame for better performance
          const updateChance = 0.015;

          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              const cell = grid[i][j];

              if (Math.random() < updateChance) {
                cell.char = chars[Math.floor(Math.random() * chars.length)];
                if (Math.random() < 0.03) {
                  cell.color = accents[Math.floor(Math.random() * accents.length)];
                } else {
                  cell.color = baseColors[Math.floor(Math.random() * baseColors.length)];
                }
              }

              // Draw using cached sprite
              // We rely on colorRowMap to get the row (which includes opacity)
              const charIdx = charIndexMap[cell.char];
              const rowIdx = colorRowMap[cell.color];

              if (charIdx !== undefined && rowIdx !== undefined) {
                ctx.drawImage(offscreen,
                  charIdx * charWidth, rowIdx * charHeight, charWidth, charHeight,
                  i * fontSize, j * fontSize, charWidth, charHeight
                );
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

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.ceil(w / fontSize);
      rows = Math.ceil(h / fontSize);
      grid = generateGrid();
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
