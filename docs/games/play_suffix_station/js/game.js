import { getShuffledQuestions, shuffleArray } from './questions.js';
import { saveHighScore } from '../../../assets/js/scores.js';
import { unlockBadge } from '../../../assets/js/badges.js';

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
const state = {
    timerDuration: 60,
    timeRemaining: 60,
    timerInterval: null,
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalAnswered: 0,
    correctAnswers: 0,
    questions: [],
    questionIndex: 0,
    currentQuestion: null,
    selectedSuffixes: [],    // ordered list of clicked suffixes
    gamePhase: 'start'       // 'start' | 'playing' | 'gameover'
};

// ═══════════════════════════════════════════════
// DOM REFERENCES
// ═══════════════════════════════════════════════
const $ = id => document.getElementById(id);

const els = {
    // Screens
    startScreen: $('start-screen'),
    gameScreen: $('game-screen'),
    gameoverScreen: $('gameover-screen'),
    // Start
    timerInput: $('timer-input'),
    startBtn: $('start-btn'),
    // Header
    timerDisplay: $('timer-display'),
    timerBar: $('timer-bar'),
    scoreDisplay: $('score-display'),
    streakDisplay: $('streak-display'),
    // Game area
    categoryLabel: $('category-label'),
    targetPhrase: $('target-phrase'),
    baseWord: $('base-word'),
    assembledWord: $('assembled-word'),
    suffixBank: $('suffix-bank'),
    submitBtn: $('submit-btn'),
    undoBtn: $('undo-btn'),
    clearBtn: $('clear-btn'),
    feedback: $('feedback'),
    // Game over
    finalScore: $('final-score'),
    finalAccuracy: $('final-accuracy'),
    finalStreak: $('final-streak'),
    finalAnswered: $('final-answered'),
    rankTitle: $('rank-title'),
    rankDesc: $('rank-desc'),
    playAgainBtn: $('play-again-btn'),
    shareBtn: $('share-btn'),
    whatsappBtn: $('whatsapp-btn'),
    xBtn: $('x-btn'),
};

// ═══════════════════════════════════════════════
// TIMER
// ═══════════════════════════════════════════════
function startTimer() {
    state.timeRemaining = state.timerDuration;
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();

        if (state.timeRemaining <= 0) {
            clearInterval(state.timerInterval);
            endGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(state.timeRemaining / 60);
    const secs = state.timeRemaining % 60;
    els.timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

    const pct = (state.timeRemaining / state.timerDuration) * 100;
    els.timerBar.style.width = `${pct}%`;

    // Color shifts
    if (pct <= 20) {
        els.timerBar.style.background = 'var(--accent-red)';
        els.timerDisplay.classList.add('timer-critical');
    } else if (pct <= 50) {
        els.timerBar.style.background = 'linear-gradient(90deg, #F59E0B, #EF4444)';
        els.timerDisplay.classList.remove('timer-critical');
    } else {
        els.timerBar.style.background = 'var(--primary)';
        els.timerDisplay.classList.remove('timer-critical');
    }
}

// ═══════════════════════════════════════════════
// GAME FLOW
// ═══════════════════════════════════════════════
function startGame() {
    state.timerDuration = parseInt(els.timerInput.value) || 60;
    state.timerDuration = Math.max(10, Math.min(300, state.timerDuration));
    state.score = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.totalAnswered = 0;
    state.correctAnswers = 0;
    state.questions = getShuffledQuestions();
    state.questionIndex = 0;
    state.gamePhase = 'playing';

    els.startScreen.classList.add('hidden');
    els.gameoverScreen.classList.add('hidden');
    els.gameScreen.classList.remove('hidden');

    updateScoreDisplay();
    updateStreakDisplay();
    loadQuestion();
    startTimer();
}

function endGame() {
    state.gamePhase = 'gameover';
    clearInterval(state.timerInterval);

    els.gameScreen.classList.add('hidden');
    els.gameoverScreen.classList.remove('hidden');

    const accuracy = state.totalAnswered > 0
        ? Math.round((state.correctAnswers / state.totalAnswered) * 100)
        : 0;

    els.finalScore.textContent = state.score;
    els.finalAccuracy.textContent = `${accuracy}%`;
    els.finalStreak.textContent = state.bestStreak;
    els.finalAnswered.textContent = state.totalAnswered;

    const rank = getRank(state.score, accuracy);
    els.rankTitle.textContent = rank.title;
    els.rankDesc.textContent = rank.desc;

    // Save leaderboard
    saveHighScore('suffix-station', state.score);
    if (state.score >= 10) {
        unlockBadge('suffix_scientist');
    }
}

function getRank(score, accuracy) {
    if (score >= 20 && accuracy >= 90) return { title: '🏆 Vyaakarana Guru', desc: 'Grammar Master! You think in Kannada suffixes.' };
    if (score >= 15) return { title: '🔥 Sakkath Scholar', desc: 'Fantastic! The agglutination engine runs hot in your brain.' };
    if (score >= 10) return { title: '⚡ Suffix Macha', desc: 'Solid skills. You can build words like a local.' };
    if (score >= 5) return { title: '📚 Eager Learner', desc: 'Good start! Keep practicing those suffix patterns.' };
    return { title: '🌱 Fresh Tourist', desc: 'Every journey starts with Swalpa. Try again!' };
}

// ═══════════════════════════════════════════════
// QUESTION LOADING
// ═══════════════════════════════════════════════
function loadQuestion() {
    // Re-shuffle if we've exhausted the pool
    if (state.questionIndex >= state.questions.length) {
        state.questions = getShuffledQuestions();
        state.questionIndex = 0;
    }

    state.currentQuestion = state.questions[state.questionIndex];
    state.selectedSuffixes = [];
    state.questionIndex++;

    renderQuestion();
}

function renderQuestion() {
    const q = state.currentQuestion;

    els.categoryLabel.textContent = q.category;
    els.targetPhrase.textContent = q.target;
    els.baseWord.textContent = q.displayBase;
    updateAssembledWord();
    clearFeedback();

    // Render suffix buttons (shuffled)
    const shuffledOptions = shuffleArray(q.options);
    els.suffixBank.innerHTML = '';
    shuffledOptions.forEach((suffix, idx) => {
        const btn = document.createElement('button');
        btn.className = 'suffix-btn';
        btn.innerHTML = `
            <span class="choice-num">${idx + 1}</span>
            <span class="suffix-text">${suffix}</span>
        `;
        btn.dataset.suffix = suffix;
        btn.onclick = () => toggleSuffix(suffix, btn);
        els.suffixBank.appendChild(btn);
    });

    // Indicate multi-suffix question
    if (q.correct.length > 1) {
        els.categoryLabel.textContent += ' (Multi-suffix!)';
    }

    els.submitBtn.disabled = true;
}

// ═══════════════════════════════════════════════
// SUFFIX SELECTION
// ═══════════════════════════════════════════════
function toggleSuffix(suffix, btn) {
    const idx = state.selectedSuffixes.indexOf(suffix);
    if (idx > -1) {
        // Deselect
        state.selectedSuffixes.splice(idx, 1);
        btn.classList.remove('selected');
    } else {
        // Select (append)
        state.selectedSuffixes.push(suffix);
        btn.classList.add('selected');
    }

    updateAssembledWord();
    els.submitBtn.disabled = state.selectedSuffixes.length === 0;
}

function updateAssembledWord() {
    const q = state.currentQuestion;
    if (!q) return;

    let assembled = q.base;
    state.selectedSuffixes.forEach(s => {
        assembled += s;
    });

    els.assembledWord.textContent = assembled;
    els.assembledWord.className = 'assembled-word';
}

function clearSelections() {
    state.selectedSuffixes = [];
    document.querySelectorAll('.suffix-btn.selected').forEach(b => b.classList.remove('selected'));
    updateAssembledWord();
    els.submitBtn.disabled = true;
    clearFeedback();
}

function undoLastSuffix() {
    if (state.selectedSuffixes.length === 0) return;
    const removed = state.selectedSuffixes.pop();
    // Find and deselect the button
    document.querySelectorAll('.suffix-btn').forEach(btn => {
        if (btn.dataset.suffix === removed && btn.classList.contains('selected')) {
            btn.classList.remove('selected');
        }
    });
    // Handle multiple selected of the same suffix — only remove last match
    updateAssembledWord();
    els.submitBtn.disabled = state.selectedSuffixes.length === 0;
    clearFeedback();
}

// ═══════════════════════════════════════════════
// ANSWER VALIDATION
// ═══════════════════════════════════════════════
function submitAnswer() {
    const q = state.currentQuestion;
    if (!q || state.selectedSuffixes.length === 0) return;

    // Build assembled string (using base, not displayBase)
    let assembled = q.base;
    state.selectedSuffixes.forEach(s => {
        assembled += s;
    });

    state.totalAnswered++;

    // Check if the suffix sequence matches exactly
    const isCorrect = state.selectedSuffixes.length === q.correct.length &&
        state.selectedSuffixes.every((s, i) => s === q.correct[i]);

    if (isCorrect) {
        handleCorrect(q);
    } else {
        handleIncorrect(q);
    }
}

function handleCorrect(q) {
    state.score++;
    state.correctAnswers++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;

    updateScoreDisplay();
    updateStreakDisplay();

    // Visual feedback
    els.assembledWord.className = 'assembled-word correct-flash';
    showFeedback('✓ Sari!', 'correct', q.hint);

    // Brief pause then next question
    setTimeout(() => {
        if (state.gamePhase === 'playing') loadQuestion();
    }, 800);
}

function handleIncorrect(q) {
    state.streak = 0;
    updateStreakDisplay();

    // Visual feedback
    els.assembledWord.className = 'assembled-word incorrect-flash';
    showFeedback(`✗ Thappu! → ${q.result}`, 'incorrect', q.hint);

    // Slightly longer pause to show correct answer
    setTimeout(() => {
        if (state.gamePhase === 'playing') loadQuestion();
    }, 1500);
}

// ═══════════════════════════════════════════════
// UI UPDATES
// ═══════════════════════════════════════════════
function updateScoreDisplay() {
    els.scoreDisplay.textContent = state.score;
}

function updateStreakDisplay() {
    if (state.streak >= 2) {
        els.streakDisplay.textContent = `🔥 ${state.streak}`;
        els.streakDisplay.classList.add('streak-active');
    } else {
        els.streakDisplay.textContent = '';
        els.streakDisplay.classList.remove('streak-active');
    }
}

function showFeedback(text, type, hint) {
    els.feedback.textContent = text;
    els.feedback.className = `feedback ${type}`;
    if (hint) {
        els.feedback.innerHTML += `<span class="hint">${hint}</span>`;
    }
}

function clearFeedback() {
    els.feedback.textContent = '';
    els.feedback.className = 'feedback';
}

// ═══════════════════════════════════════════════
// SHARING
// ═══════════════════════════════════════════════
function shareResult(platform) {
    const accuracy = state.totalAnswered > 0
        ? Math.round((state.correctAnswers / state.totalAnswered) * 100)
        : 0;
    const rank = getRank(state.score, accuracy);

    const text = `🧩 Suffix Station Score: ${state.score} points!\n\nRank: ${rank.title}\n🎯 Accuracy: ${accuracy}%\n🔥 Best Streak: ${state.bestStreak}\n\nCan you build Kannada words faster? Try it on SWALPA.org!\n#SWALPA #LearnKannada #SuffixStation`;
    const url = 'https://swalpa.org/games/suffix_station/';
    const fullMessage = `${text}\n\n${url}`;

    if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(fullMessage)}`, '_blank');
    } else if (platform === 'x') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullMessage)}`, '_blank');
    } else if (platform === 'clipboard') {
        navigator.clipboard.writeText(fullMessage).then(() => {
            els.shareBtn.textContent = '✅ Copied!';
            setTimeout(() => els.shareBtn.textContent = '📋 Copy Result', 2000);
        });
    }
}

// ═══════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════
els.startBtn.onclick = startGame;
els.submitBtn.onclick = submitAnswer;
els.undoBtn.onclick = undoLastSuffix;
els.clearBtn.onclick = clearSelections;
els.playAgainBtn.onclick = () => {
    els.gameoverScreen.classList.add('hidden');
    els.startScreen.classList.remove('hidden');
};
els.shareBtn.onclick = () => shareResult('clipboard');
els.whatsappBtn.onclick = () => shareResult('whatsapp');
els.xBtn.onclick = () => shareResult('x');

// Keyboard shortcut: Enter to submit
document.addEventListener('keydown', e => {
    if (state.gamePhase !== 'playing') return;
    if (e.key === 'Enter') submitAnswer();
    if (e.key === 'Backspace') undoLastSuffix();
});
