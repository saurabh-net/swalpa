# 📝 Local Resident Profile

Welcome to your Bangalore progress dashboard! As you complete lessons and navigate street scenarios in the games, you will earn Respect Points (**RP**), rank up, and unlock exclusive badges.

<div id="swalpa-profile-root">
    <!-- The JavaScript will dynamically render the Rank Card and Badge Grid here -->
    <div style="text-align: center; padding: 40px; color: var(--md-default-fg-color--light);">
        <i>Loading profile data... if this remains, ensure JavaScript is enabled.</i>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.getElementById('swalpa-profile-root');
        if (!root) return;

        // Ensure progress module is available (we might need to dynamically import it if it remains a module)
        import('/assets/js/progress.js').then(module => {
            const calculateProgress = module.calculateProgress;
            
            const progress = calculateProgress();
            const unlockedBadges = window.getUnlockedBadges ? window.getUnlockedBadges() : [];
            const badgeDefs = window.BADGE_DEFINITIONS || {};

        // 1. Build the Rank Header Card
        const currentStreak = window.localStorage.getItem('swalpa_streak') || 0;
        let html = `
            <div class="swalpa-profile-card">
                <div class="swalpa-profile-rank-header">
                    <div class="sp-emoji">${progress.rank.title.split(' ')[0]}</div>
                    <div class="sp-details">
                        <h2>${progress.rank.title.split(' ').slice(1).join(' ')}</h2>
                        <div class="sp-points">
                            ${progress.totalPoints} <span>RP</span>
                            <span style="opacity: 0.5; margin: 0 8px;">|</span>
                            🔥 ${currentStreak} <span style="font-size: 0.8em">Day Streak</span>
                        </div>
                    </div>
                </div>
                <div class="swalpa-profile-progress-bar">
                    <div class="sp-fill" style="width: ${progress.percentToNext}%"></div>
                </div>
                <div class="swalpa-profile-progress-text">
                    ${progress.nextRank ? `<b>${progress.percentToNext}%</b> progress to ${progress.nextRank.title}` : 'Maximum Rank Achieved! You are a true Bangalorean.'}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
                <button class="swalpa-share-button profile-share-btn" onclick="
                    const arr = [${unlockedBadges.slice(0, 3).map(id => `{emoji: '${badgeDefs[id].emoji}', title: '${badgeDefs[id].title}'}`).join(',')}];
                    window.triggerProfileShare('${progress.rank.title}', window.localStorage.getItem('swalpa_streak'), arr);
                ">
                    <span class="share-icon">📤</span> Share My Progress
                </button>
            </div>
            
            <h2 style="margin-top: 40px; margin-bottom: 20px;">🏆 Achiever Badges</h2>
            <div class="swalpa-badge-grid">
        `;

        // 2. Build the Badge Grid
        for (const [id, badge] of Object.entries(badgeDefs)) {
            const isUnlocked = unlockedBadges.includes(id);
            const statusClass = isUnlocked ? 'unlocked' : 'locked';
            
            // If locked, we show a generic lock icon instead of the custom emoji to build mystery
            const displayEmoji = isUnlocked ? badge.emoji : '🔒';
            
            html += `
                <div class="swalpa-badge ${statusClass}">
                    <div class="badge-icon">${displayEmoji}</div>
                    <div class="badge-title">${badge.title}</div>
                    <div class="badge-desc">${badge.description}</div>
                </div>
            `;
        }

        html += `</div>`; // Close grid
        root.innerHTML = html;
        });
    });
</script>
