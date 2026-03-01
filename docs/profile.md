# 📝 Local Resident Profile

Welcome to your Bangalore progress dashboard! As you complete lessons and navigate street scenarios in the games, you will earn Respect Points (**RP**), rank up, and unlock exclusive badges.

<div id="swalpa-profile-root">
    <!-- The JavaScript will dynamically render the Rank Card and Badge Grid here -->
    <div style="text-align: center; padding: 40px; color: var(--md-default-fg-color--light);">
        <i>Loading profile data... if this remains, ensure JavaScript is enabled and the sync manager is initialized.</i>
    </div>
</div>

<!-- Auth Modal (Hidden by default) -->
<div id="swalpa-auth-modal" class="swalpa-modal" style="display: none;">
    <div class="swalpa-modal-content">
        <span class="close-modal" onclick="closeAuthModal()">&times;</span>
        <div id="auth-form-container">
            <h2 id="auth-title">Enable Cloud Sync</h2>
            <p id="auth-desc">Your progress will be encrypted and available on all your devices.</p>
            <div class="auth-toggle">
                <button id="toggle-to-login" onclick="switchAuthMode('login')">Login</button>
                <button id="toggle-to-signup" onclick="switchAuthMode('signup')" class="active">Sign Up</button>
            </div>
            <form id="swalpa-auth-form" onsubmit="handleAuthSubmit(event)">
                <input type="text" id="auth-username" placeholder="Username" required autocomplete="username">
                <input type="password" id="auth-password" placeholder="Password" required autocomplete="new-password">
                <div id="auth-error" class="auth-error-msg" style="display: none;"></div>
                <button type="submit" id="auth-submit-btn">Create Account & Sync</button>
            </form>
            <p style="font-size: 0.8em; margin-top: 15px; opacity: 0.7;">
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
                if (window.StorageManager && typeof window.StorageManager.load === 'function') {
                    currentStreak = window.StorageManager.load('swalpa_streak') || 1;
                } else {
                    currentStreak = localStorage.getItem('swalpa_streak') || 1;
                }
                
                let html = '';

                // 0. Cloud Sync Status Card
                if (syncStatus) {
                    html += `
                        <div class="swalpa-sync-card ${syncStatus.isLoggedIn ? 'synced' : 'guest'}">
                            <div class="sync-info">
                                <h3>${syncStatus.isLoggedIn ? '✅ Cloud Sync Active' : '☁️ Sync Your Progress'}</h3>
                                <p>${syncStatus.isLoggedIn 
                                    ? `Logged in as <b>${syncStatus.username}</b>. Your data is encrypted and synced.` 
                                    : 'Your progress is currently saved only on this browser. Enable sync to access it anywhere.'}
                                </p>
                            </div>
                            <div class="sync-actions">
                                ${syncStatus.isLoggedIn 
                                    ? `<button class="sync-btn logout" onclick="AuthManager.logout()">Logout</button>` 
                                    : `<button class="sync-btn login" onclick="openAuthModal()">Enable Cloud Sync</button>`}
                            </div>
                        </div>
                    `;
                }
                
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
        };

        // Initial render
        renderProfile();

        // Listen for sync status changes
        if (window.StorageManager) {
            window.StorageManager.onSyncChange((status) => {
                renderProfile(status);
            });
            // Also listen for data refresh from cloud
            window.addEventListener('swalpa-data-synced', () => renderProfile());
            
            // If already initialized, update UI
            if (window.StorageManager.user || window.StorageManager.isSyncing !== undefined) {
               renderProfile({ 
                   isLoggedIn: !!window.StorageManager.user, 
                   username: window.StorageManager.user ? window.StorageManager.user.username : null,
                   isSyncing: window.StorageManager.isSyncing 
               });
            }
        }
        });
    });

    // --- Auth UI Helpers ---
    window.openAuthModal = function() {
        document.getElementById('swalpa-auth-modal').style.display = 'flex';
        switchAuthMode('signup');
    }

    window.closeAuthModal = function() {
        document.getElementById('swalpa-auth-modal').style.display = 'none';
        document.getElementById('auth-error').style.display = 'none';
    }

    window.switchAuthMode = function(mode) {
        authMode = mode;
        const title = document.getElementById('auth-title');
        const desc = document.getElementById('auth-desc');
        const btn = document.getElementById('auth-submit-btn');
        const sgTab = document.getElementById('toggle-to-signup');
        const lgTab = document.getElementById('toggle-to-login');

        if (mode === 'signup') {
            title.innerText = 'Create Progress Account';
            desc.innerText = 'Keep your badges and lessons safe in the cloud.';
            btn.innerText = 'Create Account & Sync';
            sgTab.classList.add('active');
            lgTab.classList.remove('active');
        } else {
            title.innerText = 'Cloud Sync Login';
            desc.innerText = 'Resume your progress from another device.';
            btn.innerText = 'Login & Restore Progress';
            lgTab.classList.add('active');
            sgTab.classList.remove('active');
        }
    }

    window.handleAuthSubmit = async function(e) {
        e.preventDefault();
        const user = document.getElementById('auth-username').value;
        const pass = document.getElementById('auth-password').value;
        const errorEl = document.getElementById('auth-error');
        const btn = document.getElementById('auth-submit-btn');

        errorEl.style.display = 'none';
        btn.disabled = true;
        btn.innerText = 'Connecting...';

        let result;
        if (authMode === 'signup') {
            result = await AuthManager.signUp(user, pass);
        } else {
            result = await AuthManager.signIn(user, pass);
        }

        if (result.success) {
            closeAuthModal();
        } else {
            errorEl.innerText = result.error;
            errorEl.style.display = 'block';
            btn.disabled = false;
            btn.innerText = authMode === 'signup' ? 'Create Account & Sync' : 'Login & Restore Progress';
        }
    }
</script>
