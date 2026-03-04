# 📝 Nanna Profile

Welcome to your Bangalore progress dashboard! As you complete lessons and navigate street scenarios in the games, you will earn Respect Points (**RP**), rank up, and unlock exclusive badges.

<div id="swalpa-profile-root">
    <!-- The JavaScript will dynamically render the Rank Card and Badge Grid here -->
    <div style="text-align: center; padding: 40px; color: var(--md-default-fg-color--light);">
        <i>Loading profile data... if this remains, ensure JavaScript is enabled and the sync manager is initialized.</i>
    </div>
</div>

<!-- Phrase of the Day Section -->
<div id="swalpa-wotd-root" style="margin-top: 50px; margin-bottom: 20px;"></div>

<!-- Auth Modal (Hidden by default) -->
<div id="swalpa-auth-modal" class="swalpa-modal" style="display: none;">
    <div class="swalpa-modal-content" style="max-width: 400px; text-align: center; padding: 40px;">
        <span class="close-modal" onclick="closeAuthModal()">&times;</span>
        <div id="auth-form-container">
            <h2 id="auth-title" style="margin-top: 0;">Enable Cloud Sync</h2>
            <p id="auth-desc" style="margin-bottom: 30px; opacity: 0.8;">Securely sync your respect points and badges across all your devices using your Google account.</p>
            
            <button id="google-signin-btn" onclick="handleGoogleSignIn()" class="swalpa-google-btn">
                <img src="../assets/img/google-icon.svg" alt="Google">
                <span>Sign in with Google</span>
            </button>

            <div id="auth-error" class="auth-error-msg" style="display: none; margin-top: 20px; color: #ff5252;"></div>
            
            <p style="font-size: 0.8em; margin-top: 30px; opacity: 0.6;">
                Note: This account is for progress sync only. Comments still use GitHub.
            </p>
        </div>
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
            
            const renderProfile = (syncStatus = null) => {
                const progress = calculateProgress();
                const activityLog = getActivityLog();
                const unlockedBadges = window.getUnlockedBadges ? window.getUnlockedBadges() : [];
                const badgeDefs = window.BADGE_DEFINITIONS || {};
                
                let currentStreak = 1;
                if (window.swalpaStorage && typeof window.swalpaStorage.load === 'function') {
                    currentStreak = window.swalpaStorage.load('swalpa_streak') || 1;
                } else {
                    currentStreak = localStorage.getItem('swalpa_streak') || 1;
                }
                
                let html = '';

                // Skip placing sync card here (moved to bottom)
                
                html += `
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
        const badgeEntries = Object.entries(badgeDefs);
        // Sort: unlocked first
        badgeEntries.sort((a, b) => {
            const aUnlocked = unlockedBadges.includes(a[0]);
            const bUnlocked = unlockedBadges.includes(b[0]);
            if (aUnlocked && !bUnlocked) return -1;
            if (!aUnlocked && bUnlocked) return 1;
            return 0;
        });

        for (const [id, badge] of badgeEntries) {
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

            // 3. Status/Sync Card (At the bottom, refined)
            const isLoggedIn = syncStatus ? syncStatus.isLoggedIn : (window.swalpaStorage && window.swalpaStorage.user ? true : false);
            const username = syncStatus && syncStatus.username ? syncStatus.username : (window.swalpaStorage && window.swalpaStorage.user ? (window.swalpaStorage.user.username || window.swalpaStorage.user.email.split('@')[0]) : null);

            html += `
                <div class="swalpa-sync-footer ${isLoggedIn ? 'synced' : 'guest'}">
                    <div class="sync-footer-content">
                        <span class="sync-icon">${isLoggedIn ? '☁️' : '☁️'}</span>
                        <span class="sync-text">
                            ${isLoggedIn 
                                ? `Logged in as <b>${username}</b>` 
                                : 'Progress saved locally only'}
                        </span>
                        ${isLoggedIn 
                            ? `<button class="sync-link-btn" onclick="AuthManager.logout()">Logout</button>` 
                            : `<button class="sync-link-btn" onclick="openAuthModal()">Enable Cloud Sync</button>`}
                    </div>
                    ${isLoggedIn ? `
                    <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button id="btn-sync-up" class="swalpa-share-button" style="background: rgba(255,215,0,0.1); color: #FFD700; padding: 8px 16px; font-size: 13px;" onclick="handleManualSync('up')">
                            ⬆️ Push to Cloud
                        </button>
                        <button id="btn-sync-down" class="swalpa-share-button" style="background: rgba(255,255,255,0.05); color: #94A3B8; padding: 8px 16px; font-size: 13px;" onclick="handleManualSync('down')">
                            ⬇️ Pull from Cloud
                        </button>
                    </div>
                    <div id="manual-sync-status" style="margin-top: 10px; font-size: 12px; height: 16px; color: #FFD700; text-align: center;"></div>
                    ` : ''}
                </div>
            `;

        html += `</div>`; // Close grid
        root.innerHTML = html;
        };

        // Initial render
        renderProfile();

        // Listen for sync status changes
        if (window.swalpaStorage) {
            window.swalpaStorage.onSyncChange((status) => {
                renderProfile(status);
            });
            // Also listen for data refresh from cloud
            window.addEventListener('swalpa-data-synced', () => renderProfile());
            
            // If already initialized, update UI
            if (window.swalpaStorage.user || window.swalpaStorage.isSyncing !== undefined) {
               renderProfile({ 
                   isLoggedIn: !!window.swalpaStorage.user, 
                   username: window.swalpaStorage.user ? (window.swalpaStorage.user.username || window.swalpaStorage.user.email.split('@')[0]) : null,
                   isSyncing: window.swalpaStorage.isSyncing 
               });
            }
        }
        });
    });

    // --- Auth UI Helpers ---
    window.openAuthModal = function() {
        document.getElementById('swalpa-auth-modal').style.display = 'flex';
    }

    window.closeAuthModal = function() {
        document.getElementById('swalpa-auth-modal').style.display = 'none';
        document.getElementById('auth-error').style.display = 'none';
    }

    window.handleGoogleSignIn = async function() {
        const errorEl = document.getElementById('auth-error');
        const btn = document.getElementById('google-signin-btn');

        errorEl.style.display = 'none';
        btn.disabled = true;
        btn.classList.add('loading');

        const result = await AuthManager.signInWithGoogle();

        if (result.success) {
            closeAuthModal();
        } else {
            let errorMsg = result.error;
            if (result.code === 'auth/unauthorized-domain' || errorMsg.includes('blocked')) {
                errorMsg = `<b>Domain Authorization Error:</b> This site (swalpa.org) is not authorized in the Firebase console. Please ensure it is added to the "Authorized Domains" list.`;
            }
            errorEl.innerHTML = errorMsg;
            errorEl.style.display = 'block';
            btn.disabled = false;
            btn.classList.remove('loading');
        }
    }

    // --- Manual Sync Helpers ---
    window.handleManualSync = async function(direction) {
        if (!window.swalpaStorage || !window.swalpaStorage.user) return;
        
        const btnUp = document.getElementById('btn-sync-up');
        const btnDown = document.getElementById('btn-sync-down');
        const statusEl = document.getElementById('manual-sync-status');
        
        if (btnUp) btnUp.style.opacity = '0.5';
        if (btnDown) btnDown.style.opacity = '0.5';
        
        statusEl.innerText = direction === 'up' ? "Pushing to cloud..." : "Pulling from cloud...";
        statusEl.style.color = "#94A3B8";
        
        let result;
        if (direction === 'up') {
            result = await window.swalpaStorage.syncUp();
        } else {
            if (!confirm("Warning: Pulling from cloud will OVERWRITE all your local progress on this device. Are you sure?")) {
                if (btnUp) btnUp.style.opacity = '1';
                if (btnDown) btnDown.style.opacity = '1';
                statusEl.innerText = "";
                return;
            }
            result = await window.swalpaStorage.syncDown();
        }
        
        if (result && result.success) {
            statusEl.innerText = direction === 'up' ? "✅ Successfully pushed to cloud!" : "✅ Successfully pulled from cloud!";
            statusEl.style.color = "#10B981"; // success green
            setTimeout(() => {
                if (direction === 'down') {
                    window.location.reload();
                } else {
                    if (btnUp) btnUp.style.opacity = '1';
                    if (btnDown) btnDown.style.opacity = '1';
                    setTimeout(() => statusEl.innerText = "", 3000);
                }
            }, 1000);
        } else {
            statusEl.innerText = "❌ Sync Failed: " + (result ? result.error : "Unknown error");
            statusEl.style.color = "#ff5252"; // error red
            if (btnUp) btnUp.style.opacity = '1';
            if (btnDown) btnDown.style.opacity = '1';
        }
    }
</script>
