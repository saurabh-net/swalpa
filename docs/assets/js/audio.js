/**
 * Audio Pronunciation Script for SWALPA
 * Finds all ⟨phonetic⟩ tags, converts them, and handles audio playback.
 */

document.addEventListener("DOMContentLoaded", function () {
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

    audioElement.addEventListener('ended', function() {
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('audio-playing');
            currentPlayingButton = null;
        }
    });

    audioElement.addEventListener('error', function(e) {
        console.error("Audio playback error:", e);
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('audio-playing');
            currentPlayingButton = null;
        }
    });

    // Strategy: find all text nodes and replace the bracketed text with interactive span.
    // To do this safely without breaking other HTML, we use a TreeWalker.
    
    // We only want to search within article content to avoid messing up navigation/headers
    const articleContent = document.querySelector('.md-content');
    if (!articleContent) return;

    const walker = document.createTreeWalker(
        articleContent,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodesToReplace = [];
    let node;
    while(node = walker.nextNode()) {
        // Skip text inside scripts, styles, or already processed links
        const parentTag = node.parentNode.tagName.toLowerCase();
        if (parentTag === 'script' || parentTag === 'style' || node.parentNode.classList.contains('audio-phonetic-link')) {
            continue;
        }
        
        if (pattern.test(node.nodeValue)) {
            nodesToReplace.push(node);
        }
    }

    // Now replace the nodes
    nodesToReplace.forEach(textNode => {
        const text = textNode.nodeValue;
        const fragment = document.createDocumentFragment();
        
        let lastIndex = 0;
        let match;
        // reset regex index
        pattern.lastIndex = 0;
        
        while ((match = pattern.exec(text)) !== null) {
            // Text before the match
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
            }
            
            const phoneticText = match[1].trim();
            const safeFilename = getSafeFilename(phoneticText);
            
            // Create interactive button
            const btn = document.createElement('button');
            btn.className = 'audio-phonetic-link';
            btn.title = 'Listen to pronunciation';
            
            // Reconstruct the display text with the speaker icon
            btn.innerHTML = `<span class="audio-icon">🔊</span>⟨${phoneticText}⟩`;
            
            // Calculate relative path to audio directory depending on where we are
            // mkdocs builds flattening directories, but our assets are at base_url/assets/audio/
            // Get the base url from a mkdocs meta tag typically present, or assume relative from root
            const rootDomain = window.location.origin + window.location.pathname.substring(0, window.location.pathname.indexOf('/', 1) > 0 ? window.location.pathname.indexOf('/', 1) : window.location.pathname.length);
            
            // Mkdocs uses relative links, so a robust way is to use document root logic from mkdocs scripts
            // or simply use absolute path from site root if we know the deployment base path.
            // For swalpa github pages: /swalpa/assets/... 
            // We can determine base path by looking at an existing asset link:
            const stylesheet = document.querySelector('link[rel="stylesheet"][href*="assets/stylesheets/"]');
            let basePath = '/';
            if (stylesheet) {
                const href = stylesheet.getAttribute('href');
                basePath = href.substring(0, href.indexOf('assets/stylesheets/'));
            }

            const audioUrl = `${basePath}assets/audio/${safeFilename}.mp3`;
            
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Stop previous
                if (currentPlayingButton) {
                    currentPlayingButton.classList.remove('audio-playing');
                }
                
                // Play new
                audioElement.src = audioUrl;
                audioElement.play().catch(err => console.log("Playback failed:", err));
                
                // Update UI state
                btn.classList.add('audio-playing');
                currentPlayingButton = btn;
            };
            
            fragment.appendChild(btn);
            lastIndex = pattern.lastIndex;
        }
        
        // Append remaining text
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }
        
        textNode.parentNode.replaceChild(fragment, textNode);
    });
});
