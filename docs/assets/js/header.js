document.addEventListener('DOMContentLoaded', () => {
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
                <div title="${progress.percentToNext}% to ${progress.nextRank ? progress.nextRank.title : 'Max Rank'}" 
                     style="display: flex; align-items: center; margin-left: 12px; background: rgba(0,0,0,0.2); padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: background 0.2s;" 
                     onclick="window.location.href='/'"
                     onmouseover="this.style.background='rgba(0,0,0,0.4)'"
                     onmouseout="this.style.background='rgba(0,0,0,0.2)'">
                     
                    <span style="font-size: 14px; margin-right: 6px;">${emoji}</span>
                    <span style="font-size: 13px; font-weight: 700; color: #FFD700; margin-right: 8px; white-space: nowrap; font-family: 'Outfit', sans-serif;">${rankName}</span>
                    
                    <div style="width: 40px; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden; margin-right: 6px; display: flex;">
                        <div style="width: ${progress.percentToNext}%; height: 100%; background: #FFD700;"></div>
                    </div>
                    
                    <span style="font-size: 10px; color: #fff; opacity: 0.9; font-weight: 600; font-family: 'Inter', sans-serif;">${progress.percentToNext}%</span>
                </div>
            `;

            // Insert the progress UI next to the site title
            headerTitle.insertAdjacentHTML('afterend', progressUi);
        }
    }).catch(err => {
        console.error("SWALPA: Could not load progress indicator in header.", err);
    });
});
