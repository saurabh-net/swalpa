/**
 * SWALPA Module Loader
 * Loads shared modules and handles initialization for MkDocs site pages.
 */

// Load core modules and attach to window
import('/assets/js/activity.js');
import('/assets/js/badges.js');
import('/assets/js/scores.js');

// Selective Sidebar Expansion: Keep 'Engage' open by default
document.addEventListener("DOMContentLoaded", () => {
    const labels = document.querySelectorAll('.md-nav__link');
    labels.forEach(label => {
        if (label.innerText.trim() === 'Engage') {
            const checkbox = document.getElementById(label.getAttribute('for'));
            if (checkbox) checkbox.checked = true;
        }
    });
});
