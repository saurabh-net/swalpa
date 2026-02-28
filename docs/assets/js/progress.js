/**
 * progress.js
 * Calculates global "Respect Points" and "Bangalore Guru" rank.
 */

import { getHighScores } from './scores.js';

const RANKS = [
    { title: "🌱 Tourist", threshold: 0, desc: "Just arrived at Majestic. Confused but curious." },
    { title: "💻 Techie", threshold: 100, desc: "Can find the nearest Filter Kaapi. Know the metro lines." },
    { title: "🏠 Resident", threshold: 500, desc: "You don't need Google Maps for Indiranagar anymore." },
    { title: "🛵 Ooru Local", threshold: 1500, desc: "You can negotiate with any auto driver. Legend." },
    { title: "👑 Bangalore Guru", threshold: 3000, desc: "Namma Ooru is your kingdom. You speak the language of the streets." }
];

export function calculateProgress() {
    const scores = getHighScores();
    let totalPoints = 0;

    // Lessons: 100 points per completed lesson
    const completedStr = localStorage.getItem('swalpa_completed_lessons');
    if (completedStr) {
        try {
            const completedArr = JSON.parse(completedStr);
            totalPoints += (completedArr.length * 100);
        } catch (e) { }
    }

    // Suffix Station: 1 point per point
    totalPoints += scores['suffix-station'] || 0;

    // Meter Haaki: level * 100 + respect
    if (scores['meter-haaki']) {
        totalPoints += (scores['meter-haaki'].level * 100) + (scores['meter-haaki'].respect || 0);
    }

    // Adjust Maadi: level * 100 + respect
    if (scores['adjust-maadi']) {
        totalPoints += (scores['adjust-maadi'].level * 100) + (scores['adjust-maadi'].respect || 0);
    }

    // Determine Rank
    let currentRank = RANKS[0];
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (totalPoints >= RANKS[i].threshold) {
            currentRank = RANKS[i];
            break;
        }
    }

    // Find next rank for percentage
    const nextRankIndex = RANKS.indexOf(currentRank) + 1;
    let percentToNext = 100;
    if (nextRankIndex < RANKS.length) {
        const range = RANKS[nextRankIndex].threshold - currentRank.threshold;
        const progress = totalPoints - currentRank.threshold;
        percentToNext = Math.min(Math.round((progress / range) * 100), 99);
    }

    return {
        totalPoints,
        rank: currentRank,
        percentToNext,
        nextRank: nextRankIndex < RANKS.length ? RANKS[nextRankIndex] : null
    };
}
