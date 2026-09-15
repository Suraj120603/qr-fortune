// Endless racing: dodge obstacles with arrow keys or swipe
window.GameRacing = {
  name: 'Racing',
  init(container, resultEl) {
    container.innerHTML = `
      <div class="race-track" id="raceTrack" tabindex="0">
        <div class="race-lane" style="top:33%"></div>
        <div class="race-lane" style="top:66%"></div>
      </div>
      <div style="text-align:center;color:#ffcf9c;font-size:.85rem;margin-top:8px">
        <button class="game-btn" id="rLeft" style="padding:8px 16px;margin:4px">◀</button>
        <button class="game-btn" id="rRight" style="padding:8px 16px;margin:4px">▶</button>
        <span style="margin-left:8px">← / → or tap</span>
      </div>
    `;
    const track = container.querySelector('#raceTrack');
    const W = track.clientWidth || 320;
    const H = 220;
    const laneX = [W * 0.15, W * 0.5, W * 0.85];
    let lane = 1;
    let playerY = H - 60;
    let obstacles = [];
    let score = 0;
    let running = true;
    let rafId;
    let lastTime = 0;

    const car = document.createElement('div');
    car.className = 'race-car';
    car.style.left = (laneX[lane] - 17) + 'px';
    car.style.top = playerY + 'px';
    track.appendChild(car);

    const spawn = () => {
      const ln = Math.floor(Math.random() * 3);
      const o = document.createElement('div');
      o.className = 'race-obstacle';
      o.style.left = (laneX[ln] - 17) + 'px';
      o.style.top = '-40px';
      track.appendChild(o);
      obstacles.push({ el: o, lane: ln, y: -40 });
    };

    const move = (dir) => {
      if (!running) return;
      lane = Math.max(0, Math.min(2, lane + dir));
      car.style.left = (laneX[lane] - 17) + 'px';
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    });
    container.querySelector('#rLeft').addEventListener('click', () => move(-1));
    container.querySelector('#rRight').addEventListener('click', () => move(1));

    let spawnTimer = 0;
    const loop = (t) => {
      if (!running) return;
      const dt = Math.min(50, t - lastTime); lastTime = t;
      spawnTimer += dt;
      if (spawnTimer > 900) { spawn(); spawnTimer = 0; }
      obstacles.forEach(o => {
        o.y += dt * 0.25;
        o.el.style.top = o.y + 'px';
        if (o.y > playerY - 30 && o.y < playerY + 50 && o.lane === lane) {
          running = false;
          resultEl.textContent = `💥 Crash! Score: ${Math.floor(score)} m. Try again next scan.`;
        }
      });
      obstacles = obstacles.filter(o => {
        if (o.y > H) { o.el.remove(); score += 10; return false; }
        return true;
      });
      if (running) rafId = requestAnimationFrame(loop);
      else cancelAnimationFrame(rafId);
    };
    rafId = requestAnimationFrame(loop);
  }
};