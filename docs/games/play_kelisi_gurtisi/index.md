---
title: Kelisi & Gurtisi (Listen & Identify)
hide:
  - navigation
  - toc
---

<div id="game-container" class="swalpa-game-container">
    
    <!-- Start Screen -->
    <div id="game-start-screen" class="game-card animate-fade-in">
        <div class="game-header">
            <span class="game-icon">🎧</span>
            <h1>Kelisi & Gurtisi</h1>
            <p>Listen & Identify</p>
        </div>
        <div class="game-body">
            <p class="game-description">
                How well can you recognize spoken Kannada? Listen to the native audio and pick the correct English translation before time runs out.
            </p>
            <div class="game-meta">
                <span>⏱️ 10 Rounds</span>
                <span>🔥 Speed Multiplier</span>
            </div>
            <button id="start-game-btn" class="primary-btn">Banni! (Let's Go)</button>
        </div>
    </div>

    <!-- Play Screen -->
    <div id="game-play-screen" class="game-card hidden">
        <div class="game-stats">
            <div class="stat-item">ROUND <span id="current-round">1</span>/10</div>
            <div class="stat-item">SCORE <span id="current-score">0</span></div>
        </div>
        
        <div class="timer-container">
            <div id="timer-bar" class="timer-bar"></div>
        </div>

        <div class="audio-prompt-container">
            <button class="audio-play-btn" onclick="playGameAudio()">
                <span class="icon">🔊</span>
                Replay Sound
            </button>
            <p class="prompt-text">What did they say?</p>
        </div>

        <div id="choices-container" class="choices-grid">
            <!-- JS Injected Choices -->
        </div>

        <div id="game-feedback" class="game-feedback"></div>
    </div>

    <!-- Over Screen -->
    <div id="game-over-screen" class="game-card hidden animate-fade-in">
        <div class="game-header">
            <h1>Game Over!</h1>
            <p>Your Bengaluru hearing is sharp!</p>
        </div>
        <div class="score-display">
            <span class="label">FINAL SCORE</span>
            <div id="final-score" class="value">0</div>
        </div>
        <div class="game-actions">
            <button onclick="location.reload()" class="primary-btn">Play Again</button>
            <a href="/games/" class="secondary-btn">Back to Games</a>
        </div>
    </div>

</div>

<style>
.swalpa-game-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
}

.game-card {
    background: var(--md-code-bg-color);
    border-radius: 20px;
    padding: 40px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.05);
}

.game-header h1 {
    margin: 10px 0 5px 0;
    font-size: 2.2rem;
    color: var(--md-primary-fg-color);
}

.game-header p {
    font-size: 1.1rem;
    color: #94A3B8;
    margin-bottom: 20px;
}

.game-icon {
    font-size: 4rem;
    display: block;
}

.game-meta {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
    font-size: 0.9rem;
    color: #94A3B8;
}

.audio-prompt-container {
    margin: 30px 0;
}

.audio-play-btn {
    background: var(--md-primary-fg-color);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.audio-play-btn:hover {
    transform: scale(1.05);
    background: var(--md-primary-fg-color--dark);
}

.choices-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 30px;
}

.choice-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--md-typeset-color);
    padding: 20px;
    border-radius: 12px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
}

.choice-btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.1);
    border-color: var(--md-primary-fg-color);
}

.choice-btn.correct {
    background: #10B981 !important;
    color: white !important;
    border-color: #059669 !important;
}

.choice-btn.wrong {
    background: #EF4444 !important;
    color: white !important;
    border-color: #DC2626 !important;
}

.timer-container {
    width: 100%;
    height: 8px;
    background: rgba(0,0,0,0.2);
    border-radius: 4px;
    overflow: hidden;
    margin: 20px 0;
}

.timer-bar {
    height: 100%;
    background: var(--md-accent-fg-color);
    width: 100%;
    transition: width 0.1s linear;
}

.game-stats {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: #94A3B8;
    margin-bottom: 10px;
}

.game-feedback {
    margin-top: 20px;
    height: 24px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.2s;
}

.game-feedback.visible {
    opacity: 1;
}

.game-feedback.correct { color: #10B981; }
.game-feedback.wrong { color: #EF4444; }

.score-display {
    margin: 30px 0;
}

.score-display .value {
    font-size: 4rem;
    font-weight: 900;
    color: var(--md-primary-fg-color);
}

@media (max-width: 500px) {
    .choices-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script src="/assets/js/kelisi_gurtisi.js"></script>
