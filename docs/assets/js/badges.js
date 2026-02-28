/**
 * SWALPA Badge tracking and Toast Notification logic.
 */

const BADGE_DEFINITIONS = {
    'first_lesson': {
        title: 'Filter Coffee First',
        description: 'Finish your very first lesson.',
        emoji: '☕'
    },
    'meter_haaki_pro': {
        title: 'Auto Rickshaw Negotiator',
        description: 'Successfully negotiate a fair fare in Meter Haaki.',
        emoji: '🛺'
    },
    'suffix_scientist': {
        title: 'Suffix Scientist',
        description: 'Master agglutination in the Suffix Station.',
        emoji: '🧩'
    },
    'adjust_maadi_master': {
        title: 'Adjustment Expert',
        description: 'Navigate complex logistics in Adjust Maadi.',
        emoji: '🔧'
    },
    'local_insider': {
        title: 'Local Insider',
        description: 'Complete all lessons in the Slang module.',
        emoji: '🕶️'
    },
    'conversationalist': {
        title: 'The Conversationalist',
        description: 'Engage with the community by exploring the comments.',
        emoji: '💬'
    },
    'proper_local': {
        title: 'Proper Local',
        description: 'Achieve the maximum rank on SWALPA.',
        emoji: '👑'
    },
    'regular_giraki': {
        title: 'Regular Giraki',
        description: 'Hit a 2-day learning streak.',
        emoji: '🔄'
    },
    'dedicated_shishya': {
        title: 'Dedicated Shishya',
        description: 'Achieve a 5-day blazing streak.',
        emoji: '🔥'
    }
};

const STORAGE_KEY = 'swalpa_unlocked_badges';

function getUnlockedBadges() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function saveUnlockedBadges(badges) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(badges));
}

function unlockBadge(badgeId) {
    if (!BADGE_DEFINITIONS[badgeId]) {
        console.warn(`Attempted to unlock unknown badge: ${badgeId}`);
        return;
    }

    const unlocked = getUnlockedBadges();
    if (unlocked.includes(badgeId)) {
        // Already unlocked
        return;
    }

    unlocked.push(badgeId);
    saveUnlockedBadges(unlocked);
    if (window.swalpaLogActivity) window.swalpaLogActivity(3);
    showBadgeToast(badgeId);
}

function showBadgeToast(badgeId) {
    const badge = BADGE_DEFINITIONS[badgeId];
    if (!badge) return;

    let toast = document.getElementById('swalpa-badge-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'swalpa-badge-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: linear-gradient(135deg, #FFD200, #CE1126);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-family: 'Outfit', sans-serif;
            font-size: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(120%);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;

        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <div style="font-size: 32px;">${badge.emoji}</div>
        <div>
            <div style="font-size: 12px; font-weight: 600; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px;">Badge Unlocked!</div>
            <div style="font-size: 18px; font-weight: 700;">${badge.title}</div>
        </div>
    `;

    // Slide in
    // Fast reflow
    void toast.offsetWidth;
    toast.style.transform = 'translateX(0)';

    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
    }, 4000);
}

// Attach to window for global access
window.unlockBadge = unlockBadge;
window.getUnlockedBadges = getUnlockedBadges;
window.BADGE_DEFINITIONS = BADGE_DEFINITIONS;

// Hack to detect interaction with the Giscus iframe for the Conversationalist badge
window.addEventListener('blur', () => {
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame && document.activeElement === giscusFrame) {
        unlockBadge('conversationalist');
    }
});
