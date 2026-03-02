/**
 * scores.js
 * Persistent local high-score tracking for SWALPA games.
 */

const SCORES_KEY = 'swalpa_high_scores';

export function getHighScores() {
    const scores = window.swalpaStorage.load(SCORES_KEY);
    return scores || {
        'suffix-station': 0,
        'meter-haaki': { level: 0, respect: 0 },
        'adjust-maadi': { level: 0, respect: 0 },
        'kelisi-gurtisi': 0
    };
}

export async function saveHighScore(gameId, data) {
    const scores = getHighScores();

    if (gameId === 'suffix-station') {
        if (data > scores['suffix-station']) {
            scores['suffix-station'] = data;
        }
    } else {
        // Meter Haaki or Adjust Maadi or Kelisi Gurtisi
        if (!scores[gameId]) {
            scores[gameId] = data;
        } else if (typeof data === 'number') {
            if (data > scores[gameId]) {
                scores[gameId] = data;
            }
        } else if (data.level > scores[gameId].level) {
            scores[gameId] = data;
        } else if (data.level === scores[gameId].level && data.respect > scores[gameId].respect) {
            scores[gameId].respect = data.respect;
        }
    }

    return await window.swalpaStorage.save(SCORES_KEY, scores);
}
