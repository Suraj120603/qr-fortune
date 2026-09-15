(function () {
  /* -----------------------------------------------------------
     DATA — edit these to add your own fortunes & images
  ----------------------------------------------------------- */
  const quotes = [
    { text: "You will find a bug in your code… and it will be a feature.", author: "Murphy's Dev" },
    { text: "A cookie a day keeps the debugger away.", author: "Fortune 404" },
    { text: "The best way to predict the future is to compile it.", author: "Alan Kay (almost)" },
    { text: "Your code will compile on the first try… in an alternate universe.", author: "Quantum Dev" },
    { text: "He who laughs last, probably didn't get the joke.", author: "Confucius.js" },
    { text: "You will soon receive an unexpected gift: a segfault.", author: "C++ Oracle" },
    { text: "A balanced diet is a cookie in each hand.", author: "Anonymous" },
    { text: "Don't worry about the world ending today. It's already tomorrow in Australia.", author: "Charles M. Schulz" },
    { text: "The fortune you seek is in another cookie.", author: "Classic" },
    { text: "404: Fortune not found. But you're still awesome.", author: "The Internet" },
    { text: "Real programmers count from 0.", author: "Unknown" },
    { text: "Today is a good day to have a great day.", author: "Fortune Cookie" },
    { text: "You will soon eat a delicious meal… with extra cheese.", author: "The Pizza Gods" },
    { text: "Beware of the man who speaks in hands.", author: "Gravity Falls" },
    { text: "The rubber duck knows your bug.", author: "Rubber Duck Debugging" }
  ];

  const funnyImages = [
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23fff3d1"/%3E%3Ccircle cx="150" cy="90" r="50" fill="%23f7c35c"/%3E%3Ccircle cx="250" cy="90" r="50" fill="%23f7c35c"/%3E%3Ccircle cx="170" cy="80" r="8" fill="black"/%3E%3Ccircle cx="230" cy="80" r="8" fill="black"/%3E%3Cpath d="M170 120 Q200 150 230 120" stroke="black" stroke-width="6" fill="none"/%3E%3Ctext x="200" y="35" font-size="26" text-anchor="middle" fill="%23b16f1e"%3E🥠 LAUGH%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23ffe0b0"/%3E%3Crect x="80" y="40" width="240" height="100" rx="30" fill="%23d48f4b"/%3E%3Ccircle cx="150" cy="80" r="10" fill="white"/%3E%3Ccircle cx="250" cy="80" r="10" fill="white"/%3E%3Ccircle cx="150" cy="80" r="4" fill="black"/%3E%3Ccircle cx="250" cy="80" r="4" fill="black"/%3E%3Cpath d="M160 120 Q200 150 240 120" stroke="white" stroke-width="8" fill="none" stroke-linecap="round"/%3E%3Ctext x="200" y="25" font-size="24" text-anchor="middle" fill="%23a5510e"%3E🍪 GRIN%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23fcf0db"/%3E%3Cpath d="M130 110 L200 50 L270 110 L200 170 Z" fill="%23f7b267"/%3E%3Ccircle cx="170" cy="90" r="8" fill="white"/%3E%3Ccircle cx="230" cy="90" r="8" fill="white"/%3E%3Ccircle cx="170" cy="90" r="4" fill="black"/%3E%3Ccircle cx="230" cy="90" r="4" fill="black"/%3E%3Cpath d="M180 130 Q200 160 220 130" stroke="black" stroke-width="5" fill="none"/%3E%3Ctext x="200" y="30" font-size="26" text-anchor="middle" fill="%23a5510e"%3E🤪 SILLY%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23ffe6c7"/%3E%3Ccircle cx="200" cy="90" r="60" fill="%23e6b17e"/%3E%3Ccircle cx="175" cy="75" r="10" fill="white"/%3E%3Ccircle cx="225" cy="75" r="10" fill="white"/%3E%3Ccircle cx="175" cy="75" r="5" fill="black"/%3E%3Ccircle cx="225" cy="75" r="5" fill="black"/%3E%3Cpath d="M180 120 Q200 140 220 120" stroke="black" stroke-width="6" fill="none"/%3E%3Ctext x="200" y="25" font-size="24" text-anchor="middle" fill="%23b16f1e"%3E😋 YUM%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23e6f7ff"/%3E%3Ctext x="200" y="110" font-size="100" text-anchor="middle"%3E🤖%3C/text%3E%3Ctext x="200" y="160" font-size="20" text-anchor="middle" fill="%23006bb3"%3EBEEP BOOP FORTUNE%3C/text%3E%3C/svg%3E'
  ];

  /* -----------------------------------------------------------
     MINI-GAMES — add your own as objects
  ----------------------------------------------------------- */
  const games = [
    {
      name: 'Guess the number',
      init(container, resultEl) {
        const randomNum = Math.floor(Math.random() * 10) + 1;
        let attempts = 0;
        container.innerHTML = `
          <div style="font-size:0.95rem;margin-bottom:4px;">I'm thinking of a number between 1 and 10.</div>
          <div class="guess-input">
            <input type="number" id="guessInput" min="1" max="10" placeholder="1-10">
            <button id="guessSubmit">Guess</button>
          </div>`;
        const input = container.querySelector('#guessInput');
        const btn = container.querySelector('#guessSubmit');
        btn.addEventListener('click', () => {
          const val = parseInt(input.value, 10);
          if (isNaN(val) || val < 1 || val > 10) {
            resultEl.textContent = '❓ Enter a number 1-10';
            return;
          }
          attempts++;
          if (val === randomNum) {
            resultEl.textContent = `🎉 Correct! It was ${randomNum}. You took ${attempts} attempt(s).`;
            btn.disabled = true;
            input.disabled = true;
          } else if (val < randomNum) {
            resultEl.textContent = `⬆️ Too low! Try again.`;
          } else {
            resultEl.textContent = `⬇️ Too high! Try again.`;
          }
        });
      }
    },
    {
      name: 'Roll a six',
      init(container, resultEl) {
        container.innerHTML = `
          <div class="dice-area">
            <div class="dice-value" id="diceDisplay">🎲</div>
            <button class="game-btn" id="rollBtn" style="max-width:180px;padding:10px 0;">ROLL DICE</button>
          </div>`;
        const diceDisplay = container.querySelector('#diceDisplay');
        const rollBtn = container.querySelector('#rollBtn');
        rollBtn.addEventListener('click', () => {
          const roll = Math.floor(Math.random() * 6) + 1;
          const diceEmoji = ['⚀','⚁','⚂','⚃','⚄','⚅'][roll - 1];
          diceDisplay.textContent = `${diceEmoji} ${roll}`;
          resultEl.textContent = roll === 6
            ? '🎉 You rolled a SIX! Fortune favors you.'
            : `You rolled ${roll}. Try again next scan.`;
          rollBtn.disabled = true;
        });
      }
    },
    {
      name: 'Lucky coin flip',
      init(container, resultEl) {
        container.innerHTML = `
          <div style="font-size:1.2rem;margin-bottom:12px;">🪙 Heads or Tails?</div>
          <div style="display:flex;gap:12px;justify-content:center;">
            <button class="game-btn" id="headsBtn" style="max-width:120px;padding:12px 0;">HEADS</button>
            <button class="game-btn" id="tailsBtn" style="max-width:120px;padding:12px 0;">TAILS</button>
          </div>`;
        const heads = container.querySelector('#headsBtn');
        const tails = container.querySelector('#tailsBtn');
        const finish = (choice) => {
          const flip = Math.random() < 0.5 ? 'heads' : 'tails';
          resultEl.textContent = choice === flip
            ? `🎉 It was ${flip}! You win a virtual cookie. 🍪`
            : `😕 It was ${flip}. Better luck next scan.`;
          heads.disabled = true;
          tails.disabled = true;
        };
        heads.addEventListener('click', () => finish('heads'));
        tails.addEventListener('click', () => finish('tails'));
      }
    },
    {
      name: 'Tap the button',
      init(container, resultEl) {
        let taps = 0;
        const target = 5;
        container.innerHTML = `
          <div style="font-size:1rem;margin-bottom:8px;">Tap 5 times quickly!</div>
          <button class="game-btn" id="tapBtn" style="max-width:180px;">TAP (0/5)</button>`;
        const btn = container.querySelector('#tapBtn');
        btn.addEventListener('click', () => {
          taps++;
          btn.textContent = `TAP (${taps}/5)`;
          if (taps >= target) {
            btn.disabled = true;
            resultEl.textContent = '🎉 You tapped 5 times! Tapping champion.';
          }
        });
      }
    },
    {
      name: 'Pick a card',
      init(container, resultEl) {
        const suits = ['♠','♥','♦','♣'];
        const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
        const winningCard = `${values[Math.floor(Math.random()*values.length)]}${suits[Math.floor(Math.random()*suits.length)]}`;
        container.innerHTML = `
          <div style="font-size:1rem;margin-bottom:12px;">Pick a random card — match the lucky one!</div>
          <button class="game-btn" id="cardBtn" style="max-width:200px;">🎴 DRAW A CARD</button>
        `;
        const btn = container.querySelector('#cardBtn');
        btn.addEventListener('click', () => {
          const myCard = `${values[Math.floor(Math.random()*values.length)]}${suits[Math.floor(Math.random()*suits.length)]}`;
          resultEl.textContent = myCard === winningCard
            ? `🎉 You drew ${myCard} — LUCKY MATCH!`
            : `You drew ${myCard}. Lucky card was ${winningCard}.`;
          btn.disabled = true;
        });
      }
    }
  ];

  /* -----------------------------------------------------------
     DOM REFS
  ----------------------------------------------------------- */
  const loadingEl     = document.getElementById('loading');
  const mainContent   = document.getElementById('mainContent');
  const quoteText     = document.getElementById('quoteText');
  const quoteAuthor   = document.getElementById('quoteAuthor');
  const funnyImage    = document.getElementById('funnyImage');
  const gameArea      = document.getElementById('gameArea');
  const gameNameSpan  = document.getElementById('gameName');
  const gameResult    = document.getElementById('gameResult');

  /* -----------------------------------------------------------
     HELPERS
  ----------------------------------------------------------- */
  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function loadSession() {
    // Quote
    const q = randomItem(quotes);
    quoteText.textContent   = `“${q.text}”`;
    quoteAuthor.textContent = `— ${q.author}`;

    // Image
    funnyImage.src = randomItem(funnyImages);
    funnyImage.alt = 'funny fortune cookie';

    // Game
    const g = randomItem(games);
    gameNameSpan.textContent = g.name;
    gameArea.innerHTML   = '';
    gameResult.textContent = '';
    g.init(gameArea, gameResult);
  }

  /* -----------------------------------------------------------
     BOOT — simulate a tiny "cracking" delay, then show content
  ----------------------------------------------------------- */
  window.addEventListener('load', () => {
    // Small artificial delay so users feel the "fortune crack"
    setTimeout(() => {
      loadSession();
      loadingEl.classList.add('hidden');
      mainContent.style.display = 'block';
    }, 600);
  });

})();