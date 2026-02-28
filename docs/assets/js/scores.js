/**
 * scores.js
 * Persistent local high-score tracking for SWALPA games.
 */

const SCORES_KEY = 'swalpa_high_scores';

export function getHighScores() {
    const scores = localStorage.getItem(SCORES_KEY);
    return scores ? JSON.parse(scores) : {
        'suffix-station': 0,
        'meter-haaki': { level: 0, respect: 0 },
        'adjust-maadi': { level: 0, respect: 0 }
    };
}

export function saveHighScore(gameId, data) {
    const scores = getHighScores();

    if (gameId === 'suffix-station') {
        if (data > scores['suffix-station']) {
            scores['suffix-station'] = data;
        }
    } else {
        // Meter Haaki or Adjust Maadi
        if (!scores[gameId] || data.level > scores[gameId].level) {
            scores[gameId] = data;
        } else if (data.level === scores[gameId].level && data.respect > scores[gameId].respect) {
            scores[gameId].respect = data.respect;
        }
    }

    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
    return scores;
}
