// Simple tap/click shooter — hit falling targets
window.GameShooter = {
  name: 'Shooter',
  init(container, resultEl) {
    container.innerHTML = `<canvas id="shCanvas" class="shooter-canvas"></canvas>
      <div style="color:#ffcf9c;font-size:.85rem;margin-top:6px">Tap the red targets!</div>`;
    const canvas = container.querySelector('#shCanvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 320;
    const H = canvas.height = 260;

    let targets = [];
    let score = 0;
    let shots = 0;
    let running = true;
    let spawnTimer = 0;
    let last = performance.now();

    const spawn = () => {
      targets.push({
        x: 30 + Math.random() * (W - 60),
        y: -20,
        r: 14 + Math.random() * 8,
        vy: 0.6 + Math.random() * 0.8
      });
    };

    const loop = (t) => {
      if (!running) return;
      const dt = Math.min(50, t - last); last = t;
      spawnTimer += dt;
      if (spawnTimer > 700) { spawn(); spawnTimer = 0; }

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0a0a16';
      ctx.fillRect(0, 0, W, H);

      targets.forEach(tg => {
        tg.y += tg.vy * dt / 16;
        ctx.beginPath();
        ctx.arc(tg.x, tg.y, tg.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ff4455';
        ctx.fill();
        ctx.strokeStyle = '#ffaa88'; ctx.stroke();
      });

      if (targets.some(tg => tg.y - tg.r > H)) {
        running = false;
        resultEl.textContent = `😅 A target escaped! Score: ${score}. Try again next scan.`;
      } else if (shots >= 10 && targets.length === 0) {
        running = false;
        resultEl.textContent = `🎯 Nice shooting! Score: ${score} / 10`;
      }
      if (running) requestAnimationFrame(loop);
    };

    canvas.addEventListener('pointerdown', (e) => {
      if (!running) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * W / rect.width;
      const y = (e.clientY - rect.top) * H / rect.height;
      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        if (Math.hypot(t.x - x, t.y - y) < t.r + 6) {
          targets.splice(i, 1); score++; shots++;
          break;
        }
      }
    });

    requestAnimationFrame(loop);
  }
};