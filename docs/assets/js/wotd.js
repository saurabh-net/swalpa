/**
 * SWALPA Word of the Day & Streak Tracker
 */

const WOTD_PHRASES = [
    { kan: "ಕಾಫಿ ಬೇಕು", dKan: "Coffee bēku", eng: "I want coffee.", audio: "phrase_coffee_beku" },
    { kan: "ಇಲ್ಲ ಸರ್", dKan: "Illa saar", eng: "No sir.", audio: "phrase_illa_saar" },
    { kan: "ಮುಂದೆ ಹೋಗಿ", dKan: "Munde hogi", eng: "Go straight.", audio: "phrase_munde_hogi" },
    { kan: "ಎಷ್ಟು ಆಯ್ತು?", dKan: "Eshtu aaythu?", eng: "How much did it cost?", audio: "phrase_eshtu_aaythu" },
    { kan: "ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡಿ", dKan: "Swalpa adjust maadi", eng: "Please adjust a little.", audio: "phrase_swalpa_adjust" },
    { kan: "ಊಟ ಆಯ್ತಾ?", dKan: "Oota aaytha?", eng: "Had your meal?", audio: "phrase_oota_aaytha" },
    { kan: "ನನಗೆ ಗೊತ್ತಿಲ್ಲ", dKan: "Nanage gothilla", eng: "I don't know.", audio: "phrase_nanage_gothilla" },
    { kan: "ಚೆನ್ನಾಗಿದ್ದೀರಾ?", dKan: "Chennagiddira?", eng: "Are you fine?", audio: "phrase_chennagiddira" },
    { kan: "ಬೇಡ", dKan: "Bēda", eng: "Don't want / No need.", audio: "word_beda" },
    { kan: "ಸರಿ", dKan: "Sari", eng: "Okay / Alright.", audio: "word_sari" },
    { kan: "ಬನ್ನಿ", dKan: "Banni", eng: "Come (respectful).", audio: "word_banni" },
    { kan: "ಹೋಗೋಣ", dKan: "Hogona", eng: "Let's go.", audio: "word_hogona" },
    { kan: "ಆಮೇಲೆ ಸಿಗೋಣ", dKan: "Aamele sigona", eng: "Let's meet later.", audio: "phrase_aamele_sigona" },
    { kan: "ಬೇಗ ಬನ್ನಿ", dKan: "Bēga banni", eng: "Come fast.", audio: "phrase_bega_banni" },
    { kan: "ನಿಲ್ಲಿಸಿ", dKan: "Nillisi", eng: "Stop.", audio: "word_nillisi" },
    { kan: "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ", dKan: "Kannadadalli maathanaadi", eng: "Speak in Kannada.", audio: "phrase_kannada_maathanaadi" },
    { kan: "ಬಲಕ್ಕೆ ತಗೊಳ್ಳಿ", dKan: "Balakke thagolli", eng: "Take a right.", audio: "phrase_balakke_thagolli" },
    { kan: "ಎಡಕ್ಕೆ", dKan: "Edakke", eng: "To the left.", audio: "word_edakke" }
];

// Helper to get consistent hash based on the date string
function getDeterministicWordIndex(dateStr) {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % WOTD_PHRASES.length;
}

// Ensure the WSD (Words Service Dictionary) audio is ready
const wotdAudio = new Audio();
window.playWotdAudio = function (filename) {
    const voiceDir = localStorage.getItem('swalpa_voice_dir') || 'audio_native_v4_male';
    wotdAudio.src = `/assets/${voiceDir}/${filename}.mp3`;
    wotdAudio.play().catch(e => console.log("WOTD Audio play failed:", filename));
};

function initWotd() {
    const root = document.getElementById('swalpa-wotd-root');
    if (!root) return; // Only process if the container exists (homepage)

    const todayDateObj = new Date();
    // Use local YYYY-MM-DD
    const todayStr = `${todayDateObj.getFullYear()}-${(todayDateObj.getMonth() + 1).toString().padStart(2, '0')}-${todayDateObj.getDate().toString().padStart(2, '0')}`;

    // Streak Calculation
    let lastVisitStr = localStorage.getItem('swalpa_last_visit');
    let streakCount = parseInt(localStorage.getItem('swalpa_streak')) || 0;

    if (!lastVisitStr) {
        // First visit
        streakCount = 1;
    } else if (lastVisitStr !== todayStr) {
        // Did they miss a day?
        const lastVisitDate = new Date(lastVisitStr + 'T00:00:00');
        const differenceInTime = todayDateObj.getTime() - lastVisitDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

        if (differenceInDays === 1) {
            streakCount++;
        } else {
            // Broke the streak (or time traveled backwards in testing)
            streakCount = 1;
        }
        localStorage.setItem('swalpa_last_visit', todayStr);
        localStorage.setItem('swalpa_streak', streakCount.toString());

        // Evaluate Streak Badges
        if (window.unlockBadge) {
            if (streakCount >= 2) window.unlockBadge('regular_giraki');
            if (streakCount >= 5) window.unlockBadge('dedicated_shishya');
        }

        // Select Word
        const wordIndex = getDeterministicWordIndex(todayStr);
        const phrase = WOTD_PHRASES[wordIndex];

        // Render HTML
        const isActiveStreak = streakCount > 1;
        const streakIcon = isActiveStreak ? '🔥' : '⏳';

        // Add toast to show it's interactive
        root.innerHTML = `
        <div class="swalpa-wotd-container" onclick="playWotdAudio('${phrase.audio}')">
            <div class="swalpa-wotd-header">
                <h3>Word of the Day</h3>
                <div class="swalpa-streak-pill ${isActiveStreak ? 'active' : ''}" title="Your daily streak">
                    <span class="streak-icon">${streakIcon}</span>
                    <span class="streak-count">${streakCount} ${streakCount === 1 ? 'Day' : 'Days'}</span>
                </div>
            </div>
            
            <div class="swalpa-wotd-body">
                <div class="swalpa-wotd-kan">${phrase.kan}</div>
                <div class="swalpa-wotd-dkan">⟨${phrase.dKan}⟩</div>
                <div class="swalpa-wotd-eng">"${phrase.eng}"</div>
                
                <div class="swalpa-wotd-play">
                    <span class="audio-icon">🔊</span> Tap to Play
                </div>
            </div>
        </div>
    `;
    }

    document.addEventListener('DOMContentLoaded', initWotd);
