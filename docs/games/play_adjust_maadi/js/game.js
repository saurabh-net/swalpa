import { NPCS, LEVELS, RANKS } from './data.js';
import { saveHighScore } from '../../../assets/js/scores.js';
import { unlockBadge } from '../../../assets/js/badges.js';

const state = {
    respect: 25,
    wallet: 500,
    patience: 100,
    level: 1,
    currentStep: 'engagement',
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
        } else if (e.key === 'Enter') {
            const startBtn = document.getElementById('start-btn');
            if (startBtn && !startBtn.parentElement.classList.contains('hidden')) {
                startBtn.click();
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

    // Smooth transition
    respectMeter.style.width = `${state.respect}%`;
    walletValue.innerText = `₹${Math.floor(state.wallet)}`;
    patienceMeter.style.width = `${state.patience}%`;

    // Dynamic Rank labels
    if (state.respect <= 25) respectRank.innerText = "Tourist";
    else if (state.respect <= 50) respectRank.innerText = "Resident";
    else if (state.respect <= 85) respectRank.innerText = "Local";
    else respectRank.innerText = "Macha";

    if (undoBtn) {
        const canUndo = state.history.length > 0 && state.undosRemaining > 0;
        undoBtn.disabled = !canUndo;
        undoBtn.innerText = `↩ Undo (${state.undosRemaining} left)`;
    }

    if (state.patience <= 0) {
        renderLevelFailed("They ran out of patience! Negotiation over.");
    }
}

function updateBackground() {
    const container = document.querySelector('.glass-container');
    const level = LEVELS[state.level];
    if (!level) return;
    const bgPath = level.background;
    if (bgPath && container) {
        container.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('${bgPath}')`;
    }
}

function saveGame() {
    localStorage.setItem('adjust_maadi_state', JSON.stringify({
        respect: state.respect,
        wallet: state.wallet,
        patience: state.patience,
        level: state.level,
        currentStep: state.currentStep
    }));
}

function loadGame() {
    const saved = localStorage.getItem('adjust_maadi_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
    }
}

async function typeWriter(text, element) {
    state.isTypewriting = true;
    element.innerHTML = '';

    // Regex for ⟨...⟩ tags
    const parts = [];
    const regex = /⟨([^⟩]+)⟩/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', value: text.substring(lastIndex, match.index) });
        }
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
                await new Promise(r => setTimeout(r, 20));
            }
        } else {
            const safe = part.value.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
            const span = document.createElement('span');
            span.className = 'audio-phonetic-link';
            span.innerHTML = `<span class="audio-icon">🔊</span>⟨${part.value}⟩`;
            span.onclick = () => playGameAudio(safe);
            element.appendChild(span);
            await new Promise(r => setTimeout(r, 100));
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

    speakerName.innerText = step.speaker;

    // Start patience decay if high stress
    if (level.isHighStress) {
        startPatienceDecay();
    } else {
        stopPatienceDecay();
    }

    choicesContainer.innerHTML = '';
    choicesContainer.style.opacity = '0.5';

    typeWriter(step.text, dialogueText);

    step.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.style.opacity = '0';
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
    if (choice.effect) {
        // NPC Modifiers
        const speaker = LEVELS[state.level].dialogue[state.currentStep].speaker;
        const npc = NPCS[speaker];
        const npcMod = npc ? npc.modifiers : { respect: 1, patience: 1 };

        const rand = 0.8 + (Math.random() * 0.4);

        // Language Barrier
        let patiencePenalty = 1;
        if (choice.isEnglish && state.respect < 40) {
            patiencePenalty = 3;
        }

        if (choice.effect.respect) {
            state.respect = Math.min(100, Math.max(0, state.respect + (choice.effect.respect * npcMod.respect * rand)));
        }
        if (choice.effect.patience) {
            state.patience = Math.min(100, Math.max(0, state.patience + (choice.effect.patience * npcMod.patience * rand * patiencePenalty)));
        }
        if (choice.effect.wallet) {
            state.wallet += choice.effect.wallet;
        }

        if (choice.effect.end === 'failed') {
            renderLevelFailed("Diplomacy failed. You were thrown out!");
            return;
        }
    }

    // Adjust Maadi Logic
    if (choice.text.toLowerCase().includes("adjust maadi") && state.respect < 15) {
        state.respect = 25;
        state.patience = Math.min(100, state.patience + 10);
    }

    updateUI();

    if (choice.effect && choice.effect.barrier) {
        showBarrierResponse();
        return;
    }

    if (choice.next) {
        showDialogue(choice.next);
    }
}

function showBarrierResponse() {
    const dialogueText = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('choices-container');

    dialogueText.innerText = "Kannada mathadi! English gothilla!";
    choicesContainer.innerHTML = '';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'choice-btn';
    resetBtn.innerText = "Swalpa adjust maadi (Try Again)";
    resetBtn.onclick = () => {
        state.respect = Math.max(10, state.respect - 5);
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
            <h1>Activity Failed</h1>
            <p class="scenario-text">${message || "Bangalore logistics are tough!"}</p>
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
            <h1 class="premium-text">Activity Survived!</h1>
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
            `<h2 class="premium-text">Adjust-Maadi Specialist!</h2><p class='scenario-text'>You've mastered the logistics of Namma Ooru.</p>` :
            `<button id="next-level-btn" class="primary-btn">Munde Hogona! (Next activity)</button>`
        }
                <button class="control-btn" style="margin-top: 20px; width: 100%; padding: 12px; background: #25D366; color: white;" id="whatsapp-share-btn">📲 Share on WhatsApp</button>
                <button class="control-btn" style="margin-top: 10px; width: 100%; padding: 12px;" id="x-share-btn">𝕏 Share on X</button>
                <button class="control-btn" style="margin-top: 10px; width: 100%; padding: 12px;" id="copy-share-btn">📋 Copy Result</button>
                <button class="control-btn secondary" style="margin-top: 10px; width: 100%; padding: 12px;" id="restart-game-btn">Restart Journey</button>
            </div>
        </div>
    `;

    saveHighScore('adjust-maadi', { level: state.level, respect: state.respect });
    unlockBadge('adjust_maadi_master');

    document.getElementById('restart-game-btn').onclick = () => {
        localStorage.removeItem('adjust_maadi_state');
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
    state.patience = 100;
    saveGame();
    location.reload();
}

function shareResult(platform, rank, level) {
    const text = `🤝 I just survived ${level} scenarios of Bangalore Logistics in the Adjust-Maadi game! \n\nMy Rank: ${rank}\n\nCan you handle the streets? Try it on SWALPA.org! #SWALPA #BangaloreKannada #AdjustMaadi`;
    const url = "https://swalpa.org/games/adjust_maadi/";
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

const gameAudio = new Audio();
window.playGameAudio = function (filename) {
    const voiceDir = localStorage.getItem('swalpa_voice_dir') || 'audio_native_v4_male';
    gameAudio.src = `../../assets/${voiceDir}/${filename}.mp3`;
    gameAudio.play().catch(e => console.log("Audio play missing:", filename));
};

window.addEventListener('load', init);
