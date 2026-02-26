/**
 * Audio Pronunciation Script for SWALPA
 * Finds all ⟨phonetic⟩ tags, converts them, and handles audio playback.
 */

document.addEventListener("DOMContentLoaded", function () {
    const articleContent = document.querySelector('.md-content');
    if (!articleContent) return;

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
    let audioMode = localStorage.getItem('swalpa_audio_mode') || 'phonetic';

    // Add UI toggle for Voice Settings
    function addVoiceToggle() {
        const header = articleContent.querySelector('h1');
        if (!header) return;

        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'voice-settings-container';
        toggleContainer.style = 'margin-bottom: 20px; padding: 10px; background: rgba(0,0,0,0.05); border-radius: 8px; display: flex; align-items: center; gap: 10px; font-size: 0.9em;';

        const label = document.createElement('span');
        label.innerText = 'Voice Style:';
        label.style.fontWeight = 'bold';

        const createRadio = (mode, labelText) => {
            const wrapper = document.createElement('label');
            wrapper.style = 'display: flex; align-items: center; gap: 5px; cursor: pointer;';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'voice_mode';
            input.value = mode;
            input.checked = (audioMode === mode);
            input.onchange = () => {
                audioMode = mode;
                localStorage.setItem('swalpa_audio_mode', mode);
            };
            wrapper.appendChild(input);
            wrapper.appendChild(document.createTextNode(labelText));
            return wrapper;
        };

        toggleContainer.appendChild(label);
        toggleContainer.appendChild(createRadio('phonetic', 'Phonetic (For Learners)'));
        toggleContainer.appendChild(createRadio('native', 'Native (Experimental)'));

        header.after(toggleContainer);
    }

    addVoiceToggle();

    audioElement.addEventListener('ended', function () {
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('audio-playing');
            currentPlayingButton = null;
        }
    });

    audioElement.addEventListener('error', function (e) {
        console.error("Audio playback error:", e);
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('audio-playing');
            currentPlayingButton = null;
        }
    });

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

            // Get base path
            const stylesheet = document.querySelector('link[rel="stylesheet"][href*="assets/stylesheets/"]');
            let basePath = '/';
            if (stylesheet) {
                const href = stylesheet.getAttribute('href');
                basePath = href.substring(0, href.indexOf('assets/stylesheets/'));
            }

            btn.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (currentPlayingButton) {
                    currentPlayingButton.classList.remove('audio-playing');
                }

                // Determine URL based on current mode
                const audioSubdir = (audioMode === 'native') ? 'audio_native' : 'audio';
                const audioUrl = `${basePath}assets/${audioSubdir}/${safeFilename}.mp3`;

                audioElement.src = audioUrl;
                audioElement.play().catch(err => console.log("Playback failed:", err));

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
});
