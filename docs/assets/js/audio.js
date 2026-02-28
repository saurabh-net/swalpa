/**
 * Audio Pronunciation Script for SWALPA
 * Finds all ⟨phonetic⟩ tags, converts them, and handles native Kannada audio playback.
 */

// Immediately apply hidden state to prevent flashing
if (localStorage.getItem('swalpa_show_phonetics') !== 'true') {
    document.documentElement.classList.add('hide-phonetics');
}

document.addEventListener("DOMContentLoaded", function () {
    const articleContent = document.querySelector('.md-content');
    if (!articleContent) return;

    // --- Voice Style Preference ---
    const swalpaAudioVoiceKey = 'swalpa_voice_dir';
    // Default to the new Chirp3 Male Voice
    let currentVoiceDir = localStorage.getItem(swalpaAudioVoiceKey) || 'audio_native_v4_male';
    // --- End Voice Style Preference ---
    // We need to parse text nodes finding the pattern ⟨...⟩
    const pattern = /⟨([^⟩]+)⟩/g;

    // Function to safely create a filename-compatible string from phonetic text
    // Matches the logic in generate_audio.py
    function getSafeFilename(text) {
        let safe = text.replace(/[^a-zA-Z0-9_\-]/g, '_');
        safe = safe.replace(/_+/g, '_').replace(/^_|_$/g, '');
        return safe;
    }

    // A single audio element reused for playback
    const audioElement = new Audio();
    let currentPlayingButton = null;

    audioElement.addEventListener('ended', function () {
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('audio-playing');
            currentPlayingButton = null;
        }
    });

    // --- Theme-Aware Branding ---
    const updateBranding = () => {
        const isDark = document.body.getAttribute('data-md-color-scheme') === 'slate';
        const themeColor = isDark ? 'yellow' : 'red';

        let basePath = '/';
        const scriptTag = document.querySelector('script[src*="assets/js/audio.js"]');
        if (scriptTag) {
            const src = scriptTag.getAttribute('src');
            basePath = src.substring(0, src.indexOf('assets/js/audio.js'));
        }

        // Update Favicon
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = `${basePath}assets/img/favicon_${themeColor}.png`;
        }

        // Update Header Logo
        const logo = document.querySelector('.md-header__button.md-logo img');
        if (logo) {
            logo.src = `${basePath}assets/img/logo_${themeColor}.png`;
        }

        console.log(`[SWALPA Branding] Applied ${themeColor} theme assets`);
    };

    // Listen for theme changes (MkDocs Material uses a mutation on body)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
                updateBranding();
            }
        });
    });
    observer.observe(document.body, { attributes: true });

    // Initial call
    updateBranding();

    audioElement.addEventListener('error', function (e) {
        console.error("Audio playback error:", e);
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('audio-playing');
            currentPlayingButton.classList.add('audio-failed');
            // Show a temporary "broken" state
            setTimeout(() => {
                currentPlayingButton.classList.remove('audio-failed');
            }, 2000);
            currentPlayingButton = null;
        }
        showToast("Audio failed to load. Please refresh.");
    });

    function showToast(message) {
        let toast = document.querySelector('.swalpa-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'swalpa-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3000);
    }

    // Strategy: find all text nodes and replace the bracketed text with interactive span.
    // To do this safely without breaking other HTML, we use a TreeWalker.

    const walker = document.createTreeWalker(
        articleContent,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodesToReplace = [];
    let node;
    while (node = walker.nextNode()) {
        const parentTag = node.parentNode.tagName.toLowerCase();
        if (parentTag === 'script' || parentTag === 'style' || node.parentNode.classList.contains('audio-phonetic-link')) {
            continue;
        }

        if (pattern.test(node.nodeValue)) {
            nodesToReplace.push(node);
        }
    }

    nodesToReplace.forEach(textNode => {
        const text = textNode.nodeValue;
        const fragment = document.createDocumentFragment();

        let lastIndex = 0;
        let match;
        pattern.lastIndex = 0;

        while ((match = pattern.exec(text)) !== null) {
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
            }

            const phoneticText = match[1].trim();
            const safeFilename = getSafeFilename(phoneticText);

            const btn = document.createElement('button');
            btn.className = 'audio-phonetic-link';
            btn.title = 'Listen to pronunciation';
            btn.innerHTML = `<span class="audio-icon">🔊</span>⟨${phoneticText}⟩`;

            // --- Robust Path Resolution ---
            // Try to find the common assets path prefix
            let basePath = '/';
            const stylesheet = document.querySelector('link[rel="stylesheet"][href*="assets/stylesheets/"]');
            const scriptTag = document.querySelector('script[src*="assets/js/audio.js"]');

            if (stylesheet) {
                const href = stylesheet.getAttribute('href');
                basePath = href.substring(0, href.indexOf('assets/stylesheets/'));
            } else if (scriptTag) {
                const src = scriptTag.getAttribute('src');
                basePath = src.substring(0, src.indexOf('assets/js/audio.js'));
            }

            const audioUrl = `${basePath}assets/${currentVoiceDir}/${safeFilename}.mp3`;
            console.log(`[SWALPA Audio] Found: ${phoneticText}, URL: ${audioUrl}`);

            // --- Preloading Strategy ---
            const preloadAudio = () => {
                if (!btn.dataset.preloaded) {
                    const linter = new Audio();
                    linter.preload = 'auto';
                    linter.src = audioUrl;
                    btn.dataset.preloaded = 'true';
                    console.log(`[SWALPA Audio] Preloading: ${phoneticText}`);
                }
            };

            btn.onmouseenter = preloadAudio;
            btn.ontouchstart = preloadAudio;

            btn.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();

                console.log(`[SWALPA Audio] Playing: ${audioUrl}`);

                if (currentPlayingButton) {
                    currentPlayingButton.classList.remove('audio-playing');
                }

                audioElement.src = audioUrl;
                audioElement.play().then(() => {
                    console.log(`[SWALPA Audio] Playback started: ${audioUrl}`);
                }).catch(err => {
                    console.error(`[SWALPA Audio] Playback failed: ${audioUrl}`, err);
                });

                btn.classList.add('audio-playing');
                currentPlayingButton = btn;
            };

            fragment.appendChild(btn);
            lastIndex = pattern.lastIndex;
        }

        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }

        textNode.parentNode.replaceChild(fragment, textNode);
    });

    // --- Global Phonetic Toggle (Only on Lessons 1-10) ---
    const mainContent = document.querySelector('.md-content__inner');
    const isLessonPage = /^\/(0[1-9]|10)_/.test(window.location.pathname);

    if (mainContent && isLessonPage && !document.querySelector('.swalpa-phonetic-toggle-wrapper')) {
        const toggleWrapper = document.createElement('div');
        toggleWrapper.className = 'swalpa-phonetic-toggle-wrapper subtle-top-toggle';
        toggleWrapper.innerHTML = `
            <span class="swalpa-toggle-label">Phonetics & Audio</span>
            <label class="swalpa-toggle-switch">
                <input type="checkbox" id="phonetic-toggle-checkbox">
                <span class="swalpa-slider"></span>
            </label>
        `;
        // Find the first h1 to insert after
        const firstH1 = mainContent.querySelector('h1');
        if (firstH1) {
            firstH1.parentNode.insertBefore(toggleWrapper, firstH1.nextSibling);
        } else {
            mainContent.insertBefore(toggleWrapper, mainContent.firstChild);
        }

        const showKey = 'swalpa_show_phonetics';
        const checkbox = document.getElementById('phonetic-toggle-checkbox');

        // Initialize state (defaults to false/hidden)
        const isShown = localStorage.getItem(showKey) === 'true';
        checkbox.checked = isShown;

        if (!isShown) {
            document.body.classList.add('hide-phonetics');
        }

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                localStorage.setItem(showKey, 'true');
                document.body.classList.remove('hide-phonetics');
            } else {
                localStorage.setItem(showKey, 'false');
                document.body.classList.add('hide-phonetics');
            }
        });
    }
});
