// ============================================================
// JOGO DA MEMÓRIA KRENAK - MOTOR PRINCIPAL DO JOGO
// 4 Versos Pré-definidos: 8 pares Verso 1, 8 pares Verso 2,
// 8 pares Verso 3 e 7 pares Verso 4.
// Sem sintetizador de voz (áudio sonoro puro).
// ============================================================

class MemoryGame {
  constructor() {
    this.audio = new window.AudioManager();
    this.confetti = new window.ConfettiEffect();

    // Game Configuration State
    this.deckSize = 31; // default: 31 pairs (todas as 62 cartas)
    this.playerCount = 2; // default: 2 players
    
    // Players default profiles
    this.playerProfiles = [
      { name: "Jogador 1", avatar: "🌿", color: "#e76f51" },
      { name: "Jogador 2", avatar: "🐆", color: "#2a9d8f" },
      { name: "Jogador 3", avatar: "🦅", color: "#e9c46a" },
      { name: "Jogador 4", avatar: "☀️", color: "#9d4edd" }
    ];

    // Live Game State
    this.players = [];
    this.currentPlayerIdx = 0;
    this.cards = [];
    this.flippedCards = [];
    this.isBoardLocked = false;
    this.matchedPairsCount = 0;
    this.totalPairs = 0;
    this.turnStreak = 0;

    // Kiosk Idle Timer (3 minutes)
    this.idleTimeout = null;
    this.idleWarningTimeout = null;
    this.idleTimeSeconds = 180; // 3 min
    this.idleCountdownVal = 20;

    // DOM Elements
    this.dom = {
      board: document.getElementById('cards-grid'),
      turnBanner: document.getElementById('turn-banner'),
      activePlayerAvatar: document.getElementById('active-player-avatar'),
      activePlayerName: document.getElementById('active-player-name'),
      activeTurnMessage: document.getElementById('active-turn-message'),
      scoreboard: document.getElementById('players-scoreboard'),
      matchToast: document.getElementById('match-toast'),
      toastContent: document.getElementById('toast-content'),
      
      // Modals
      setupModal: document.getElementById('setup-modal'),
      victoryModal: document.getElementById('victory-modal'),
      rulesModal: document.getElementById('rules-modal'),
      dictionaryModal: document.getElementById('dictionary-modal'),
      idleModal: document.getElementById('idle-modal'),
      
      // Action Buttons
      btnFullscreen: document.getElementById('btn-fullscreen'),
      btnAudio: document.getElementById('btn-audio'),
      btnRestart: document.getElementById('btn-restart'),
      btnRules: document.getElementById('btn-rules'),
      btnDict: document.getElementById('btn-dict'),
      btnStartGame: document.getElementById('btn-start-game'),
      btnPlayAgain: document.getElementById('btn-play-again'),
      btnNewSettings: document.getElementById('btn-new-settings'),
      
      // Modal Close Buttons
      closeRules: document.getElementById('close-rules-btn'),
      closeDict: document.getElementById('close-dict-btn'),
      idleStayBtn: document.getElementById('idle-stay-btn'),
      idleCountdown: document.getElementById('idle-countdown')
    };

    this.bindEvents();
    this.initKioskActivityTracker();
    this.openSetupModal();
    this.populateDictionary();
  }

  // Bind All UI Events
  bindEvents() {
    // Start game button
    this.dom.btnStartGame.addEventListener('click', () => {
      this.collectSetupSettings();
      this.closeModal(this.dom.setupModal);
      this.startNewGame();
    });

    // Header buttons
    this.dom.btnRestart.addEventListener('click', () => this.openSetupModal());
    this.dom.btnRules.addEventListener('click', () => this.openModal(this.dom.rulesModal));
    this.dom.closeRules.addEventListener('click', () => this.closeModal(this.dom.rulesModal));
    
    this.dom.btnDict.addEventListener('click', () => this.openModal(this.dom.dictionaryModal));
    this.dom.closeDict.addEventListener('click', () => this.closeModal(this.dom.dictionaryModal));

    // Victory modal buttons
    this.dom.btnPlayAgain.addEventListener('click', () => {
      this.closeModal(this.dom.victoryModal);
      this.startNewGame();
    });

    this.dom.btnNewSettings.addEventListener('click', () => {
      this.closeModal(this.dom.victoryModal);
      this.openSetupModal();
    });

    // Fullscreen toggle
    this.dom.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());

    // Audio sound toggle
    this.dom.btnAudio.addEventListener('click', () => {
      const active = this.audio.toggleSound();
      this.dom.btnAudio.classList.toggle('active', active);
      this.dom.btnAudio.querySelector('.icon').textContent = active ? '🔊' : '🔇';
    });

    // Idle modal stay button
    this.dom.idleStayBtn.addEventListener('click', () => {
      this.closeModal(this.dom.idleModal);
      this.resetIdleTimer();
    });

    // Setup screen selectors
    this.setupPillSelectors();
  }

  // Setup pill click handlers
  setupPillSelectors() {
    // Player Count Pills
    document.querySelectorAll('.player-count-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.player-count-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        this.playerCount = parseInt(pill.dataset.players);
        this.updatePlayerInputsVisibility();
      });
    });

    // Difficulty / Deck Size Pills
    document.querySelectorAll('.difficulty-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.difficulty-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        this.deckSize = parseInt(pill.dataset.pairs);
      });
    });
  }

  updatePlayerInputsVisibility() {
    for (let i = 1; i <= 4; i++) {
      const box = document.getElementById(`player-${i}-input-box`);
      if (box) {
        box.style.display = i <= this.playerCount ? 'flex' : 'none';
      }
    }
  }

  collectSetupSettings() {
    this.players = [];
    for (let i = 1; i <= this.playerCount; i++) {
      const nameInput = document.getElementById(`player-${i}-name`);
      const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : this.playerProfiles[i - 1].name;
      this.players.push({
        id: i,
        name: name,
        avatar: this.playerProfiles[i - 1].avatar,
        color: this.playerProfiles[i - 1].color,
        score: 0,
        pairs: []
      });
    }
  }

  // Start / Restart Game
  startNewGame() {
    this.audio.init();
    this.currentPlayerIdx = 0;
    this.matchedPairsCount = 0;
    this.turnStreak = 0;
    this.flippedCards = [];
    this.isBoardLocked = false;
    this.resetIdleTimer();

    // Reset scores
    this.players.forEach(p => {
      p.score = 0;
      p.pairs = [];
    });

    // Build Deck with fixed card backs
    this.buildDeck();
    this.renderBoard();
    this.updateTurnDisplay();
    this.renderScoreboard();
  }

  buildDeck() {
    // Select pairs according to deck size
    // KRENAK_CARDS_DATA has 31 pairs:
    // - 1 a 8: Grupo 1 (Verso 1)
    // - 9 a 16: Grupo 2 (Verso 2)
    // - 17 a 24: Grupo 3 (Verso 3)
    // - 25 a 31: Grupo 4 (Verso 4)
    const allPairs = [...KRENAK_CARDS_DATA];
    let selectedPairs = [];

    if (this.deckSize === 8) {
      // 8 pares do Grupo 1 (Verso 1)
      selectedPairs = allPairs.slice(0, 8);
    } else if (this.deckSize === 16) {
      // 16 pares (8 do Grupo 1 + 8 do Grupo 2)
      selectedPairs = allPairs.slice(0, 16);
    } else if (this.deckSize === 24) {
      // 24 pares (8 Grupo 1 + 8 Grupo 2 + 8 Grupo 3)
      selectedPairs = allPairs.slice(0, 24);
    } else {
      // Todas as 31 cartas (8 + 8 + 8 + 7)
      selectedPairs = allPairs.slice(0, 31);
    }

    this.totalPairs = selectedPairs.length;

    // Create 2 cards per pair (1 Krenak + 1 Portuguese)
    // Both cards in each pair share the EXACT same pre-defined back_img!
    const deck = [];
    selectedPairs.forEach(pair => {
      deck.push({
        pairId: pair.id,
        lang: 'krenak',
        word: pair.krenak,
        img: `assets/cards/${pair.krenak_img}`,
        back_img: pair.back_img,
        back_group: pair.back_group,
        matched: false,
        krenakWord: pair.krenak,
        ptWord: pair.portuguese
      });
      deck.push({
        pairId: pair.id,
        lang: 'pt',
        word: pair.portuguese,
        img: `assets/cards/${pair.portuguese_img}`,
        back_img: pair.back_img,
        back_group: pair.back_group,
        matched: false,
        krenakWord: pair.krenak,
        ptWord: pair.portuguese
      });
    });

    // Embaralhar as cartas
    this.shuffle(deck);
    this.cards = deck;
  }

  // Render cards onto the DOM
  renderBoard() {
    this.dom.board.innerHTML = '';
    
    // Assign grid class based on total cards
    const totalCards = this.cards.length;
    this.dom.board.className = 'cards-grid';
    if (totalCards <= 16) this.dom.board.classList.add('grid-12');
    else if (totalCards <= 32) this.dom.board.classList.add('grid-24');
    else if (totalCards <= 48) this.dom.board.classList.add('grid-40');
    else this.dom.board.classList.add('grid-62');

    this.cards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card';
      cardEl.dataset.index = index;

      // Notice: card.back_img is specific to this card's pair!
      cardEl.innerHTML = `
        <div class="card-face card-back">
          <img src="${card.back_img}" alt="Verso da Carta Krenak - Grupo ${card.back_group}" loading="lazy">
        </div>
        <div class="card-face card-front">
          <span class="lang-tag ${card.lang === 'krenak' ? 'lang-krenak' : 'lang-pt'}">
            ${card.lang === 'krenak' ? 'Krenak' : 'Português'}
          </span>
          <img src="${card.img}" alt="${card.word}" loading="lazy">
        </div>
      `;

      cardEl.addEventListener('click', () => this.handleCardClick(index, cardEl));
      this.dom.board.appendChild(cardEl);
    });
  }

  // Card Click Interaction
  handleCardClick(index, cardEl) {
    this.resetIdleTimer();

    // Conditions where click should be ignored
    if (this.isBoardLocked) return;
    if (cardEl.classList.contains('flipped')) return;
    if (cardEl.classList.contains('matched')) return;
    if (this.flippedCards.length >= 2) return;

    // Flip card
    this.audio.playFlip();
    cardEl.classList.add('flipped');
    this.flippedCards.push({ index, cardEl, data: this.cards[index] });

    if (this.flippedCards.length === 2) {
      this.isBoardLocked = true;
      this.checkForMatch();
    }
  }

  // Match Evaluation Logic
  checkForMatch() {
    const [card1, card2] = this.flippedCards;
    const isMatch = (card1.data.pairId === card2.data.pairId) && (card1.data.lang !== card2.data.lang);

    if (isMatch) {
      this.handleMatchSuccess(card1, card2);
    } else {
      this.handleMatchFail(card1, card2);
    }
  }

  // Match Success (Acertou!)
  handleMatchSuccess(card1, card2) {
    const activePlayer = this.players[this.currentPlayerIdx];
    this.turnStreak++;
    activePlayer.score++;
    this.matchedPairsCount++;

    const pairData = {
      krenak: card1.data.krenakWord,
      portuguese: card1.data.ptWord
    };
    activePlayer.pairs.push(pairData);

    // Visual match indicator
    setTimeout(() => {
      card1.cardEl.classList.add('matched');
      card2.cardEl.classList.add('matched');
      card1.cardEl.style.setProperty('--match-color', activePlayer.color);
      card2.cardEl.style.setProperty('--match-color', activePlayer.color);

      this.audio.playMatch();

      // Toast banner
      this.showToast(`🎉 PAR ENCONTRADO! <strong>${pairData.krenak}</strong> = <strong>${pairData.portuguese}</strong> (+1 ponto para ${activePlayer.name})`);

      // Update scoreboard
      this.renderScoreboard();

      // Check for Game Victory
      if (this.matchedPairsCount === this.totalPairs) {
        setTimeout(() => this.triggerVictory(), 1000);
      } else {
        // According to game rules:
        // "✅ O jogador fica com o par / ✅ Joga novamente"
        this.flippedCards = [];
        this.isBoardLocked = false;
        this.updateTurnDisplay(true); // show "Joga novamente!"
      }
    }, 450);
  }

  // Match Fail (Errou!)
  handleMatchFail(card1, card2) {
    this.turnStreak = 0;
    this.audio.playWrong();

    // Show temporary message
    this.dom.activeTurnMessage.textContent = "Ops! Não foi dessa vez. Memorize as cartas...";

    // Pause so players can memorize the card positions
    setTimeout(() => {
      card1.cardEl.classList.remove('flipped');
      card2.cardEl.classList.remove('flipped');
      this.flippedCards = [];
      this.isBoardLocked = false;

      // Pass turn to next player
      this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
      this.audio.playTurnChange();
      this.updateTurnDisplay();
      this.renderScoreboard();
    }, 1250);
  }

  // Update Turn Banner & Header
  updateTurnDisplay(playingAgain = false) {
    const player = this.players[this.currentPlayerIdx];
    this.dom.activePlayerAvatar.textContent = player.avatar;
    this.dom.activePlayerAvatar.style.background = player.color;
    this.dom.activePlayerName.textContent = player.name;

    if (playingAgain) {
      this.dom.activeTurnMessage.innerHTML = `🔥 <span style="color: #ffd166; font-weight:800;">Acertou o par!</span> Jogue novamente!`;
    } else {
      this.dom.activeTurnMessage.textContent = `Vire 2 cartas para encontrar o par Krenak + Português!`;
    }
  }

  // Scoreboard Rendering
  renderScoreboard() {
    this.dom.scoreboard.innerHTML = '';
    this.players.forEach((p, idx) => {
      const pill = document.createElement('div');
      pill.className = `player-score-pill ${idx === this.currentPlayerIdx ? 'active-player' : ''}`;
      pill.style.borderLeftColor = p.color;
      pill.innerHTML = `
        <span class="player-pill-avatar">${p.avatar}</span>
        <span class="player-pill-name" style="color: ${p.color}">${p.name}</span>
        <span class="player-pill-pairs">${p.score} ${p.score === 1 ? 'par' : 'pares'}</span>
      `;
      this.dom.scoreboard.appendChild(pill);
    });
  }

  // Toast Notification
  showToast(htmlText) {
    this.dom.toastContent.innerHTML = htmlText;
    this.dom.matchToast.classList.add('show');
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.matchToast.classList.remove('show');
    }, 2800);
  }

  // Victory Celebration
  triggerVictory() {
    this.audio.playVictory();
    this.confetti.start(6000);

    // Sort players by score
    const sorted = [...this.players].sort((a, b) => b.score - a.score);
    const podiumEl = document.getElementById('victory-podium');
    podiumEl.innerHTML = '';

    const isTie = sorted.length > 1 && sorted[0].score === sorted[1].score;

    sorted.forEach((p, rank) => {
      const rankBox = document.createElement('div');
      rankBox.className = `podium-rank ${rank === 0 ? 'first-place' : ''}`;
      
      let medal = '🏅';
      if (rank === 0) medal = '🥇';
      else if (rank === 1) medal = '🥈';
      else if (rank === 2) medal = '🥉';

      rankBox.innerHTML = `
        <div class="rank-player-info">
          <span>${medal}</span>
          <span style="font-size:1.4rem;">${p.avatar}</span>
          <span style="color: ${p.color};">${p.name}</span>
        </div>
        <div class="rank-pairs-badge">
          ${p.score} ${p.score === 1 ? 'par encontrado' : 'pares encontrados'}
        </div>
      `;
      podiumEl.appendChild(rankBox);
    });

    const titleEl = document.getElementById('victory-title');
    const msgEl = document.getElementById('victory-message');
    if (sorted.length === 1) {
      titleEl.textContent = "🎉 PARABÉNS! VOCÊ COMPLETOU!";
      msgEl.textContent = `Você encontrou todos os ${this.totalPairs} pares de palavras Krenak!`;
    } else if (isTie) {
      titleEl.textContent = "🤝 EMPATE EMOCIONANTE!";
      msgEl.textContent = `Grande jogo! Os primeiros colocados empataram com ${sorted[0].score} pares!`;
    } else {
      titleEl.textContent = `🏆 VITÓRIA DE ${sorted[0].name.toUpperCase()}!`;
      msgEl.textContent = `Parabéns pela excelente memória e conhecimento das palavras Krenak!`;
    }

    this.openModal(this.dom.victoryModal);
  }

  // Populate Educational Dictionary
  populateDictionary() {
    const grid = document.getElementById('dictionary-grid');
    if (!grid) return;
    grid.innerHTML = '';

    KRENAK_CARDS_DATA.forEach(item => {
      const card = document.createElement('div');
      card.className = 'dict-item';
      card.innerHTML = `
        <div style="display:flex; gap:6px; align-items:center; justify-content:center;">
          <img src="assets/cards/${item.krenak_img}" alt="${item.krenak}" style="width:65px; height:65px;">
          <img src="${item.back_img}" alt="Verso" style="width:65px; height:65px; border-radius:8px; object-fit:cover;">
        </div>
        <div class="dict-krenak">${item.krenak}</div>
        <div class="dict-pt">🇧🇷 ${item.portuguese}</div>
        <div style="font-size:0.75rem; color:#ffd166; font-weight:700;">Verso: Grupo ${item.back_group}</div>
      `;
      grid.appendChild(card);
    });
  }

  // Kiosk Inactivity Reset
  initKioskActivityTracker() {
    ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
      window.addEventListener(evt, () => this.resetIdleTimer(), { passive: true });
    });
  }

  resetIdleTimer() {
    if (this.idleTimeout) clearTimeout(this.idleTimeout);
    if (this.idleWarningTimeout) clearInterval(this.idleWarningTimeout);

    // Inactivity warning triggers after idleTimeSeconds
    this.idleTimeout = setTimeout(() => {
      this.triggerIdleWarning();
    }, this.idleTimeSeconds * 1000);
  }

  triggerIdleWarning() {
    if (!this.dom.setupModal.classList.contains('hidden')) return;

    this.idleCountdownVal = 20;
    this.dom.idleCountdown.textContent = this.idleCountdownVal;
    this.openModal(this.dom.idleModal);

    this.idleWarningTimeout = setInterval(() => {
      this.idleCountdownVal--;
      this.dom.idleCountdown.textContent = this.idleCountdownVal;
      if (this.idleCountdownVal <= 0) {
        clearInterval(this.idleWarningTimeout);
        this.closeModal(this.dom.idleModal);
        this.closeModal(this.dom.victoryModal);
        this.openSetupModal();
      }
    }, 1000);
  }

  // Fullscreen Handler
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn("Fullscreen request error:", err);
      });
      this.dom.btnFullscreen.classList.add('active');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.dom.btnFullscreen.classList.remove('active');
      }
    }
  }

  // Modal helpers
  openModal(modalEl) {
    if (modalEl) modalEl.classList.remove('hidden');
  }

  closeModal(modalEl) {
    if (modalEl) modalEl.classList.add('hidden');
  }

  openSetupModal() {
    this.openModal(this.dom.setupModal);
    this.updatePlayerInputsVisibility();
  }

  // Utility: Fisher-Yates array shuffle
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

// Start game instance on DOM loaded
window.addEventListener('DOMContentLoaded', () => {
  window.game = new MemoryGame();
});
