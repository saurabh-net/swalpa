/**
 * SWALPA Share Feature Library 
 * Spawns a custom Share Modal with explicit platform options (WhatsApp, X, Copy)
 */

window.triggerShare = function (text, url = '') {
    const fullMessage = url ? `${text}\n\n${url}` : text;
    // Fallback URL if none provided, extract from text if possible or default to homepage
    const shareUrl = url || "https://swalpa.org";

    showShareModal(fullMessage, shareUrl);
};

function showShareModal(text, url) {
    let modal = document.getElementById('swalpa-share-modal-overlay');
    if (!modal) {
        // Create the Overlay
        modal = document.createElement('div');
        modal.id = 'swalpa-share-modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(8px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        // Create the Modal Container
        const container = document.createElement('div');
        container.id = 'swalpa-share-modal-container';
        container.style.cssText = `
            background: linear-gradient(180deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 30px;
            width: 90%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            transform: translateY(30px);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-family: 'Outfit', sans-serif;
            color: #F8FAFC;
        `;

        // Create the inner HTML
        container.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 10px;">📤</div>
            <h2 style="margin-top: 0; margin-bottom: 15px; font-weight: 700; color: #FFF;">Share the Knowledge</h2>
            
            <div class="share-preview-box"></div>

            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button class="share-modal-btn" id="modal-share-wa" style="background: #25D366; color: white;">
                    <span style="font-size: 18px;">📲</span> Share on WhatsApp
                </button>
                <button class="share-modal-btn" id="modal-share-x" style="background: #000; color: white; border: 1px solid rgba(255,255,255,0.2);">
                    <span style="font-size: 18px;">𝕏</span> Share on X
                </button>
                <button class="share-modal-btn" id="modal-share-copy" style="background: rgba(255,255,255,0.1); color: white;">
                    <span style="font-size: 18px;">📋</span> Copy message
                </button>
            </div>
            <button id="modal-share-close" style="margin-top: 25px; background: none; border: none; color: rgba(255,255,255,0.5); text-decoration: underline; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 14px;">Cancel</button>
        `;

        // Required CSS for the buttons
        const style = document.createElement('style');
        style.innerHTML = `
            .share-modal-btn {
                padding: 14px;
                border: none;
                border-radius: 12px;
                font-family: 'Outfit', sans-serif;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, filter 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                width: 100%;
            }
            .share-modal-btn:hover {
                transform: translateY(-2px);
                filter: brightness(1.1);
            }
            .share-modal-btn:active {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);

        modal.appendChild(container);
        document.body.appendChild(modal);

        // Click handlers for closing
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeShareModal();
        });
        document.getElementById('modal-share-close').addEventListener('click', closeShareModal);
    }

    // Wait for DOM to append before accessing
    setTimeout(() => {
        // Hydrate the preview box
        const previewBox = modal.querySelector('.share-preview-box');
        if (previewBox) {
            // Escape HTML just in case
            const safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            // Highlight URLs subtly
            const formattedText = safeText.replace(/(https?:\/\/[^\s]+)/g, '<span style="color:var(--md-primary-fg-color); text-decoration: underline; opacity:0.8">$1</span>');
            previewBox.innerHTML = `<div class="share-preview-content">${formattedText.replace(/\\n/g, '<br>')}</div>`;
        }
    }, 0);

    // Attach listeners for specific payloads (rebinding to current text)
    const waBtn = document.getElementById('modal-share-wa');
    const xBtn = document.getElementById('modal-share-x');
    const copyBtn = document.getElementById('modal-share-copy');

    // Clone and replace to remove old listeners
    const cleanWaBtn = waBtn.cloneNode(true);
    const cleanXBtn = xBtn.cloneNode(true);
    const cleanCopyBtn = copyBtn.cloneNode(true);

    waBtn.parentNode.replaceChild(cleanWaBtn, waBtn);
    xBtn.parentNode.replaceChild(cleanXBtn, xBtn);
    copyBtn.parentNode.replaceChild(cleanCopyBtn, copyBtn);

    cleanWaBtn.addEventListener('click', () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        closeShareModal();
    });

    cleanXBtn.addEventListener('click', () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        closeShareModal();
    });

    cleanCopyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(text).then(() => {
            const original = cleanCopyBtn.innerHTML;
            cleanCopyBtn.innerHTML = `<span style="font-size: 18px;">✅</span> Copied!`;
            setTimeout(() => {
                closeShareModal();
                cleanCopyBtn.innerHTML = original;
            }, 1500);
        });
    });

    // Show the modal
    modal.style.pointerEvents = 'auto';

    // Force reflow
    void modal.offsetWidth;
    modal.style.opacity = '1';
    document.getElementById('swalpa-share-modal-container').style.transform = 'translateY(0)';
}

function closeShareModal() {
    const modal = document.getElementById('swalpa-share-modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        document.getElementById('swalpa-share-modal-container').style.transform = 'translateY(30px)';
        modal.style.pointerEvents = 'none';
    }
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

    window.triggerShare(msg, "https://swalpa.org/profile");
};

// Auto-hydrate static share widgets on Lesson Pages with an inline preview box
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.swalpa-share-widget').forEach(widget => {
        const btn = widget.querySelector('.swalpa-share-button');
        if (btn && !widget.querySelector('.share-preview-box')) {
            const onclickAttr = btn.getAttribute('onclick');
            if (!onclickAttr) return;

            // Extract string literal from triggerShare('...')
            const match = onclickAttr.match(/window\.triggerShare\(['"](.*)['"]\)/);
            if (match && match[1]) {
                const rawText = match[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
                const safeText = rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const formattedText = safeText.replace(/(https?:\/\/[^\s]+)/g, '<span style="color:var(--md-primary-fg-color); text-decoration: underline; opacity:0.8">$1</span>');

                const preview = document.createElement('div');
                preview.className = 'share-preview-box';
                preview.innerHTML = `<div class="share-preview-content">${formattedText.replace(/\\n/g, '<br>')}</div>`;

                widget.insertBefore(preview, btn);
            }
        }
    });
});
