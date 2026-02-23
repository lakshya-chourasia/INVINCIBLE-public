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

    // Resolve font from CSS variable once
    const fontMono = getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || "'JetBrains Mono', monospace";

    // Offscreen canvas cache for characters to avoid expensive fillText calls
    const charCache = new Map<string, HTMLCanvasElement>();

    const getCharImage = (char: string, color: string) => {
      const key = `${char}-${color}`;
      if (charCache.has(key)) return charCache.get(key)!;

      const cacheCanvas = document.createElement('canvas');
      cacheCanvas.width = fontSize;
      cacheCanvas.height = fontSize;
      const cacheCtx = cacheCanvas.getContext('2d', { alpha: true });

      if (cacheCtx) {
        // Use resolved font string instead of variable for offscreen canvas
        cacheCtx.font = `${fontSize}px ${fontMono}`;
        cacheCtx.textBaseline = 'top';
        cacheCtx.fillStyle = color;
        cacheCtx.fillText(char, 0, 0);
      }

      charCache.set(key, cacheCanvas);
      return cacheCanvas;
    };

    const generateGrid = () => Array(cols).fill(null).map(() => Array(rows).fill(null).map(() => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const color = baseColors[Math.floor(Math.random() * baseColors.length)];
      return {
        char,
        color,
        opacity: 0.15,
        image: getCharImage(char, color)
      };
    }));

    let grid = generateGrid();

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

          // ctx.font and ctx.textBaseline are no longer needed here as we draw images

          // Update only a subset of cells per frame for better performance
          const updateChance = 0.015; // Reduced from 0.02

          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              const cell = grid[i][j];

              if (Math.random() < updateChance) {
                cell.char = chars[Math.floor(Math.random() * chars.length)];
                if (Math.random() < 0.03) {
                  cell.color = accents[Math.floor(Math.random() * accents.length)];
                  cell.opacity = 0.6;
                } else {
                  cell.color = baseColors[Math.floor(Math.random() * baseColors.length)];
                  cell.opacity = 0.15;
                }
                // Update cached image reference
                cell.image = getCharImage(cell.char, cell.color);
              }

              // Use drawImage instead of fillText for significantly better performance
              ctx.globalAlpha = cell.opacity;
              ctx.drawImage(cell.image, i * fontSize, j * fontSize);
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
