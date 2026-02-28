document.addEventListener('DOMContentLoaded', () => {
    // Unregister any lingering Service Workers from previous PWA setups
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.unregister();
            }
        });
    }

    // Dynamically import progress module so it works across all site pages
    import('/assets/js/progress.js').then(module => {
        const progress = module.calculateProgress();

        // Find the MkDocs header title area to inject the progress UI
        const headerTitle = document.querySelector('.md-header__title');

        if (headerTitle) {
            // Extract emoji and name
            const rankParts = progress.rank.title.split(' ');
            const emoji = rankParts[0];
            const rankName = rankParts.slice(1).join(' ');

            const progressUi = `
                <div class="swalpa-header-progress" title="${progress.percentToNext}% to ${progress.nextRank ? progress.nextRank.title : 'Max Rank'}" onclick="window.location.href='/profile/'">
                    <span class="shp-emoji">${emoji}</span>
                    <span class="shp-rank">${rankName}</span>
                    
                    <div class="shp-bar-wrapper">
                        <div class="shp-bar-fill" style="width: ${progress.percentToNext}%;"></div>
                    </div>
                    
                    <span class="shp-percent">${progress.percentToNext}%</span>
                </div>
            `;

            // Insert the progress UI next to the site title
            headerTitle.insertAdjacentHTML('afterend', progressUi);
        }
    }).catch(err => {
        console.error("SWALPA: Could not load progress indicator in header.", err);
    });
});
