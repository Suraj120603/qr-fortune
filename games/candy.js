// Candy-crush style match-3 on a 6x6 grid
window.GameCandy = {
  name: 'Candy Match',
  init(container, resultEl) {
    const SIZE = 6;
    const TYPES = ['🍬','🍭','🍫','🍩','🧁','🍪'];
    let grid = [];
    let selected = null;
    let score = 0;
    let moves = 12;
    let done = false;

    container.innerHTML = `
      <div style="color:#ffcf9c;font-size:.85rem;text-align:center;margin-bottom:6px">
        Match 3+ candies · Moves: <b id="cMoves">12</b> · Score: <b id="cScore">0</b>
      </div>
      <div class="candy-grid" id="cGrid"></div>
    `;
    const gridEl = container.querySelector('#cGrid');
    const movesEl = container.querySelector('#cMoves');
    const scoreEl = container.querySelector('#cScore');

    const rand = () => TYPES[Math.floor(Math.random() * TYPES.length)];

    const newGrid = () => {
      grid = [];
      for (let r = 0; r < SIZE; r++) {
        const row = [];
        for (let c = 0; c < SIZE; c++) row.push(rand());
        grid.push(row);
      }
      // ensure no initial matches
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          while (
            (c >= 2 && grid[r][c] === grid[r][c-1] && grid[r][c] === grid[r][c-2]) ||
            (r >= 2 && grid[r][c] === grid[r-1][c] && grid[r][c] === grid[r-2][c])
          ) grid[r][c] = rand();
        }
      }
    };

    const render = () => {
      gridEl.innerHTML = '';
      grid.forEach((row, r) => row.forEach((v, c) => {
        const d = document.createElement('div');
        d.className = 'candy-cell' + (selected && selected.r === r && selected.c === c ? ' selected' : '');
        d.textContent = v;
        d.style.background = '#20202e';
        d.addEventListener('click', () => onCell(r, c));
        gridEl.appendChild(d);
      }));
      movesEl.textContent = moves;
      scoreEl.textContent = score;
    };

    const swap = (a, b) => {
      const tmp = grid[a.r][a.c];
      grid[a.r][a.c] = grid[b.r][b.c];
      grid[b.r][b.c] = tmp;
    };

    const findMatches = () => {
      const m = new Set();
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE - 2; c++) {
          if (grid[r][c] && grid[r][c] === grid[r][c+1] && grid[r][c] === grid[r][c+2]) {
            m.add(`${r},${c}`); m.add(`${r},${c+1}`); m.add(`${r},${c+2}`);
          }
        }
      }
      for (let c = 0; c < SIZE; c++) {
        for (let r = 0; r < SIZE - 2; r++) {
          if (grid[r][c] && grid[r][c] === grid[r+1][c] && grid[r][c] === grid[r+2][c]) {
            m.add(`${r},${c}`); m.add(`${r+1},${c}`); m.add(`${r+2},${c}`);
          }
        }
      }
      return m;
    };

    const collapse = () => {
      for (let c = 0; c < SIZE; c++) {
        const col = [];
        for (let r = SIZE - 1; r >= 0; r--) if (grid[r][c]) col.push(grid[r][c]);
        for (let r = SIZE - 1; r >= 0; r--) grid[r][c] = col[SIZE - 1 - r] || rand();
      }
    };

    const resolve = () => {
      let matched;
      let total = 0;
      while ((matched = findMatches()).size) {
        total += matched.size;
        matched.forEach(k => {
          const [r, c] = k.split(',').map(Number);
          grid[r][c] = null;
        });
        collapse();
      }
      return total;
    };

    const onCell = (r, c) => {
      if (done || moves <= 0) return;
      if (!selected) { selected = { r, c }; render(); return; }
      const dist = Math.abs(selected.r - r) + Math.abs(selected.c - c);
      if (dist !== 1) { selected = { r, c }; render(); return; }
      swap(selected, { r, c });
      const matched = resolve();
      if (matched === 0) {
        swap(selected, { r, c }); // undo
        selected = null; render();
        return;
      }
      score += matched * 10;
      moves--;
      selected = null;
      render();
      if (moves <= 0) {
        done = true;
        resultEl.textContent = `🎉 Final score: ${score}! Great things ahead.`;
      }
    };

    newGrid(); render();
  }
};