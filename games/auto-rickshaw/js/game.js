const state = {
    respect: 25,
    wallet: 500,
    patience: 100,
    level: 1,
    currentStep: 'engagement',
    history: [],
    undosRemaining: 3
};

const levels = {
    1: {
        title: "The Booking Standoff",
        scenario: "You are at a busy Metro exit. Three drivers are waiting. You need to pick one and get him to agree to a fare.",
        background: "assets/level_1_background.png",
        dialogue: {
            engagement: {
                speaker: "Driver B",
                text: "Ellige hogabeku saar?",
                choices: [
                    {
                        text: "Guru, 12th Main Indiranagar barthira?",
                        effect: { respect: 15, patience: 10 },
                        next: "fare_agreement_success"
                    },
                    {
                        text: "Indiranagar, go?",
                        effect: { respect: -5, patience: -5 },
                        next: "fare_agreement_negotiation"
                    },
                    {
                        text: "Indiranagar hogu.",
                        effect: { respect: -15, patience: -15 },
                        next: "fare_agreement_negotiation"
                    },
                    {
                        text: "Nange Indiranagar beku.",
                        effect: { respect: -10, patience: -10 },
                        next: "fare_agreement_negotiation"
                    }
                ]
            },
            fare_agreement_negotiation: {
                speaker: "Driver B",
                text: "No saar, busy time. One-and-half only.",
                choices: [
                    {
                        text: "Bēda guru, meter haaki.",
                        effect: { respect: 10, patience: 5 },
                        next: "fare_agreement_success"
                    },
                    {
                        text: "Please put meter, sir.",
                        effect: { respect: 0, patience: -5 },
                        next: "fare_agreement_failure"
                    },
                    {
                        text: "Meter haaku!",
                        effect: { respect: -20, patience: -20 },
                        next: "fare_agreement_failure"
                    },
                    {
                        text: "Jaasthi kodi.",
                        effect: { respect: -10, patience: -30 },
                        next: "fare_agreement_failure"
                    }
                ]
            },
            fare_agreement_failure: {
                speaker: "Driver B",
                text: "No saar, not coming. Go back!",
                choices: [
                    {
                        text: "Sari, bere auto nodthini.",
                        effect: { respect: 0 },
                        next: "level_failed"
                    },
                    {
                        text: "Swalpa adjust maadi, guru...",
                        effect: { patience: -10 },
                        next: "engagement"
                    },
                    {
                        text: "Oota aytha?",
                        effect: { respect: 5, patience: 10 },
                        next: "fare_agreement_negotiation"
                    },
                    {
                        text: "Sari bidi.",
                        effect: { end: 'reset' }
                    }
                ]
            },
            fare_agreement_success: {
                speaker: "Driver B",
                text: "Barthini, banni. Meter plus hattu kodi.",
                choices: [
                    {
                        text: "Sari banni, hogona.",
                        effect: { respect: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "Yes, let's go.",
                        effect: { respect: 0 },
                        next: "level_complete"
                    },
                    {
                        text: "Hogu hogu!",
                        effect: { respect: -10 },
                        next: "fare_agreement_failure"
                    },
                    {
                        text: "Oota aytha?",
                        effect: { respect: 5 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    2: {
        title: "The Navigation Maze",
        scenario: "The auto driver is taking a 'shortcut' through narrow gullies. You need to give precise directions.",
        background: "assets/hero.png",
        dialogue: {
            engagement: {
                speaker: "Driver",
                text: "Saar, layout olgade hogona?",
                choices: [
                    {
                        text: "Haudu, nēra hogi.",
                        effect: { respect: 10, patience: 5 },
                        next: "first_turn"
                    },
                    {
                        text: "Yes, go straight.",
                        effect: { respect: 0, patience: 0 },
                        next: "first_turn"
                    },
                    {
                        text: "Alli nillisi!",
                        effect: { respect: -5, patience: -10 },
                        next: "first_turn"
                    },
                    {
                        text: "Bega hogi!",
                        effect: { respect: -5, patience: -5 },
                        next: "first_turn"
                    }
                ]
            },
            first_turn: {
                speaker: "Driver",
                text: "Illi left ah, right ah?",
                choices: [
                    {
                        text: "Edagade thagonli.",
                        effect: { respect: 15, patience: 10 },
                        next: "destination_near"
                    },
                    {
                        text: "Go right.",
                        effect: { respect: 0, patience: 0 },
                        next: "wrong_way"
                    },
                    {
                        text: "Sita hogi.",
                        effect: { respect: -5, patience: -5 },
                        next: "wrong_way"
                    },
                    {
                        text: "Balagade thagonli.",
                        effect: { respect: 5 },
                        next: "wrong_way"
                    }
                ]
            },
            wrong_way: {
                speaker: "Driver",
                text: "Saar, munde daari illa!",
                choices: [
                    {
                        text: "Swalpa hindhe banni.",
                        effect: { respect: 10, patience: 5 },
                        next: "first_turn"
                    },
                    {
                        text: "Go back.",
                        effect: { respect: 0, patience: -5 },
                        next: "first_turn"
                    },
                    {
                        text: "Kirik beda!",
                        effect: { respect: -10, patience: -10 },
                        next: "level_failed"
                    },
                    {
                        text: "Oota aytha?",
                        effect: { respect: -5, patience: -20 },
                        next: "level_failed"
                    }
                ]
            },
            destination_near: {
                speaker: "Driver",
                text: "Destination banthu saar.",
                choices: [
                    {
                        text: "Illi nillisi, dhanyavada.",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "Stop here, thanks.",
                        effect: { respect: 0 },
                        next: "level_complete"
                    },
                    {
                        text: "Hoguthira?",
                        effect: { respect: -5 },
                        next: "destination_near"
                    },
                    {
                        text: "Swalpa adjust maadi.",
                        effect: { respect: -5 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    3: {
        title: "The Household Hero",
        scenario: "You are coordinating with your domestic help at the door.",
        background: "assets/hero.png",
        dialogue: {
            engagement: {
                speaker: "Domestic Help",
                text: "Saar, kasa elli haakbeku?",
                choices: [
                    {
                        text: "Horagade haaki.",
                        effect: { respect: 10 },
                        next: "cleaning_task"
                    },
                    {
                        text: "Put it outside.",
                        effect: { respect: 0 },
                        next: "cleaning_task"
                    },
                    {
                        text: "Nela oresu.",
                        effect: { respect: -5 },
                        next: "cleaning_task"
                    },
                    {
                        text: "Bagilu tegey.",
                        effect: { respect: -5 },
                        next: "cleaning_task"
                    }
                ]
            },
            cleaning_task: {
                speaker: "Domestic Help",
                text: "Floor clean maadi aaythu. Next yenu?",
                choices: [
                    {
                        text: "Paathre tolee.",
                        effect: { respect: 10 },
                        next: "payment"
                    },
                    {
                        text: "Wash the dishes.",
                        effect: { respect: 0 },
                        next: "payment"
                    },
                    {
                        text: "Batte ogey.",
                        effect: { respect: 5 },
                        next: "payment"
                    },
                    {
                        text: "Kudlu chikkadagi maadi.",
                        effect: { respect: -15 },
                        next: "payment"
                    }
                ]
            },
            payment: {
                speaker: "Domestic Help",
                text: "Saar, duddu kodi.",
                choices: [
                    {
                        text: "Eshtu aaguthe?",
                        effect: { respect: 10 },
                        next: "level_complete"
                    },
                    {
                        text: "How much?",
                        effect: { respect: 0 },
                        next: "level_complete"
                    },
                    {
                        text: "Change illa.",
                        effect: { respect: -5 },
                        next: "level_complete"
                    },
                    {
                        text: "Sari bidi.",
                        effect: { respect: -5 },
                        next: "level_complete"
                    }
                ]
            }
        }
    },
    4: {
        title: "The Macha Promotion",
        scenario: "You meet a colleague or driver you know well. Time for some brotherhood.",
        background: "assets/hero.png",
        dialogue: {
            engagement: {
                speaker: "Macha",
                text: "Yen guru, yen samachar?",
                choices: [
                    {
                        text: "Oota aytha maga?",
                        effect: { respect: 20 },
                        next: "the_vibe"
                    },
                    {
                        text: "What's up bro?",
                        effect: { respect: 5 },
                        next: "the_vibe"
                    },
                    {
                        text: "Swalpa busy iddini.",
                        effect: { respect: -5 },
                        next: "the_vibe"
                    },
                    {
                        text: "Yenu beda.",
                        effect: { respect: -10 },
                        next: "the_vibe"
                    }
                ]
            },
            the_vibe: {
                speaker: "Macha",
                text: "Sakkath aagide guru!",
                choices: [
                    {
                        text: "Bombaat!",
                        effect: { respect: 15 },
                        next: "farewell"
                    },
                    {
                        text: "Great!",
                        effect: { respect: 5 },
                        next: "farewell"
                    },
                    {
                        text: "Dabba service.",
                        effect: { respect: -20 },
                        next: "farewell"
                    },
                    {
                        text: "Kirik maadi.",
                        effect: { respect: -15 },
                        next: "farewell"
                    }
                ]
            },
            farewell: {
                speaker: "Macha",
                text: "Sari, naale sigona.",
                choices: [
                    {
                        text: "Hogi bartini!",
                        effect: { respect: 15 },
                        next: "level_complete"
                    },
                    {
                        text: "Bye bye.",
                        effect: { respect: 0 },
                        next: "level_complete"
                    },
                    {
                        text: "Nanu hogthini.",
                        effect: { respect: -5 },
                        next: "level_complete"
                    },
                    {
                        text: "Off-aago!",
                        effect: { respect: -30 },
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
    dialogueText.innerText = step.text;
    choicesContainer.innerHTML = '';

    step.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice.text;
        btn.onclick = () => handleChoice(choice);
        choicesContainer.appendChild(btn);
    });
}

function handleChoice(choice) {
    saveHistory(state.currentStep);
    if (choice.effect) {
        if (choice.effect.respect) state.respect = Math.min(100, Math.max(0, state.respect + choice.effect.respect));
        if (choice.effect.patience) state.patience = Math.min(100, Math.max(0, state.patience + choice.effect.patience));
        if (choice.effect.end === 'reset') {
            location.reload();
            return;
        }
    }

    updateUI();
    if (choice.next) {
        state.currentStep = choice.next;
        showDialogue(choice.next);
    }
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

    const isLastLevel = state.level === Object.keys(levels).length;

    scene.innerHTML = `
        <div class="scene-intro">
            <h1>Level ${state.level} Complete!</h1>
            <p class="scenario-text">Congratulations! You successfully cleared the scenario.</p>
            <p class="stat-summary">Final Respect: ${state.respect} (${document.getElementById('respect-rank').innerText})</p>
            ${isLastLevel ?
            `<p class='scenario-text'>You are a true Macha! Bengaluru welcomes you.</p><button onclick="location.reload()" class="primary-btn">Play Again</button>` :
            `<button id="next-level-btn" class="primary-btn">Next Level</button>`}
        </div>
    `;

    if (!isLastLevel) {
        document.getElementById('next-level-btn').onclick = startNextLevel;
    }

    scene.classList.remove('hidden');
}

document.getElementById('start-btn').onclick = () => {
    updateBackground();
    showDialogue('engagement');
};

// Initial UI sync
updateUI();
updateBackground();
