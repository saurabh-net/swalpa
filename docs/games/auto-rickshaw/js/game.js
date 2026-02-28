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

const drivers = {
    'Guru': {
        name: 'Guru (The Stoic)',
        voice: 'Deep',
        modifiers: { respect: 0.8, patience: 1.0 },
        description: 'Older, khaki uniform. Traditional and formal.'
    },
    'Anna': {
        name: 'Anna (The Friendly)',
        voice: 'Warm',
        modifiers: { respect: 1.0, patience: 1.2 },
        description: 'Middle-aged, big smile. Loves a good chat.'
    },
    'Macha': {
        name: 'Macha (The Hustler)',
        voice: 'Fast',
        modifiers: { respect: 1.2, patience: 0.8 },
        description: 'Young, sunglasses. Respects confidence and slang.'
    }
};

// Note: In a full refactor, these would move to separate JSON files
// For now, updating the structural content to match the expanded design
const levels = {
    1: {
        title: "The Terminal Selection",
        scenario: "Choose your driver at the Metro exit terminal. Each has a different vibe.",
        background: "assets/level_1_background.png",
        dialogue: {
            engagement: {
                speaker: "System",
                text: "Pick your driver to begin the protocol:",
                choices: [
                    { text: "Guru (The Stoic) - High Respect, Low Patience", driver: 'Guru', next: 'start_negotiation' },
                    { text: "Anna (The Friendly) - Balanced, Loves Chatting", driver: 'Anna', next: 'start_negotiation' },
                    { text: "Macha (The Hustler) - Fast, Loves confidence", driver: 'Macha', next: 'start_negotiation' },
                    { text: "Wait for a modern app-based cab", effect: { patience: -30 }, next: 'start_negotiation' }
                ]
            },
            start_negotiation: {
                get speaker() { return state.activeDriver ? state.activeDriver : "Driver"; },
                get text() {
                    if (state.activeDriver === 'Guru') return "Namaskara saar. Indiranagar hog-thee-ra?";
                    if (state.activeDriver === 'Macha') return "Yen guru, ellige?";
                    return "Banni saar, ellige hogabeku?";
                },
                choices: [
                    {
                        text: "⟨Namaskāra⟩ Anna, Indiranagar 12th Main banni.",
                        effect: { respect: 15 },
                        next: "fare_check"
                    },
                    {
                        text: "Indiranagar. ⟨Meter hāki⟩.",
                        effect: { respect: 5, patience: -10 },
                        next: "fare_check"
                    },
                    {
                        text: "⟨Oota āytha⟩? Indiranagar banni.",
                        effect: { respect: 25, patience: 10 },
                        next: "fare_check"
                    },
                    {
                        text: "Go to Indiranagar. Move fast.",
                        isEnglish: true,
                        effect: { respect: -15, patience: -20, barrier: true },
                        next: "fare_check"
                    }
                ]
            },
            fare_check: {
                get speaker() { return state.activeDriver; },
                text: "Meter plus 20 kodi saar. Thumba traffic ide.",
                choices: [
                    {
                        text: "Sari anna, ⟨hogōṇa⟩.",
                        effect: { respect: 10, wallet: -20 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Bēda⟩ guru, meter haaki.",
                        effect: { respect: 15, patience: -10 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Svalpa adjust māḍi⟩ anna, student naanu.",
                        effect: { respect: 20 },
                        next: "level_complete"
                    },
                    {
                        text: "Fine, here's 50 extra. Just go.",
                        isEnglish: true,
                        effect: { respect: -10, wallet: -50 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    2: {
        title: "The Maze (Navigation)",
        scenario: "Navigate the narrow gullies of Malleshwaram. Guided by your driver.",
        background: "assets/level_2_gullies.png",
        dialogue: {
            engagement: {
                get speaker() { return state.activeDriver; },
                text: "Saar, illi flyover work aagtide. Left-ah, right-ah?",
                choices: [
                    {
                        text: "Illi ⟨balagaḍe thagoḷi⟩, aamele nera ⟨hōgi⟩.",
                        effect: { respect: 15, patience: 10 },
                        next: "shortcut_check"
                    },
                    {
                        text: "⟨Left hōgi⟩... alla alla, ⟨right thagoḷi⟩!",
                        effect: { respect: -5, patience: -20 },
                        next: "shortcut_check"
                    },
                    {
                        text: "⟨Svalpa adjust māḍi⟩ anna, full confusion.",
                        effect: { respect: 10 },
                        next: "shortcut_check"
                    },
                    {
                        text: "Just follow the GPS. Take the next left.",
                        isEnglish: true,
                        effect: { respect: -10, patience: -15 },
                        next: "shortcut_check"
                    }
                ]
            },
            shortcut_check: {
                get speaker() { return state.activeDriver; },
                text: "Saar, shortcut thogolla? Time ulit-the.",
                choices: [
                    {
                        text: "Haudu, gully olgade ⟨hōgi⟩.",
                        effect: { respect: 15, patience: 10 },
                        next: "destination_near"
                    },
                    {
                        text: "⟨Bēda⟩, main road-alle ⟨hōgi⟩.",
                        effect: { respect: 5, patience: -10 },
                        next: "destination_near"
                    },
                    {
                        text: "Nimage ⟨gottidre⟩ thagoli anna.",
                        effect: { respect: 20 },
                        next: "destination_near"
                    },
                    {
                        text: "Whatever is faster. I have a meeting.",
                        isEnglish: true,
                        effect: { respect: -15, wallet: -20 },
                        next: "destination_near"
                    }
                ]
            },
            destination_near: {
                get speaker() { return state.activeDriver; },
                text: "Destination banthu saar. Illi nillisti-ni.",
                choices: [
                    {
                        text: "⟨Dhanyavāda⟩ anna. Illi ⟨nillisi⟩.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Svalpa munde nillisi⟩.",
                        effect: { respect: 5 },
                        next: "level_complete"
                    },
                    {
                        text: "Super anna, ⟨ārāmāgi iri⟩.",
                        effect: { respect: 20 },
                        next: "level_complete"
                    },
                    {
                        text: "Stop here. Keep the change.",
                        isEnglish: true,
                        effect: { wallet: -10, respect: -5 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    3: {
        title: "The Surge (Stormy Weather)",
        scenario: "A sudden Bangalore downpour starts. The driver pulls over.",
        background: "assets/level_3_rain.png",
        dialogue: {
            engagement: {
                get speaker() { return state.activeDriver; },
                text: "Saar, thumba ⟨male⟩ barthide. Nilli-stini, illandre 200 kodi.",
                choices: [
                    {
                        text: "Anna, thumba heavy ⟨male⟩ ide. 50 extra kodthini, ⟨banni⟩.",
                        effect: { respect: 20 },
                        next: "rain_negotiation"
                    },
                    {
                        text: "Why double? ⟨Meter hāki⟩ anna!",
                        isEnglish: true,
                        effect: { respect: -10, patience: -30 },
                        next: "rain_negotiation"
                    },
                    {
                        text: "Anna, ⟨svalpa adjust māḍi⟩. Patient naanu.",
                        effect: { respect: 15 },
                        next: "rain_negotiation"
                    },
                    {
                        text: "⟨Devaru nimage oḷḷēdu māḍthāre⟩, banni.",
                        effect: { respect: 30 },
                        next: "rain_negotiation"
                    }
                ]
            },
            rain_negotiation: {
                get speaker() { return state.activeDriver; },
                get text() {
                    if (state.respect > 40) return "Sari saar, ⟨banni hogōṇa⟩.";
                    return "Bēda saar, thumba risk ide. Double kodi.";
                },
                choices: [
                    {
                        text: "Sari anna, tumba kelsa ideya? ⟨Oota āytha⟩?",
                        effect: { respect: 30, patience: 20 },
                        next: "level_complete"
                    },
                    {
                        text: "Illi ⟨nillisi⟩, bere auto nodthini.",
                        effect: { end: 'reset' }
                    },
                    {
                        text: "⟨Dhanyavāda⟩ anna, help madidri.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "Fine, take the 200 rupees. Just drive.",
                        isEnglish: true,
                        effect: { wallet: -100, respect: -20 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    4: {
        title: "The Bottleneck (Traffic)",
        scenario: "You are stuck in Silboard traffic. The driver is getting restless.",
        background: "assets/level_4_traffic.png",
        dialogue: {
            engagement: {
                get speaker() { return state.activeDriver; },
                text: "Yen guru, thumba traffic ide. Mathe?",
                choices: [
                    {
                        text: "Sakkath traffic guru. ⟨Svalpa adjust māḍi⟩.",
                        effect: { respect: 20, patience: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "Indu thumba ⟨traffic⟩ ideya?",
                        effect: { respect: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Oota āytha⟩? Traffic problem common.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "Can we go faster? I'm missing my shift.",
                        isEnglish: true,
                        effect: { respect: -20, patience: -25 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    5: {
        title: "The Detour (Blocked)",
        scenario: "A 'No Entry' sign forces a long detour. Use your verbs.",
        background: "assets/level_5_detour.png",
        dialogue: {
            engagement: {
                get speaker() { return state.activeDriver; },
                text: "Saar, illi daari illa. 'No Entry'. U-turn thonbond ⟨banni⟩.",
                choices: [
                    {
                        text: "Sari anna, ⟨hōgi⟩.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "Alli ⟨nillisi⟩, nanu hog-theeni.",
                        effect: { respect: 5, patience: -10 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Munde hōgi⟩, bere daari ide.",
                        effect: { respect: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "This is too long! Just find a way through.",
                        isEnglish: true,
                        effect: { respect: -15, patience: -20 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    6: {
        title: "The Change (Payment)",
        scenario: "You reached the destination. Time to pay up.",
        background: "assets/level_6_payment.png",
        dialogue: {
            engagement: {
                get speaker() { return state.activeDriver; },
                text: "Banthu saar. 150 aaguthe.",
                choices: [
                    {
                        text: "Sari anna, hattu rupayi extra kodi, change ⟨bēḍa⟩.",
                        effect: { wallet: -160, respect: 25 },
                        next: "level_complete"
                    },
                    {
                        text: "Change illa saar, PhonePe ⟨māḍōṇa⟩?",
                        effect: { wallet: -150, respect: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "⟨Dhanyavāda⟩ anna. Change thagoli.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "I only have a 500 note. Do you have change?",
                        isEnglish: true,
                        effect: { respect: -10, patience: -20 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    7: {
        title: "The Electronic City Flyover Limbo",
        scenario: "Stranded on the high-speed flyover. The engine has failed. Shankar Anna looks worried.",
        background: "assets/level_7_flyover.png",
        dialogue: {
            engagement: {
                get speaker() { return "Shankar Anna"; },
                text: "... (Silence as the engine dies) ...",
                choices: [
                    {
                        text: "Excuse me? Why did we stop? I'm late!",
                        isEnglish: true,
                        effect: { respect: -20, patience: -15 },
                        next: "refund_negotiation"
                    },
                    {
                        text: "Anna, ⟨yēnāythu⟩? Engine problem-aa?",
                        effect: { respect: 15, patience: 10 },
                        next: "refund_negotiation"
                    },
                    {
                        text: "Auto stop aythu? ⟨Help bēkā⟩?",
                        effect: { respect: 5, patience: 5 },
                        next: "refund_negotiation"
                    },
                    {
                        text: "Ayyo! Shankar Nag avru ididre sari madthidru!",
                        effect: { respect: 30, patience: 20 },
                        next: "refund_negotiation"
                    }
                ]
            },
            refund_negotiation: {
                get speaker() { return "Shankar Anna"; },
                text: "Engine dead saar. Full fare kodi mathu service charge beku.",
                choices: [
                    {
                        text: "I’m not paying! You didn't drop me.",
                        isEnglish: true,
                        effect: { respect: -25, patience: -30, barrier: true },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, ⟨svalpa nyāya māthāḍi⟩. Half fare thagoli.",
                        effect: { respect: 20, wallet: -75 },
                        next: "level_complete"
                    },
                    {
                        text: "Full fare ⟨bēḍa⟩. Discount kodi please.",
                        effect: { respect: 5, wallet: -100 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, ⟨svalpa adjust māḍi⟩. Student naanu.",
                        effect: { respect: 15, wallet: -80 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    8: {
        title: "The Terminal (Majestic Chaos)",
        scenario: "Majestic Bus Stand at 6:30 PM. Rain is starting. You need to go to Sarjapur.",
        background: "assets/level_8_majestic.png",
        dialogue: {
            engagement: {
                get speaker() { return "Manju"; },
                text: "(Leaning against the auto, ignoring everyone)",
                choices: [
                    {
                        text: "Are you free? Sarjapur ⟨banni⟩. Meter haaki.",
                        isEnglish: true,
                        effect: { respect: -20, patience: -15 },
                        next: "surcharge_negotiation"
                    },
                    {
                        text: "⟨Namaskāra⟩ Anna, Sarjapur bartira? Urgent ide.",
                        effect: { respect: 20, patience: 15 },
                        next: "surcharge_negotiation"
                    },
                    {
                        text: "Sarjapur-aa? ⟨Meter hāki⟩ madi banni.",
                        effect: { respect: 5, patience: 5 },
                        next: "surcharge_negotiation"
                    },
                    {
                        text: "Sarjapur? One-and-half... bartira?",
                        effect: { respect: 25, patience: 20, wallet: -50 },
                        next: "surcharge_negotiation"
                    }
                ]
            },
            surcharge_negotiation: {
                get speaker() { return "Manju"; },
                text: "200 kodi flat. Empty return ide, traffic ide.",
                choices: [
                    {
                        text: "Ridiculous! I'll check Uber.",
                        isEnglish: true,
                        effect: { respect: -20, patience: -30, barrier: true },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, nanu student. One-forty-ge ⟨adjust māḍi⟩.",
                        effect: { respect: 25, wallet: -140 },
                        next: "level_complete"
                    },
                    {
                        text: "One-fifty koddthini. ⟨Banni hogōṇa⟩.",
                        effect: { respect: 10, wallet: -150 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, extra 30 koddthini. ⟨Hogōṇa⟩.",
                        effect: { respect: 20, wallet: -180 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    9: {
        title: "The High-Stakes Monsoon",
        scenario: "Midnight. Indira Nagar. Heavy rain. You need Aster CMI Hospital immediately.",
        background: "assets/level_9_emergency.png",
        dialogue: {
            engagement: {
                get speaker() { return "Gowda"; },
                text: "Thumbā ⟨male⟩ barthide. Manege hogabeku.",
                choices: [
                    {
                        text: "Please stop! Emergency! I'll pay double!",
                        isEnglish: true,
                        effect: { respect: -15, wallet: -300 },
                        next: "humanity_check"
                    },
                    {
                        text: "Anna, dayavittu ⟨nillisi⟩. Hospital-ge ⟨hogabēku⟩.",
                        effect: { respect: 30, patience: 20 },
                        next: "humanity_check"
                    },
                    {
                        text: "Emergency hospital. ⟨Bēga hogōṇa⟩ please.",
                        effect: { respect: 10, patience: 5 },
                        next: "humanity_check"
                    },
                    {
                        text: "Anna, ⟨svalpa adjust māḍi⟩. Devaru nimage olledu madthare.",
                        effect: { respect: 40, patience: 30 },
                        next: "humanity_check"
                    }
                ]
            },
            humanity_check: {
                get speaker() { return "Gowda"; },
                text: "(Arrival at Hospital) Meter says 120. ⟨Banni⟩ saar.",
                choices: [
                    {
                        text: "Here is 240 as promised. ⟨Dhanyavāda⟩.",
                        isEnglish: true,
                        effect: { respect: -10, wallet: -240 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, neevu devru thara bandri. 300 thagoli.",
                        effect: { respect: 60, wallet: -300 },
                        next: "level_complete"
                    },
                    {
                        text: "Thanks Anna. ⟨Ārāmāgi iri⟩.",
                        effect: { respect: 15, wallet: -120 },
                        next: "level_complete"
                    },
                    {
                        text: "Anna, Shankar Nag thara help madidri. ⟨Dhanyavāda⟩.",
                        effect: { respect: 50, wallet: -120 },
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
        const driverMod = state.activeDriver ? drivers[state.activeDriver].modifiers : { respect: 1, patience: 1 };
        const rand = 0.8 + (Math.random() * 0.4);

        // Language Barrier Mechanic: English penalty
        let patiencePenalty = 1;
        if (choice.isEnglish && state.respect < 40) {
            patiencePenalty = 3; // 3x Patience decay
            console.log("Language Barrier Active: Patience decay intensified.");
        }

        if (choice.effect.respect) {
            state.respect = Math.min(100, Math.max(0, state.respect + (choice.effect.respect * driverMod.respect * rand)));
        }
        if (choice.effect.patience) {
            state.patience = Math.min(100, Math.max(0, state.patience + (choice.effect.patience * driverMod.patience * rand * patiencePenalty)));
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
            `<h2 class="premium-text">Vishwa-Guru Status!</h2><p class='scenario-text'>You have mastered the Auto-Rickshaw Protocol.</p>` :
            `<button id="next-level-btn" class="primary-btn">Hogona! (Next Level)</button>`
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
    if (score < 400) return { title: "Outer Ring Roadie", desc: "You survived, but the drivers think you're a clueless 'it-park' bot. Speak more Kannada!" };
    if (score < 700) return { title: "Sakkath Student", desc: "Solid effort! You're navigating the gullies with emerging confidence." };
    if (score < 1000) return { title: "A True Macha", desc: "Boss! Your 'Adjust Maadi' game is strong. Drivers respect the swagger." };
    return { title: "Legendary Vishwa-Guru", desc: "Namma Ooru Legend! You speak more Kannada than the local traffic police." };
}

function shareResult(platform, rank, level) {
    const text = `🚕 I just survived ${level} levels of Bangalore Traffic in the Meter-Haaki game! \n\nMy Rank: ${rank}\n\nCan you handle the streets? Try it on SWALPA.org! #SWALPA #BangaloreKannada #MeterHaaki`;
    const url = "https://swalpa.org/games/meter-haaki/";
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
