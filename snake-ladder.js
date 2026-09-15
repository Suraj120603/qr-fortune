// Snake & Ladder mini version — 6x6 board (36 cells), race to cell 36
window.GameSnakeLadder = {
  name: 'Snake & Ladder',
  init(container, resultEl) {
    const SIZE = 6;
    const TOTAL = SIZE * SIZE;
    const snakes = { 17: 7, 26: 12, 34: 22 };   // head: tail
    const ladders = { 3: 14, 8: 20, 15: 30 };    // bottom: top

    let playerPos = 0;
    let cpuPos = 0;
    let turn = 'you';
    let done = false;

    container.innerHTML = `
      <div class="sl-board" id="slBoard"></div>
      <div style="margin-top:10px;font-size:.9rem;color:#ffcf9c;text-align:center">
        You: <b id="youPos">0</b> · CPU: <b id="cpuPos">0</b>
      </div>
      <button class="game-btn" id="slRoll" style="margin-top:10px">🎲 ROLL</button>
    `;
    const board = container.querySelector('#slBoard');
    const youPosEl = container.querySelector('#youPos');
    const cpuPosEl = container.querySelector('#cpuPos');
    const rollBtn = container.querySelector('#slRoll');

    // build cells (visually boustrophedon: bottom-left is 1)
    const cells = [];
    for (let row = SIZE - 1; row >= 0; row--) {
      const rowCells = [];
      for (let col = 0; col < SIZE; col++) {
        const reverse = (SIZE - 1 - row) % 2 === 1;
        const c = reverse ? SIZE - 1 - col : col;
        const num = row * SIZE + c + 1;
        rowCells.push(num);
      }
      cells.push(...rowCells);
    }
    cells.forEach(num => {
      const d = document.createElement('div');
      d.className = 'sl-cell';
      d.dataset.num = num;
      d.textContent = num;
      if (snakes[num]) d.classList.add('snake');
      if (ladders[num]) d.classList.add('ladder');
      board.appendChild(d);
    });

    const render = () => {
      board.querySelectorAll('.sl-player').forEach(p => p.remove());
      const place = (num, color) => {
        if (num === 0) return;
        const cell = board.querySelector(`.sl-cell[data-num="${num}"]`);
        if (!cell) return;
        const dot = document.createElement('div');
        dot.className = 'sl-player';
        dot.style.background = color;
        cell.appendChild(dot);
      };
      place(playerPos, 'radial-gradient(circle at 30% 30%, #ffe, #ffb347)');
      place(cpuPos, 'radial-gradient(circle at 30% 30%, #bff, #3399ff)');
      youPosEl.textContent = playerPos;
      cpuPosEl.textContent = cpuPos;
    };

    const move = (pos, roll) => {
      let np = pos + roll;
      if (np > TOTAL) np = pos;
      if (snakes[np]) np = snakes[np];
      if (ladders[np]) np = ladders[np];
      return np;
    };

    const cpuTurn = () => {
      if (done) return;
      const roll = 1 + Math.floor(Math.random() * 6);
      cpuPos = move(cpuPos, roll);
      render();
      if (cpuPos === TOTAL) {
        done = true;
        resultEl.textContent = '😢 CPU reached the end first. Try again next scan!';
        rollBtn.disabled = true;
        return;
      }
      turn = 'you';
      rollBtn.disabled = false;
    };

    rollBtn.addEventListener('click', () => {
      if (done || turn !== 'you') return;
      const roll = 1 + Math.floor(Math.random() * 6);
      playerPos = move(playerPos, roll);
      render();
      if (playerPos === TOTAL) {
        done = true;
        resultEl.textContent = '🎉 You won! Great things are coming your way.';
        rollBtn.disabled = true;
        return;
      }
      turn = 'cpu';
      rollBtn.disabled = true;
      setTimeout(cpuTurn, 600);
    });

    render();
  }
};