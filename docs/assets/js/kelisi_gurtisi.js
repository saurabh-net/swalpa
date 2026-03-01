/**
 * Kelisi & Gurtisi (Listen & Identify)
 * Audio-based mini-game for SWALPA.
 */

const GAME_DATA = [
    { kan: "ನನಗೆ ಕಾಫಿ ಬೇಕು", eng: "I want coffee.", audio: "nuh-nuh-GEY_coffee_BAY-koo" },
    { kan: "ಇಲ್ಲ ಸರ್", eng: "No sir.", audio: "ILL-lah" },
    { kan: "ನೇರ ಹೋಗಿ", eng: "Go straight.", audio: "NAY-rah_HOH-gee" },
    { kan: "ಎಷ್ಟು ಆಯ್ತು?", eng: "How much did it cost?", audio: "ESH-too_AAH-goo-they" },
    { kan: "ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡಿ", eng: "Please adjust a little.", audio: "SWAL-pah_adjust_MAA-dee" },
    { kan: "ಊಟ ಆಯ್ತಾ?", eng: "Had your meal?", audio: "OO-tah_EYE-tah" },
    { kan: "ನನಗೆ ಗೊತ್ತಿಲ್ಲ", eng: "I don't know.", audio: "nuh-nuh-GEY_goh-TILL-lah" },
    { kan: "ಚೆನ್ನಾಗಿದ್ದೀರಾ?", eng: "Are you fine?", audio: "chen-nah-GID-dee-nee" },
    { kan: "ಬೇಡ", eng: "Don't want / No need.", audio: "BAY-dah" },
    { kan: "ಸರಿ", eng: "Okay / Alright.", audio: "SUH-ree" },
    { kan: "ಬನ್ನಿ", eng: "Come (respectful).", audio: "BUN-nee" },
    { kan: "ಹೋಗೋಣ", eng: "Let's go.", audio: "HOH-goo" },
    { kan: "ಆಮೇಲೆ ಸಿಗೋಣ", eng: "Let's meet later.", audio: "AAH-may-ley" },
    { kan: "ಬೇಗ ಬನ್ನಿ", eng: "Come fast.", audio: "NAA-ley_BAY-lig-gey_BUN-nee" },
    { kan: "ನಿಲ್ಲಿಸಿ", eng: "Stop.", audio: "NIL-lee-see" },
    { kan: "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ", eng: "Speak in Kannada.", audio: "kun-nuh-duh-DULL-lee" },
    { kan: "ಬಲಗಡೆ ತಗೊಳ್ಳಿ", eng: "Take a right.", audio: "buh-luh-GAH-dey" },
    { kan: "ಎಡಗಡೆ", eng: "To the left.", audio: "ay-duh-GAH-dey" },
    { kan: "ಒಂದು ಸರಿ", eng: "Yes.", audio: "ON-doo" },
    { kan: "ತುಂಬಾ ಧನ್ಯವಾದ", eng: "Thank you.", audio: "THOOM-bah" }
];

let state = {
    score: 0,
    round: 1,
    maxRounds: 10,
    currentPhrase: null,
    options: [],
    timer: 10,
    timerInterval: null,
    isPlaying: false
};

const gameAudio = new Audio();

function initGame() {
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
        startBtn.onclick = startGame;
    }
}

function startGame() {
    state.score = 0;
    state.round = 1;
    state.isPlaying = true;

    document.getElementById('game-start-screen').classList.add('hidden');
    document.getElementById('game-play-screen').classList.remove('hidden');
    document.getElementById('game-over-screen').classList.add('hidden');

    nextRound();
}

function nextRound() {
    if (state.round > state.maxRounds) {
        endGame();
        return;
    }

    // Update UI
    document.getElementById('current-round').innerText = state.round;
    document.getElementById('current-score').innerText = state.score;

    // Select phrase
    state.currentPhrase = GAME_DATA[Math.floor(Math.random() * GAME_DATA.length)];

    // Create options
    state.options = [state.currentPhrase.eng];
    while (state.options.length < 4) {
        const randomPhrase = GAME_DATA[Math.floor(Math.random() * GAME_DATA.length)].eng;
        if (!state.options.includes(randomPhrase)) {
            state.options.push(randomPhrase);
        }
    }

    // Shuffle options
    state.options.sort(() => Math.random() - 0.5);

    // Render choices
    const container = document.getElementById('choices-container');
    container.innerHTML = '';
    state.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        container.appendChild(btn);
    });

    // Reset and start timer
    startTimer();
    playAudio();
}

function playAudio() {
    const voiceDir = window.swalpaStorage.load('swalpa_voice_dir') || 'audio_native_v4_male';
    gameAudio.src = `/assets/${voiceDir}/${state.currentPhrase.audio}.mp3`;
    gameAudio.play().catch(e => console.error("Audio error:", e));
}

function startTimer() {
    clearInterval(state.timerInterval);
    state.timer = 10;
    const bar = document.getElementById('timer-bar');
    bar.style.width = '100%';

    state.timerInterval = setInterval(() => {
        state.timer -= 0.1;
        bar.style.width = `${(state.timer / 10) * 100}%`;

        if (state.timer <= 0) {
            clearInterval(state.timerInterval);
            checkAnswer(null); // Time's up
        }
    }, 100);
}

function checkAnswer(selected) {
    clearInterval(state.timerInterval);

    const isCorrect = selected === state.currentPhrase.eng;
    const choices = document.querySelectorAll('.choice-btn');

    choices.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === state.currentPhrase.eng) {
            btn.classList.add('correct');
        } else if (btn.innerText === selected) {
            btn.classList.add('wrong');
        }
    });

    if (isCorrect) {
        const points = Math.ceil(state.timer * 10);
        state.score += points;
        showFeedback('Correct! +' + points, 'correct');
    } else {
        showFeedback("Wrong! It was: " + state.currentPhrase.eng, 'wrong');
    }

    setTimeout(() => {
        state.round++;
        nextRound();
    }, 1500);
}

function showFeedback(text, type) {
    const el = document.getElementById('game-feedback');
    el.innerText = text;
    el.className = 'game-feedback ' + type;
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 1200);
}

function endGame() {
    state.isPlaying = false;
    document.getElementById('game-play-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = state.score;

    // Save Score
    if (window.saveHighScore) {
        saveHighScore('kelisi-gurtisi', state.score);
    }

    // Log Activity
    if (window.swalpaLogActivity) {
        window.swalpaLogActivity(5);
    }
}

document.addEventListener('DOMContentLoaded', initGame);
window.playGameAudio = playAudio; // For the replay button
