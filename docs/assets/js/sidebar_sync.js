/**
 * sidebar_sync.js
 * Injects lesson completion checkmarks into the sidebar navigation.
 * Mimics hellointerview.com style: icon on the left of the title.
 */

(function () {
    function updateSidebarCheckmarks() {
        // Only run if swalpaStorage is ready
        if (!window.swalpaStorage) {
            setTimeout(updateSidebarCheckmarks, 100);
            return;
        }

        const completedArr = window.swalpaStorage.load('swalpa_completed_lessons') || [];
        const navLinks = document.querySelectorAll('a.md-nav__link');

        navLinks.forEach(link => {
            // Check if link text starts with a number like "1. ", "10. "
            const text = link.textContent.trim();
            const lessonMatch = text.match(/^(\d{1,2})\.\s/);

            if (lessonMatch) {
                const lessonId = lessonMatch[1].padStart(2, '0');
                const isCompleted = completedArr.includes(lessonId);

                // Find or create checkmark container
                let check = link.querySelector('.swalpa-sidebar-check');
                if (!check) {
                    check = document.createElement('span');
                    link.prepend(check);
                }

                // Update state and icon
                check.className = `swalpa-sidebar-check ${isCompleted ? 'completed' : 'pending'}`;
                check.innerHTML = isCompleted
                    ? `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
                    : `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;

                // Ensure proper layout
                link.style.display = 'flex';
                link.style.alignItems = 'center';
                link.style.gap = '10px';
            }
        });
    }

    // Run on load and after short delay for MkDocs dynamic navigation
    window.addEventListener('load', updateSidebarCheckmarks);
    document.addEventListener('DOMContentLoaded', updateSidebarCheckmarks);

    // Listen for storage changes to update live
    window.addEventListener('swalpa_storage_change', updateSidebarCheckmarks);
})();
