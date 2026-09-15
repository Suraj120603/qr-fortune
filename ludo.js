// Ludo-lite: quick 3-token race around a 20-step loop. You vs CPU.
window.GameLudo = {
  name: 'Ludo Race',
  init(container, resultEl) {
    const LOOP = 20;
    const you = [0, 0, 0];
    const cpu = [0, 0, 0];
    let turn = 'you';
    let done = false;

    container.innerHTML = `
      <div style="text-align:center;color:#ffcf9c;font-size:.95rem;line-height:1.6">
        First to get any token around the loop (${LOOP} steps) wins!
      </div>
      <div id="ludoBoard" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;width:100%;max-width:320px;margin-top:12px"></div>
      <button class="game-btn" id="ludoRoll" style="margin-top:12px">🎲 ROLL</button>
    `;
    const boardEl = container.querySelector('#ludoBoard');
    const rollBtn = container.querySelector('#ludoRoll');

    const render = () => {
      const side = (label, arr, cls) => `
        <div style="background:#2b2b44;border-radius:14px;padding:10px;text-align:center">
          <div style="font-weight:600;color:#ffcf9c;margin-bottom:6px">${label}</div>
          <div style="display:flex;justify-content:center;gap:8px">
            ${arr.map(v => `<div style="width:26px;height:26px;border-radius:50%;background:${cls};display:flex;align-items:center;justify-content:center;font-size:.7rem;color:#111;font-weight:700">${v}</div>`).join('')}
          </div>
        </div>`;
      boardEl.innerHTML = side('YOU', you, '#ffb347') + side('CPU', cpu, '#66aaff');
    };

    const step = (arr) => {
      const idx = Math.floor(Math.random() * 3);
      arr[idx] = Math.min(LOOP, arr[idx] + 1 + Math.floor(Math.random() * 6));
      return arr[idx] === LOOP;
    };

    const cpuMove = () => {
      if (done) return;
      const won = step(cpu);
      render();
      if (won) {
        done = true;
        resultEl.textContent = '😢 CPU won the race. Try again next scan!';
        rollBtn.disabled = true;
        return;
      }
      turn = 'you';
      rollBtn.disabled = false;
    };

    rollBtn.addEventListener('click', () => {
      if (done || turn !== 'you') return;
      const won = step(you);
      render();
      if (won) {
        done = true;
        resultEl.textContent = '🎉 You won the Ludo race! Success is on your side.';
        rollBtn.disabled = true;
        return;
      }
      turn = 'cpu';
      rollBtn.disabled = true;
      setTimeout(cpuMove, 500);
    });

    render();
  }
};