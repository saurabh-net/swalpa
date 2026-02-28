document.addEventListener('DOMContentLoaded', () => {
    const showKey = 'swalpa_completed_lessons';

    // Helper to get array of completed lesson IDs
    function getCompletedLessons() {
        const str = localStorage.getItem(showKey);
        return str ? JSON.parse(str) : [];
    }

    const completedLessons = getCompletedLessons();

    // --- 1. Add Navigation Checkmarks ---
    const navLinks = document.querySelectorAll('.md-nav__link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';

        // Check if any completed lesson ID is in the href
        completedLessons.forEach(lessonId => {
            if (href.includes(lessonId)) {
                // Ensure we don't duplicate checkmarks
                if (!link.innerHTML.includes('✅')) {
                    link.innerHTML = link.innerHTML + ' <span style="font-size: 0.9em; margin-left: 6px;" title="Completed">✅</span>';
                }
            }
        });
    });

    // --- 2. Inject "Lesson Finished" Toggle on Lesson Pages ---
    const mainContent = document.querySelector('.md-content__inner');
    // Regex for grabbing something like "01_history_and_nuances" from "/01_history_and_nuances/"
    const lessonMatch = window.location.pathname.match(/\/(0[1-9]|10)_([a-zA-Z0-9_]+)\/?/);

    if (mainContent && lessonMatch) {
        const currentLessonId = lessonMatch[0].replace(/\//g, ''); // e.g. "01_history_and_nuances"

        // Prevent duplicate injection
        if (!document.getElementById('lesson-finish-toggle-wrapper')) {
            const toggleWrapper = document.createElement('div');
            toggleWrapper.id = 'lesson-finish-toggle-wrapper';
            toggleWrapper.className = 'swalpa-phonetic-toggle-wrapper subtle-top-toggle';
            // Custom styling for bottom placement
            toggleWrapper.style.marginTop = '40px';
            toggleWrapper.style.paddingTop = '20px';
            toggleWrapper.style.borderTop = '1px solid var(--md-typeset-table-color)';
            toggleWrapper.style.justifyContent = 'flex-start';
            toggleWrapper.style.gap = '16px';
            toggleWrapper.style.maxWidth = '100%';

            toggleWrapper.innerHTML = `
                <span class="swalpa-toggle-label" style="font-weight: 700;">✅ Mark Lesson as Finished</span>
                <label class="swalpa-toggle-switch">
                    <input type="checkbox" id="lesson-finish-toggle-checkbox">
                    <span class="swalpa-slider"></span>
                </label>
                <span style="font-size: 12px; color: #94A3B8; margin-left: auto;">Awards 100 Respect Points</span>
            `;

            mainContent.appendChild(toggleWrapper);

            const checkbox = document.getElementById('lesson-finish-toggle-checkbox');
            const isCompleted = completedLessons.includes(currentLessonId);
            checkbox.checked = isCompleted;

            checkbox.addEventListener('change', (e) => {
                let currentArr = getCompletedLessons();

                if (e.target.checked) {
                    if (!currentArr.includes(currentLessonId)) {
                        currentArr.push(currentLessonId);
                    }
                } else {
                    currentArr = currentArr.filter(id => id !== currentLessonId);
                }

                localStorage.setItem(showKey, JSON.stringify(currentArr));

                // Reload to instantly update header rank and nav checkmarks
                window.location.reload();
            });
        }
    }
});
