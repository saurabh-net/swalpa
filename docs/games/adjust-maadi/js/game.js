const state = {
    respect: 25,
    wallet: 500,
    patience: 100,
    level: 1,
    currentStep: 'engagement',
    activeDriver: null, // Track selected driver
    environment: {
        traffic: 'Low',
        weather: 'Sunny',
        timeOfDay: 'Morning'
    },
    history: [],
    undosRemaining: 3
};

const npcs = {
    'Reddy Uncle (Landlord)': {
        modifiers: { respect: 0.8, patience: 0.9 }
    },
    'Elaneer Anna': {
        modifiers: { respect: 1.1, patience: 1.2 }
    },
    'Plumber Kumar': {
        modifiers: { respect: 0.9, patience: 1.0 }
    },
    'Lineman Mahadeva': {
        modifiers: { respect: 1.2, patience: 0.8 }
    }
};

// Note: In a full refactor, these would move to separate JSON files
// For now, updating the structural content to match the expanded design
const levels = {
    1: {
        title: "The Landlord (Rent Negotiation)",
        scenario: "Your landlord is increasing the rent by 15%. Time to use your charm.",
        background: "",
        dialogue: {
            engagement: {
                speaker: "Reddy Uncle (Landlord)",
                text: "Nodappa, rent 15% in-crease mad-idini from next month.",
                choices: [
                    {
                        text: "Uncle, ⟨svalpa adjust māḍi⟩. 15% is too much.",
                        effect: { respect: 20 },
                        next: "rent_negotiation"
                    },
                    {
                        text: "I won't pay 15%! We agreed on 5% last year.",
                        isEnglish: true,
                        effect: { respect: -15, patience: -20, barrier: true },
                        next: "rent_negotiation"
                    },
                    {
                        text: "Uncle, 10% ⟨māḍōṇa⟩? Nanu obbane idini.",
                        effect: { respect: 30, patience: 10 },
                        next: "rent_negotiation"
                    },
                    {
                        text: "Fine. Take 15%. Just fix the leakage.",
                        isEnglish: true,
                        effect: { wallet: -150, respect: 5 },
                        next: "level_complete"
                    }
                ]
            },
            rent_negotiation: {
                get speaker() { return "Reddy Uncle (Landlord)"; },
                text: "Yen madodu thamma? Maintenance cost jasti agide. Society charge bere.",
                choices: [
                    {
                        text: "Sari uncle. Next month 10% jaasti ⟨koḍthīni⟩.",
                        effect: { respect: 20, wallet: -50 },
                        next: "level_complete"
                    },
                    {
                        text: "Uncle, ⟨oḷḷēdu māḍthāre⟩, 8% madi.",
                        effect: { respect: 35, wallet: -20 },
                        next: "level_complete"
                    },
                    {
                        text: "This is illegal. I will send a legal notice.",
                        isEnglish: true,
                        effect: { respect: -40, patience: -50, end: 'failed' }
                    },
                    {
                        text: "Sari uncle. ⟨Bāḍige⟩ transfer madthini.",
                        effect: { respect: 10, wallet: -100 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    2: {
        title: "The Tender Coconut Vendor",
        scenario: "You want a nice cold elaneer (tender coconut). The vendor quotes 60 Rupees.",
        background: "",
        dialogue: {
            engagement: {
                speaker: "Elaneer Anna",
                text: "Ondu yeradu 60 rupayi saar. Sweet ide.",
                choices: [
                    {
                        text: "Anna, 60 thumba ⟨jāsti⟩. 50 ⟨tagoḷi⟩.",
                        effect: { respect: 20, patience: 10 },
                        next: "vendor_negotiation"
                    },
                    {
                        text: "60 Rupees? Last week it was 40!",
                        isEnglish: true,
                        effect: { respect: -10, patience: -15 },
                        next: "vendor_negotiation"
                    },
                    {
                        text: "Sweet ⟨ideya⟩? ⟨Enu bele⟩ anna, sakhath bisi ide.",
                        effect: { respect: 25 },
                        next: "vendor_negotiation"
                    },
                    {
                        text: "Just cut one and give me quickly.",
                        isEnglish: true,
                        effect: { respect: -5, patience: -10 },
                        next: "vendor_negotiation"
                    }
                ]
            },
            vendor_negotiation: {
                get speaker() { return "Elaneer Anna"; },
                text: "No saar. Wholesale market-nalli rate 50 ide. Nanu 10 rupayi margin itt-idini.",
                choices: [
                    {
                        text: "Sari, yeradu kodi. 100 rupayi ⟨kodthini⟩.",
                        effect: { respect: 30, wallet: -100 },
                        next: "level_complete"
                    },
                    {
                        text: "I’ll scan the QR code for 50.",
                        isEnglish: true,
                        effect: { respect: -15, patience: -20, wallet: -50 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna ⟨svalpa adjust māḍi⟩, daily customer naanu.",
                        effect: { respect: 15, wallet: -55 },
                        next: "level_complete"
                    },
                    {
                        text: "Sari Anna, 60 kodi. ⟨Kaṭ madi⟩.",
                        effect: { respect: 10, wallet: -60 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    3: {
        title: "The Plumber",
        scenario: "The pipe is leaking. The plumber has arrived but is looking at a massive repair.",
        background: "",
        dialogue: {
            engagement: {
                speaker: "Plumber Kumar",
                text: "Pipe full damage aagide saar. Hose haakabeku, valve change madabeku. 1500 aagutte.",
                choices: [
                    {
                        text: "Are you crazy? It's just a small leak!",
                        isEnglish: true,
                        effect: { respect: -20, patience: -25, barrier: true },
                        next: "plumber_negotiation"
                    },
                    {
                        text: "Kumar, ⟨svalpa nōḍi māḍi⟩. 1500 thumba ⟨jāsti⟩.",
                        effect: { respect: 20, patience: 10 },
                        next: "plumber_negotiation"
                    },
                    {
                        text: "Valve ⟨beka⟩? Just seal madi saku.",
                        effect: { respect: 10 },
                        next: "plumber_negotiation"
                    },
                    {
                        text: "Please help anna, water is spilling everywhere.",
                        isEnglish: true,
                        effect: { respect: 5, patience: -5 },
                        next: "plumber_negotiation"
                    }
                ]
            },
            plumber_negotiation: {
                get speaker() { return "Plumber Kumar"; },
                text: "Parts-ge 800 aaguthe markethalli. Service charge 700. Material cost.",
                choices: [
                    {
                        text: "Sari Kumar, ⟨chennāgi māḍi⟩. 1200 ⟨kodthini⟩.",
                        effect: { respect: 25, wallet: -120 },
                        next: "level_complete"
                    },
                    {
                        text: "I will buy the parts. Just tell me labor charge.",
                        isEnglish: true,
                        effect: { respect: -10, patience: -15 },
                        next: "level_complete"
                    },
                    {
                        text: "Kumar ⟨adjust māḍi⟩, last time 500 togond-idri.",
                        effect: { respect: 15, wallet: -100 },
                        next: "level_complete"
                    },
                    {
                        text: "Sari ⟨māḍi⟩, but gaaranti kodabeku.",
                        effect: { respect: 10, wallet: -150 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    4: {
        title: "The BESCOM Power Cut",
        scenario: "Power has been out for 4 hours. You see a BESCOM lineman near the transformer.",
        background: "",
        dialogue: {
            engagement: {
                speaker: "Lineman Mahadeva",
                text: "Enappa? Line fault ide. Innu 3 hours baralla.",
                choices: [
                    {
                        text: "3 hours? I have WFH! Turn it on!",
                        isEnglish: true,
                        effect: { respect: -30, patience: -40, barrier: true },
                        next: "bescom_response"
                    },
                    {
                        text: "Anna, ⟨yēnāythu⟩? Cable problem-aa?",
                        effect: { respect: 20, patience: 10 },
                        next: "bescom_response"
                    },
                    {
                        text: "Current ⟨yāvāga baruthe⟩ anna? WFH ide.",
                        effect: { respect: 15 },
                        next: "bescom_response"
                    },
                    {
                        text: "Anna ⟨svalpa bēga māḍi⟩. Inverter down aagide.",
                        effect: { respect: 25, patience: 5 },
                        next: "bescom_response"
                    }
                ]
            },
            bescom_response: {
                get speaker() { return "Lineman Mahadeva"; },
                text: "Tree branch biddide cable mele. Kelsa mad-tha idivi.",
                choices: [
                    {
                        text: "Sari anna, ⟨ārāmāgi māḍi⟩. Safety first.",
                        effect: { respect: 40, patience: 30 },
                        next: "level_complete"
                    },
                    {
                        text: "How long will that take? I'm complaining on Twitter.",
                        isEnglish: true,
                        effect: { respect: -40, patience: -50, end: 'failed' }
                    },
                    {
                        text: "Anna ⟨help māḍana⟩? Light beku.",
                        effect: { respect: 20, patience: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "Coffee thagolthira anna? ⟨Thumba kelsa ide⟩ nimage.",
                        effect: { respect: 50, patience: 40, wallet: -10 },
                        next: "level_complete"
                    }
                ]
            }
        }
    }
};

function updateUI() {
    const respectMeter = document.getElementById('respect-meter');
    const respectRank = document.getElementById('respect-rank');
    const walletValue = document.getElementById('wallet-value');
    const patienceMeter = document.getElementById('patience-meter');
    const undoBtn = document.getElementById('undo-btn');

    respectMeter.style.width = `${state.respect}%`;
    walletValue.innerText = `₹${state.wallet}`;
    patienceMeter.style.width = `${state.patience}%`;

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
}

function updateBackground() {
    const container = document.querySelector('.glass-container');
    const bgPath = levels[state.level].background;
    if (bgPath && container) {
        container.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('${bgPath}')`;
    }
}

function saveHistory(stepKey) {
    state.history.push({
        respect: state.respect,
        wallet: state.wallet,
        patience: state.patience,
        level: state.level,
        stepKey: stepKey,
        currentStep: state.currentStep
    });
}

function undoStep() {
    if (state.history.length === 0 || state.undosRemaining === 0) return;
    const prev = state.history.pop();
    state.respect = prev.respect;
    state.wallet = prev.wallet;
    state.patience = prev.patience;
    state.level = prev.level;
    state.currentStep = prev.stepKey;
    state.undosRemaining--;
    updateBackground();
    updateUI();
    showDialogue(prev.stepKey);
}

function showDialogue(stepKey) {
    const dialogueBox = document.getElementById('dialogue-box');
    const speakerName = document.getElementById('speaker-name');
    const dialogueText = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('choices-container');
    const sceneIntro = document.querySelector('.scene-intro');

    if (stepKey === 'level_complete') {
        renderLevelComplete();
        return;
    }

    if (stepKey === 'level_failed') {
        renderLevelFailed();
        return;
    }

    sceneIntro.classList.add('hidden');
    dialogueBox.classList.remove('hidden');

    const step = levels[state.level].dialogue[stepKey];
    speakerName.innerText = step.speaker;

    // Phonetic Parsing: Transform ⟨text⟩ into interactive spans
    dialogueText.innerHTML = parsePhonetics(step.text);

    choicesContainer.innerHTML = '';

    // Play audio if available (simulated for now, hooks into audio.js style)
    if (step.audio) {
        playGameAudio(step.audio);
    }

    step.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = parsePhonetics(choice.text);
        btn.onclick = () => handleChoice(choice);
        choicesContainer.appendChild(btn);
    });
}

function parsePhonetics(text) {
    return text.replace(/⟨([^⟩]+)⟩/g, (match, p1) => {
        const safe = p1.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
        return `<span class="audio-phonetic-link" onclick="playGameAudio('${safe}')"><span class="audio-icon">🔊</span>⟨${p1}⟩</span>`;
    });
}

const gameAudio = new Audio();
function playGameAudio(filename) {
    // Sync with audio.js voice directory
    const voiceDir = localStorage.getItem('swalpa_voice_dir') || 'audio_native_v4_male';
    gameAudio.src = `../../assets/${voiceDir}/${filename}.mp3`;
    gameAudio.play().catch(e => console.log("Audio play failed or missing:", filename));
}

function handleChoice(choice) {
    saveHistory(state.currentStep);

    // Handle Driver Selection
    if (choice.driver) {
        state.activeDriver = choice.driver;
    }

    if (choice.effect) {
        let npcMod = { respect: 1, patience: 1 };

        // Try to find if the current speaker matches an NPC profile
        if (state.currentStep !== 'engagement' && levels[state.level].dialogue[state.currentStep].speaker) {
            const speaker = levels[state.level].dialogue[state.currentStep].speaker;
            if (npcs[speaker]) {
                npcMod = npcs[speaker].modifiers;
            }
        } else if (choice.speaker && npcs[choice.speaker]) {
            npcMod = npcs[choice.speaker].modifiers;
        }
        const rand = 0.8 + (Math.random() * 0.4);

        // Language Barrier Mechanic: English penalty
        let patiencePenalty = 1;
        if (choice.isEnglish && state.respect < 40) {
            patiencePenalty = 3; // 3x Patience decay
            console.log("Language Barrier Active: Patience decay intensified.");
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

        // Adjust Maadi Reset
        if (choice.text.includes("adjust maadi") && state.respect < 15) {
            state.respect = 25;
            state.patience = 50;
            console.log("Adjust Maadi: NPC hostility reset.");
        }

        if (choice.effect.end === 'reset') {
            location.reload();
            return;
        }
    }

    updateUI();

    // Check for Barrier Response trigger
    if (choice.effect && choice.effect.barrier) {
        showBarrierResponse(choice);
        return;
    }

    if (choice.next) {
        state.currentStep = choice.next;
        showDialogue(choice.next);
    }
}

function showBarrierResponse(choice) {
    const dialogueText = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('choices-container');

    dialogueText.innerText = "Kannada mathadi! English gothilla!";
    choicesContainer.innerHTML = '';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'choice-btn';
    resetBtn.innerText = "Swalpa adjust maadi (Reset Negotiation)";
    resetBtn.onclick = () => {
        state.respect = 25;
        state.patience += 10;
        updateUI();
        showDialogue(state.currentStep);
    };
    choicesContainer.appendChild(resetBtn);
}

function renderLevelFailed() {
    const scene = document.getElementById('game-scene');
    const dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.classList.add('hidden');

    scene.innerHTML = `
        <div class="scene-intro">
            <h1>Level Failed</h1>
            <p class="scenario-text">The driver left or you gave up. The streets of Bangalore can be tough!</p>
            <button onclick="location.reload()" class="primary-btn">Try Level ${state.level} Again</button>
        </div>
    `;
    scene.classList.remove('hidden');
}

function startNextLevel() {
    state.level++;
    state.currentStep = 'engagement';

    const scene = document.getElementById('game-scene');
    const dialogueBox = document.getElementById('dialogue-box');

    scene.innerHTML = `
        <div class="scene-intro">
            <h1>Level ${state.level}: ${levels[state.level].title}</h1>
            <p class="scenario-text">${levels[state.level].scenario}</p>
            <button id="start-btn" class="primary-btn">Begin Activity</button>
        </div>
    `;

    document.getElementById('start-btn').onclick = () => {
        updateBackground();
        showDialogue('engagement');
    };

    updateUI();
    updateBackground();
}

function renderLevelComplete() {
    const scene = document.getElementById('game-scene');
    const dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.classList.add('hidden');

    const score = Math.floor((state.level * 100) + state.respect + (state.wallet / 10));
    const rank = getRankSlang(score);
    const isLastLevel = state.level === Object.keys(levels).length;

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
                        <span class="value">₹${state.wallet}</span>
                    </div>
                </div>
            </div>
            
            <div class="game-actions">
        ${isLastLevel ?
            `<h2 class="premium-text">Adjust Maadi Master!</h2><p class='scenario-text'>You have mastered Bangalore Logistics.</p>` :
            `<button id="next-level-btn" class="primary-btn">Munde Hogona! (Next Scenario)</button>`
        }
                <button class="control-btn whatsapp-btn" style="margin-top: 15px; width: 100%; padding: 12px;" id="whatsapp-share-btn">📲 Share on WhatsApp</button>
                <div style="display: flex; gap: 8px; margin-top: 10px;">
                    <button class="control-btn" style="flex: 1; padding: 12px;" id="share-btn">📋 Copy Result</button>
                    <button class="control-btn" style="flex: 1; padding: 12px;" id="twitter-btn">🐦 Twitter</button>
                </div>
                <button class="control-btn secondary" style="margin-top: 10px; width: 100%; padding: 12px;" onclick="location.reload()">Restart</button>
            </div>
        </div>
    `;

    document.getElementById('whatsapp-share-btn').onclick = () => shareResult('whatsapp', rank.title, state.level);
    document.getElementById('share-btn').onclick = () => shareResult('clipboard', rank.title, state.level);
    document.getElementById('twitter-btn').onclick = () => shareResult('twitter', rank.title, state.level);

    if (!isLastLevel) {
        document.getElementById('next-level-btn').onclick = startNextLevel;
    }

    scene.classList.remove('hidden');
}

function getRankSlang(score) {
    if (score < 200) return { title: "Fresh Off the Boat", desc: "You survived, but your wallet took a beating. Start using 'Adjust Maadi'!" };
    if (score < 400) return { title: "Sakkath Student", desc: "Solid effort! You're navigating vendors and landlords with emerging confidence." };
    if (score < 600) return { title: "A True Macha", desc: "Boss! Your 'Adjust Maadi' game is strong. Everyone respects the swagger." };
    return { title: "Local Legend", desc: "Namma Ooru Legend! You handle Bangalore logistics better than the locals." };
}

function shareResult(platform, rank, level) {
    const text = `🤝 I just survived ${level} scenarios of Bangalore Logistics in the Adjust-Maadi game! \n\nMy Rank: ${rank}\n\nCan you handle the streets? Try it on SWALPA.org! #SWALPA #BangaloreKannada #AdjustMaadi`;
    const url = "https://swalpa.org/games/adjust_maadi/";
    const fullMessage = `${text} \n\n${url}`;

    if (platform === 'whatsapp') {
        const waUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
        window.open(waUrl, '_blank');
    } else if (platform === 'twitter') {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullMessage)}`;
        window.open(twitterUrl, '_blank');
    } else if (platform === 'clipboard') {
        const shareBtn = document.getElementById('share-btn');
        navigator.clipboard.writeText(fullMessage).then(() => {
            const originalText = shareBtn.innerText;
            shareBtn.innerText = "✅ Copied!";
            setTimeout(() => shareBtn.innerText = originalText, 2000);
        });
    }
}

document.getElementById('start-btn').onclick = () => {
    updateBackground();
    showDialogue('engagement');
};

// Initial UI sync
updateUI();
updateBackground();
