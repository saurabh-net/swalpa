/**
 * Audio Pronunciation Script for SWALPA
 * Finds all ⟨phonetic⟩ tags, converts them, and handles native Kannada audio playback.
 */

document.addEventListener("DOMContentLoaded", function () {
    const articleContent = document.querySelector('.md-content');
    if (!articleContent) return;

    // --- Voice Toggle UI ---
    const swalpaAudioVoiceKey = 'swalpa_voice_dir';
    let currentVoiceDir = localStorage.getItem(swalpaAudioVoiceKey) || 'audio_native';

    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'audio-voice-toggle-container';
    toggleContainer.style.marginBottom = '20px';
    toggleContainer.style.padding = '10px';
    toggleContainer.style.backgroundColor = 'var(--md-default-bg-color)';
    toggleContainer.style.border = '1px solid var(--md-default-fg-color--lightest)';
    toggleContainer.style.borderRadius = '4px';

    const toggleLabel = document.createElement('label');
    toggleLabel.htmlFor = 'voice-select';
    toggleLabel.innerText = 'Voice Style: ';
    toggleLabel.style.fontWeight = 'bold';
    toggleLabel.style.marginRight = '10px';

    const voiceSelect = document.createElement('select');
    voiceSelect.id = 'voice-select';

    const optionFemale = document.createElement('option');
    optionFemale.value = 'audio_native';
    optionFemale.text = 'Native Female (Wavenet)';

    const optionMale = document.createElement('option');
    optionMale.value = 'audio_native_v4_male';
    optionMale.text = 'Native Male (Chirp 3 HD)';

    voiceSelect.appendChild(optionFemale);
    voiceSelect.appendChild(optionMale);
    voiceSelect.value = currentVoiceDir;

    voiceSelect.addEventListener('change', function (e) {
        currentVoiceDir = e.target.value;
        localStorage.setItem(swalpaAudioVoiceKey, currentVoiceDir);
    });

    toggleContainer.appendChild(toggleLabel);
    toggleContainer.appendChild(voiceSelect);

    const h1 = articleContent.querySelector('h1');
    if (h1) {
        h1.parentNode.insertBefore(toggleContainer, h1.nextSibling);
    } else {
        articleContent.prepend(toggleContainer);
    }
    // --- End Voice Toggle UI ---

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

            // Get base path from an existing stylesheet link
            const stylesheet = document.querySelector('link[rel="stylesheet"][href*="assets/stylesheets/"]');
            let basePath = '/';
            if (stylesheet) {
                const href = stylesheet.getAttribute('href');
                basePath = href.substring(0, href.indexOf('assets/stylesheets/'));
            }

            // Always use selected native Kannada audio directory
            const getAudioUrl = () => `${basePath}assets/${currentVoiceDir}/${safeFilename}.mp3`;

            btn.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (currentPlayingButton) {
                    currentPlayingButton.classList.remove('audio-playing');
                }

                audioElement.src = getAudioUrl();
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
