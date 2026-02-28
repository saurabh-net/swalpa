/**
 * SWALPA Share Feature Library 
 * Uses navigator.share on mobile and fallback to clipboard copy on desktop.
 */

window.triggerShare = function (text) {
    if (navigator.share) {
        navigator.share({
            title: 'Learn Bangalore Kannada on SWALPA',
            text: text
        }).catch(console.error);
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            showShareToast();
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    }
};

function showShareToast() {
    let toast = document.getElementById('swalpa-share-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'swalpa-share-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #F8FAFC;
            padding: 12px 24px;
            border-radius: 30px;
            font-family: 'Outfit', sans-serif;
            font-size: 15px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        toast.innerHTML = `<span style="font-size: 18px">📋</span> Copied to clipboard!`;
        document.body.appendChild(toast);
    }

    // Force reflow
    void toast.offsetWidth;
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3000);
}

/**
 * Triggers native share for the user profile, capturing their rank, streak, and badges.
 */
window.triggerProfileShare = function (rankStr, streak, badgesArr) {
    let msg = `🏆 I'm exploring Namma Bengaluru with SWALPA!\n\n`;
    if (rankStr) {
        msg += `Rank: ${rankStr}\n`;
    }
    if (streak && parseInt(streak) > 0) {
        msg += `Streak: 🔥 ${streak} Days\n`;
    }
    if (badgesArr && badgesArr.length > 0) {
        msg += `Badges Unlocked: ${badgesArr.map(b => b.emoji + ' ' + b.title).join(', ')}\n`;
    }

    msg += `\nLearn practical Bangalore Kannada at https://swalpa.org 🚀`;
    window.triggerShare(msg);
};
