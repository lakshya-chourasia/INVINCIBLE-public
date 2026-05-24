// Mock Canvas and Grid
const cols = 160;
const rows = 90;
const chars = '01<{}>[]/\\+-*=&|^!%~?#@';
const baseColors = ['#080808', '#0a0a0a', '#0c0c0c', '#0e0e0e'];
const accents = ['#5227FF', '#FE8BBB', '#ffffff'];
const updateChance = 0.015;

const generateGrid = () => Array(cols).fill(null).map(() => Array(rows).fill(null).map(() => ({
  char: chars[Math.floor(Math.random() * chars.length)],
  color: baseColors[Math.floor(Math.random() * baseColors.length)],
  opacity: 0.15
})));

let grid1 = generateGrid();
let grid2 = generateGrid();

function runOriginal() {
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
      // Mock draw
      let a = cell.color;
      let b = cell.opacity;
      let c = cell.char;
    }
  }
}

function runOptimized() {
  const totalCells = cols * rows;
  const numUpdates = Math.floor(totalCells * updateChance);
  for (let k = 0; k < numUpdates; k++) {
    const index = Math.floor(Math.random() * totalCells);
    const i = Math.floor(index / rows);
    const j = index % rows;
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
      // Mock draw
      let a = cell.color;
      let b = cell.opacity;
      let c = cell.char;
    }
  }
}

const ITERATIONS = 1000;

console.time('Original O(N) random checks');
for (let i = 0; i < ITERATIONS; i++) {
  runOriginal();
}
console.timeEnd('Original O(N) random checks');

console.time('Optimized O(1) random selection');
for (let i = 0; i < ITERATIONS; i++) {
  runOptimized();
}
console.timeEnd('Optimized O(1) random selection');
