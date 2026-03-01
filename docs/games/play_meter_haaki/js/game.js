import { DRIVERS, LEVELS, RANKS } from './data.js';
import { saveHighScore } from '../../../assets/js/scores.js';
import { unlockBadge } from '../../../assets/js/badges.js';
import { logActivity } from '../../../assets/js/activity.js';

const state = {
    respect: 25,
    wallet: 500,
    patience: 100,
    level: 1,
    currentStep: 'engagement',
    activeDriver: null,
    history: [],
    undosRemaining: 3,
    isTypewriting: false
};

let patienceInterval = null;

// Initialize the game
function init() {
    loadGame();
    setupEventListeners();
    updateUI();
    updateBackground();

    // Check if we are starting a level or in a dialogue
    if (state.currentStep === 'engagement' && state.level === 1) {
        // Show start screen if it's the very beginning
        const sceneIntro = document.querySelector('.scene-intro');
        if (sceneIntro) sceneIntro.classList.remove('hidden');
    } else {
        showDialogue(state.currentStep);
    }
}

function setupEventListeners() {
    // Keyboard shortcuts 1-4 for choices
    document.addEventListener('keydown', (e) => {
        if (state.isTypewriting) return;
        const key = e.key;
        if (['1', '2', '3', '4'].includes(key)) {
            const index = parseInt(key) - 1;
            const choices = document.querySelectorAll('.choice-btn');
            if (choices[index]) {
                choices[index].click();
            }
        }
    });

    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.onclick = () => {
            updateBackground();
            showDialogue('engagement');
        };
    }
}

function updateUI() {
    const respectMeter = document.getElementById('respect-meter');
    const respectRank = document.getElementById('respect-rank');
    const walletValue = document.getElementById('wallet-value');
    const patienceMeter = document.getElementById('patience-meter');
    const undoBtn = document.getElementById('undo-btn');

    // Smooth transition for meters
    respectMeter.style.width = `${state.respect}%`;
    walletValue.innerText = `₹${Math.floor(state.wallet)}`;
    patienceMeter.style.width = `${state.patience}%`;

    // Dynamic Rank Labels
    if (state.respect <= 25) respectRank.innerText = "Tourist";
    else if (state.respect <= 50) respectRank.innerText = "Resident";
    else if (state.respect <= 85) respectRank.innerText = "Local";
    else respectRank.innerText = "Macha";

    if (undoBtn) {
        const canUndo = state.history.length > 0 && state.undosRemaining > 0;
        undoBtn.disabled = !canUndo;
        undoBtn.innerText = `↩ Undo (${state.undosRemaining} left)`;
        undoBtn.style.opacity = canUndo ? '1' : '0.4';
    }

    // Critical: Handle Game Over by Patience
    if (state.patience <= 0) {
        renderLevelFailed("The driver lost all patience and kicked you out!");
    }
}

function updateBackground() {
    const container = document.querySelector('.glass-container');
    const level = LEVELS[state.level];
    if (!level) return;
    const bgPath = level.background;
    if (bgPath && container) {
        // Ensure path is relative to the html file
        container.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('${bgPath}')`;
    }
}

function saveGame() {
    window.swalpaStorage.save('meter_haaki_state', {
        respect: state.respect,
        wallet: state.wallet,
        patience: state.patience,
        level: state.level,
        currentStep: state.currentStep,
        activeDriver: state.activeDriver
    });
}

function loadGame() {
    const saved = window.swalpaStorage.load('meter_haaki_state');
    if (saved) {
        Object.assign(state, saved);
    }
}

async function typeWriter(text, element) {
    state.isTypewriting = true;
    element.innerHTML = '';

    // Prepare parts: spans for phonetic links and plain text
    // Replace ⟨...⟩ with temporary markers
    const parts = [];
    let currentText = text;
    const regex = /⟨([^⟩]+)⟩/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
        // Plain text before ⟨
        if (match.index > lastIndex) {
            parts.push({ type: 'text', value: text.substring(lastIndex, match.index) });
        }
        // Phonetic part
        parts.push({ type: 'phonetic', value: match[1] });
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push({ type: 'text', value: text.substring(lastIndex) });
    }

    for (const part of parts) {
        if (part.type === 'text') {
            for (const char of part.value) {
                element.innerHTML += char;
                await new Promise(r => setTimeout(r, 20)); // Slow typing
            }
        } else {
            const safe = part.value.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
            const span = document.createElement('span');
            span.className = 'audio-phonetic-link';
            span.innerHTML = `<span class="audio-icon">🔊</span>⟨${part.value}⟩`;
            span.onclick = () => playGameAudio(safe);
            element.appendChild(span);
            await new Promise(r => setTimeout(r, 100)); // Pause briefly on tags
        }
    }

    state.isTypewriting = false;
    document.querySelectorAll('.choice-btn').forEach(btn => btn.style.opacity = '1');
}

function showDialogue(stepKey) {
    state.currentStep = stepKey;
    saveGame();

    const dialogueBox = document.getElementById('dialogue-box');
    const speakerName = document.getElementById('speaker-name');
    const dialogueText = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('choices-container');
    const sceneIntro = document.querySelector('.scene-intro');

    if (stepKey === 'level_complete') {
        stopPatienceDecay();
        renderLevelComplete();
        return;
    }

    if (sceneIntro) sceneIntro.classList.add('hidden');
    dialogueBox.classList.remove('hidden');

    const level = LEVELS[state.level];
    const step = level.dialogue[stepKey];

    // Resolve dynamic speaker/text
    let speaker = step.speaker;
    if (speaker === "Driver") {
        speaker = state.activeDriver ? DRIVERS[state.activeDriver].name : "Driver";
    }

    let text = step.text;
    if (text === "Dynamic") {
        if (stepKey === 'start_negotiation') {
            if (state.activeDriver === 'Guru') text = "Namaskara saar. Indiranagar hog-thee-ra?";
            else if (state.activeDriver === 'Macha') text = "Yen guru, ellige?";
            else text = "Banni saar, ellige hogabeku?";
        } else if (stepKey === 'rain_negotiation') {
            if (state.respect > 40) text = "Sari saar, ⟨banni hogōṇa⟩.";
            else text = "Bēda saar, thumba risk ide. Double kodi.";
        }
    }

    speakerName.innerText = speaker;

    // Start patience decay if high stress
    if (level.isHighStress) {
        startPatienceDecay();
    } else {
        stopPatienceDecay();
    }

    choicesContainer.innerHTML = '';
    choicesContainer.style.opacity = '0.5'; // Dim while typing

    typeWriter(text, dialogueText);

    step.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.style.opacity = '0'; // Hidden until typing ends
        btn.innerHTML = `<span class="choice-num">${index + 1}</span> ${parsePhoneticsOnly(choice.text)}`;
        btn.onclick = () => {
            if (state.isTypewriting) return;
            handleChoice(choice);
        };
        choicesContainer.appendChild(btn);
    });
}

function parsePhoneticsOnly(text) {
    return text.replace(/⟨([^⟩]+)⟩/g, (match, p1) => {
        const safe = p1.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
        return `<span class="audio-phonetic-link" onclick="playGameAudio('${safe}')"><span class="audio-icon">🔊</span>⟨${p1}⟩</span>`;
    });
}

function startPatienceDecay() {
    if (patienceInterval) return;
    patienceInterval = setInterval(() => {
        state.patience = Math.max(0, state.patience - 0.5);
        updateUI();
    }, 1000);
}

function stopPatienceDecay() {
    if (patienceInterval) {
        clearInterval(patienceInterval);
        patienceInterval = null;
    }
}

function handleChoice(choice) {
    // Handle Driver Selection
    if (choice.driver) {
        state.activeDriver = choice.driver;
    }

    if (choice.effect) {
        const driver = state.activeDriver ? DRIVERS[state.activeDriver] : null;
        const driverMod = driver ? driver.modifiers : { respect: 1, patience: 1 };

        // Random Variance (0.8 to 1.2)
        const rand = 0.8 + (Math.random() * 0.4);

        // Environment Penalties
        const isRainy = LEVELS[state.level].isRainy;
        const environmentPriceMod = isRainy ? 1.5 : 1.0;

        // Language Barrier Mechanic
        let patiencePenalty = 1;
        if (choice.isEnglish && state.respect < 40) {
            patiencePenalty = 3; // 3x Patience decay for this choice
        }

        if (choice.effect.respect) {
            state.respect = Math.min(100, Math.max(0, state.respect + (choice.effect.respect * driverMod.respect * rand)));
        }
        if (choice.effect.patience) {
            state.patience = Math.min(100, Math.max(0, state.patience + (choice.effect.patience * driverMod.patience * rand * patiencePenalty)));
        }
        if (choice.effect.wallet) {
            // Negative wallet effect means spending money
            state.wallet += (choice.effect.wallet * environmentPriceMod);
        }

        if (choice.effect.end === 'reset') {
            localStorage.removeItem('meter_haaki_state'); // We can leave removeItem as is or use save(null)
            location.reload();
            return;
        }
    }

    // Global "Adjust Maadi" Reset if respect is too low
    if (state.respect < 10) {
        triggerGlobalReset();
        return;
    }

    updateUI();

    if (choice.effect && choice.effect.barrier) {
        showBarrierResponse(choice);
        return;
    }

    if (choice.next) {
        showDialogue(choice.next);
    }
}

function triggerGlobalReset() {
    const dialogueText = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('choices-container');

    dialogueText.innerText = "Nobody is stopping for you! You need to show some respect.";
    choicesContainer.innerHTML = '';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'choice-btn';
    resetBtn.innerText = "Swalpa adjust maadi (Request Reset)";
    resetBtn.onclick = () => {
        state.respect = 25;
        state.patience = 50;
        updateUI();
        showDialogue('engagement');
    };
    choicesContainer.appendChild(resetBtn);
}

function showBarrierResponse(choice) {
    const dialogueText = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('choices-container');

    dialogueText.innerText = "Kannada mathadi! English gothilla!";
    choicesContainer.innerHTML = '';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'choice-btn';
    resetBtn.innerText = "Swalpa adjust maadi (Try Again)";
    resetBtn.onclick = () => {
        state.respect = 25;
        state.patience = Math.max(10, state.patience - 10);
        updateUI();
        showDialogue(state.currentStep);
    };
    choicesContainer.appendChild(resetBtn);
}

function renderLevelFailed(message) {
    stopPatienceDecay();
    const scene = document.getElementById('game-scene');
    const dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.classList.add('hidden');

    scene.innerHTML = `
        <div class="scene-intro animate-fade-in">
            <h1>Level Failed</h1>
            <p class="scenario-text">${message || "The streets of Bangalore can be tough!"}</p>
            <button id="retry-btn" class="primary-btn">Try Again</button>
        </div>
    `;

    document.getElementById('retry-btn').onclick = () => {
        state.patience = 100;
        state.currentStep = 'engagement';
        saveGame();
        location.reload();
    };
}

function renderLevelComplete() {
    saveGame();
    const scene = document.getElementById('game-scene');
    const dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.classList.add('hidden');

    const score = Math.floor((state.level * 100) + state.respect + (state.wallet / 10));

    // Find rank
    let rank = RANKS[0];
    for (let r of RANKS) {
        if (score < r.threshold) {
            rank = r;
            break;
        }
    }

    const isLastLevel = state.level === Object.keys(LEVELS).length;

    scene.innerHTML = `
        <div class="scene-intro animate-fade-in">
            <h1 class="premium-text">Level ${state.level} Survived!</h1>
            <div class="score-card">
                <span class="label">BANGALORE RANK</span>
                <h2 class="rank-slang">${rank.title}</h2>
                <p class="rank-desc">${rank.desc}</p>
                <div class="score-grid">
                    <div class="score-item">
                        <span class="label">RESPECT</span>
                        <span class="value">${Math.floor(state.respect)}</span>
                    </div>
                    <div class="score-item">
                        <span class="label">WALLET</span>
                        <span class="value">₹${Math.floor(state.wallet)}</span>
                    </div>
                </div>
            </div>
            
            <div class="game-actions">
                ${isLastLevel ?
            `<h2 class="premium-text">Vishwa-Guru Status!</h2><p class='scenario-text'>You have mastered the Auto-Rickshaw Protocol.</p>` :
            `<button id="next-level-btn" class="primary-btn">Hogona! (Next Level)</button>`
        }
                <button class="control-btn" style="margin-top: 20px; width: 100%; padding: 12px; background: #25D366; color: white;" id="whatsapp-share-btn">📲 Share on WhatsApp</button>
                <button class="control-btn" style="margin-top: 10px; width: 100%; padding: 12px;" id="x-share-btn">𝕏 Share on X</button>
                <button class="control-btn" style="margin-top: 10px; width: 100%; padding: 12px;" id="copy-share-btn">📋 Copy Result</button>
                <button class="control-btn secondary" style="margin-top: 10px; width: 100%; padding: 12px;" id="restart-game-btn">Restart Journey</button>
            </div>
        </div>
    `;

    saveHighScore('meter-haaki', { level: state.level, respect: state.respect });
    unlockBadge('meter_haaki_pro');
    if (typeof logActivity === 'function') logActivity(5);

    document.getElementById('restart-game-btn').onclick = () => {
        localStorage.removeItem('meter_haaki_state');
        location.reload();
    };

    document.getElementById('whatsapp-share-btn').onclick = () => shareResult('whatsapp', rank.title, state.level);
    document.getElementById('x-share-btn').onclick = () => shareResult('x', rank.title, state.level);
    document.getElementById('copy-share-btn').onclick = () => shareResult('clipboard', rank.title, state.level);

    if (!isLastLevel) {
        document.getElementById('next-level-btn').onclick = startNextLevel;
    }
}

function startNextLevel() {
    state.level++;
    state.currentStep = 'engagement';
    state.patience = 100; // Reset patience for new level
    saveGame();
    location.reload(); // Simple reload to refresh scene with new level
}

function shareResult(platform, rank, level) {
    const text = `🛺 I just survived ${level} levels of Namma Bengaluru Traffic in the Meter-Haaki game! \n\nMy Rank: ${rank}\n\nCan you negotiate like a pro? Try it on SWALPA.org! #SWALPA #BangaloreTraffic #MeterHaaki`;
    const url = "https://swalpa.org/games/auto-rickshaw/";
    const fullMessage = `${text} \n\n${url}`;

    if (platform === 'whatsapp') {
        const waUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
        window.open(waUrl, '_blank');
    } else if (platform === 'x') {
        const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullMessage)}`;
        window.open(xUrl, '_blank');
    } else if (platform === 'clipboard') {
        const btn = document.getElementById('copy-share-btn');
        navigator.clipboard.writeText(fullMessage).then(() => {
            const original = btn.innerText;
            btn.innerText = "✅ Copied!";
            setTimeout(() => btn.innerText = original, 2000);
        });
    }
}

// Global Audio Helper (linked from game.js for internal use)
const gameAudio = new Audio();
window.playGameAudio = function (filename) {
    const voiceDir = window.swalpaStorage.load('swalpa_voice_dir') || 'audio_native_v4_male';
    gameAudio.src = `../../assets/${voiceDir}/${filename}.mp3`;
    gameAudio.play().catch(e => console.log("Audio play failed:", filename));
};

// Start the game on load
window.addEventListener('load', init);
