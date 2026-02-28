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

        // Ensure modules are available
        Promise.all([
            import('/assets/js/progress.js'),
            import('/assets/js/activity.js')
        ]).then(([progModule, actModule]) => {
            const calculateProgress = progModule.calculateProgress;
            const getActivityLog = actModule.getActivityLog;
            
            const progress = calculateProgress();
            const activityLog = getActivityLog();
            const unlockedBadges = window.getUnlockedBadges ? window.getUnlockedBadges() : [];
            const badgeDefs = window.BADGE_DEFINITIONS || {};

        // 1. Build the Rank Header Card
        const currentStreak = window.localStorage.getItem('swalpa_streak') || 1;
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
            
            <!-- Heatmap Integration -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
                <h3 style="margin-top: 0; margin-bottom: 12px; font-family: Outfit, sans-serif; font-size: 16px; color: var(--md-default-fg-color--light);">Consistency (Last 90 Days)</h3>
                <div class="swalpa-heatmap-container">
                    <div class="heatmap-grid">
        `;
        
        // Generate last 90 days array
        const todayD = new Date();
        const dates = [];
        for(let i=89; i>=0; i--) {
            const d = new Date(todayD);
            d.setDate(d.getDate() - i);
            dates.push(d.toLocaleDateString('en-CA'));
        }
        
        for(const dStr of dates) {
            const count = activityLog[dStr] || 0;
            let level = 0;
            if(count > 0) level = 1;
            if(count >= 3) level = 2;
            if(count >= 6) level = 3;
            if(count >= 10) level = 4;
            
            html += `<div class="heatmap-cell level-${level}" title="${count} actions on ${dStr}"></div>`;
        }
        
        html += `
                    </div>
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
