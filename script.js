(function () {
  /* ============================================================
     FUTURE-PREDICTING FORTUNES (positive / good things ahead)
     ============================================================ */
  const quotes = [
    { text: "A golden opportunity will find you this week — say yes.", author: "Your Fortune" },
    { text: "Great wealth and warm friendships are heading your way.", author: "Your Fortune" },
    { text: "The project you've been dreaming about will soon succeed.", author: "Your Fortune" },
    { text: "Someone you admire will soon offer you a big chance.", author: "Your Fortune" },
    { text: "Your kindness will return to you multiplied tenfold.", author: "Your Fortune" },
    { text: "A joyful surprise is waiting for you within 7 days.", author: "Your Fortune" },
    { text: "Your creativity will soon open a door you thought was closed.", author: "Your Fortune" },
    { text: "Luck is quietly arranging something wonderful for you.", author: "Your Fortune" },
    { text: "A long-awaited message will bring you great happiness.", author: "Your Fortune" },
    { text: "You will soon meet someone who changes your path for the better.", author: "Your Fortune" },
    { text: "Your hard work is about to be rewarded in an unexpected way.", author: "Your Fortune" },
    { text: "Health, peace, and abundance are moving toward you now.", author: "Your Fortune" },
    { text: "A door you knock on this month will open into something amazing.", author: "Your Fortune" },
    { text: "Your future holds a journey that will fill your heart.", author: "Your Fortune" },
    { text: "The seeds you plant today will bloom into great success.", author: "Your Fortune" },
    { text: "Very soon, you'll laugh about something you worry about today.", author: "Your Fortune" },
    { text: "A stranger's kindness will remind you the world is good.", author: "Your Fortune" },
    { text: "Your ideas are brighter than you realize — share them boldly.", author: "Your Fortune" },
    { text: "A quiet wish you've kept secret is about to come true.", author: "Your Fortune" },
    { text: "The next chapter of your life will be your best one yet.", author: "Your Fortune" },
    { text: "Money, love, and good health are all circling back to you.", author: "Your Fortune" },
    { text: "Someone is quietly rooting for you — their help arrives soon.", author: "Your Fortune" },
    { text: "An unexpected gift will arrive just when you need it most.", author: "Your Fortune" },
    { text: "Your patience will soon be rewarded beyond what you imagined.", author: "Your Fortune" },
    { text: "A bright new friendship is about to enter your life.", author: "Your Fortune" },
    { text: "The universe is aligning things in your favor right now.", author: "Your Fortune" },
    { text: "Your next big idea will be the one that changes everything.", author: "Your Fortune" },
    { text: "You will soon feel proud of a choice you make today.", author: "Your Fortune" },
    { text: "Good news is travelling toward you faster than you think.", author: "Your Fortune" },
    { text: "Your smile will open a door that nothing else could.", author: "Your Fortune" }
  ];

  /* ============================================================
     POSITIVE / FUN ILLUSTRATIONS
     ============================================================ */
  const funnyImages = [
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23fff3d1"/%3E%3Ctext x="200" y="110" font-size="90" text-anchor="middle"%3E🌟%3C/text%3E%3Ctext x="200" y="160" font-size="20" text-anchor="middle" fill="%23b16f1e"%3EYour star is rising%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23ffe0f0"/%3E%3Ctext x="200" y="110" font-size="90" text-anchor="middle"%3E💖%3C/text%3E%3Ctext x="200" y="160" font-size="20" text-anchor="middle" fill="%23b16f1e"%3ELove is on the way%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23e6ffe6"/%3E%3Ctext x="200" y="110" font-size="90" text-anchor="middle"%3E🍀%3C/text%3E%3Ctext x="200" y="160" font-size="20" text-anchor="middle" fill="%232a7d32"%3ELuck is with you%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23e6f0ff"/%3E%3Ctext x="200" y="110" font-size="90" text-anchor="middle"%3E🌈%3C/text%3E%3Ctext x="200" y="160" font-size="20" text-anchor="middle" fill="%23334a9c"%3EBright days ahead%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23fff8e1"/%3E%3Ctext x="200" y="110" font-size="90" text-anchor="middle"%3E🏆%3C/text%3E%3Ctext x="200" y="160" font-size="20" text-anchor="middle" fill="%23b16f1e"%3EYou will win%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23e0f7fa"/%3E%3Ctext x="200" y="110" font-size="90" text-anchor="middle"%3E🚀%3C/text%3E%3Ctext x="200" y="160" font-size="20" text-anchor="middle" fill="%23007c8a"%3EYour success is launching%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23fff0e6"/%3E%3Ctext x="200" y="110" font-size="90" text-anchor="middle"%3E💰%3C/text%3E%3Ctext x="200" y="160" font-size="20" text-anchor="middle" fill="%23a1520e"%3EAbundance is coming%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"%3E%3Crect width="400" height="180" fill="%23f3e5f5"/%3E%3Ctext x="200" y="110" font-size="90" text-anchor="middle"%3E✨%3C/text%3E%3Ctext x="200" y="160" font-size="20" text-anchor="middle" fill="%236a1b9a"%3EMagic is unfolding%3C/text%3E%3C/svg%3E'
  ];

  /* ============================================================
     GAME LIST — pulled from window.GameXxx objects
     (each file in /games/ registers itself here)
     ============================================================ */
  const gameKeys = ['GameSnakeLadder', 'GameLudo', 'GameRacing', 'GameShooter', 'GameCandy'];

  /* ============================================================
     DOM REFS
     ============================================================ */
  const loadingEl    = document.getElementById('loading');
  const mainContent  = document.getElementById('mainContent');
  const quoteText    = document.getElementById('quoteText');
  const quoteAuthor  = document.getElementById('quoteAuthor');
  const funnyImage   = document.getElementById('funnyImage');
  const gameArea     = document.getElementById('gameArea');
  const gameNameSpan = document.getElementById('gameName');
  const gameResult   = document.getElementById('gameResult');

  /* ============================================================
     HELPERS
     ============================================================ */
  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function pickAvailableGames() {
    return gameKeys
      .map(k => window[k])
      .filter(g => g && typeof g.init === 'function' && typeof g.name === 'string');
  }

  function loadSession() {
    /* --- quote --- */
    const q = randomItem(quotes);
    quoteText.textContent   = `“${q.text}”`;
    quoteAuthor.textContent = `— ${q.author}`;

    /* --- image --- */
    funnyImage.src = randomItem(funnyImages);
    funnyImage.alt = 'positive fortune illustration';

    /* --- game --- */
    const available = pickAvailableGames();
    if (available.length === 0) {
      gameNameSpan.textContent = 'unavailable';
      gameArea.innerHTML = '<div style="color:#ff8888">No games loaded. Check /games/ scripts.</div>';
      return;
    }
    const g = randomItem(available);
    gameNameSpan.textContent = g.name;
    gameArea.innerHTML = '';
    gameResult.textContent = '';
    try {
      g.init(gameArea, gameResult);
    } catch (err) {
      console.error('Game init failed:', err);
      gameArea.innerHTML = '<div style="color:#ff8888">Game failed to load.</div>';
    }
  }

  /* ============================================================
     BOOT — tiny "cracking the cookie" delay, then show content
     ============================================================ */
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadSession();
      loadingEl.classList.add('hidden');
      mainContent.style.display = 'block';
    }, 600);
  });

})();