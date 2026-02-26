/**
 * Audio Pronunciation Script for SWALPA
 * Finds all ⟨phonetic⟩ tags, converts them, and handles native Kannada audio playback.
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

            // Always use native Kannada audio
            const audioUrl = `${basePath}assets/audio_native/${safeFilename}.mp3`;

            btn.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (currentPlayingButton) {
                    currentPlayingButton.classList.remove('audio-playing');
                }

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
