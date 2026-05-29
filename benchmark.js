const { performance } = require('perf_hooks');

const w = 1920;
const h = 1080;
const fontSize = 12;
const cols = Math.ceil(w / fontSize);
const rows = Math.ceil(h / fontSize);

const chars = '01<{}>[]/\\+-*=&|^!%~?#@';
const baseColors = ['#080808', '#0a0a0a', '#0c0c0c', '#0e0e0e'];
const accents = ['#5227FF', '#FE8BBB', '#ffffff'];

const generateGrid = () => Array(cols).fill(null).map(() => Array(rows).fill(null).map(() => ({
  char: chars[Math.floor(Math.random() * chars.length)],
  color: baseColors[Math.floor(Math.random() * baseColors.length)],
  opacity: 0.15
})));

const grid1 = generateGrid();
const grid2 = generateGrid();

// Mock ctx
const ctx = {
  fillStyle: '',
  globalAlpha: 1,
  fillText: () => {}
};

function runOriginal() {
  const updateChance = 0.015;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = grid1[i][j];

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

      ctx.fillStyle = cell.color;
      ctx.globalAlpha = cell.opacity;
      ctx.fillText(cell.char, i * fontSize, j * fontSize);
    }
  }
}

function runOptimized() {
  const updateChance = 0.015;
  const totalCells = cols * rows;
  const numUpdates = Math.floor(totalCells * updateChance);

  for (let k = 0; k < numUpdates; k++) {
    const i = Math.floor(Math.random() * cols);
    const j = Math.floor(Math.random() * rows);
    const cell = grid2[i][j];
    cell.char = chars[Math.floor(Math.random() * chars.length)];
    if (Math.random() < 0.03) {
      cell.color = accents[Math.floor(Math.random() * accents.length)];
      cell.opacity = 0.6;
    } else {
      cell.color = baseColors[Math.floor(Math.random() * baseColors.length)];
      cell.opacity = 0.15;
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = grid2[i][j];
      ctx.fillStyle = cell.color;
      ctx.globalAlpha = cell.opacity;
      ctx.fillText(cell.char, i * fontSize, j * fontSize);
    }
  }
}

const ITERATIONS = 1000;

const start1 = performance.now();
for (let i = 0; i < ITERATIONS; i++) runOriginal();
const end1 = performance.now();

const start2 = performance.now();
for (let i = 0; i < ITERATIONS; i++) runOptimized();
const end2 = performance.now();

console.log(`Original: ${end1 - start1}ms`);
console.log(`Optimized: ${end2 - start2}ms`);
