/**
 * SWALPA Daily Activity Logger
 * Tracks the volume of engagement per calendar day to render the Consistency Heatmap.
 */

export function logActivity(points = 1) {
    try {
        const today = new Date().toLocaleDateString('en-CA'); // 'YYYY-MM-DD' local time
        const logStr = localStorage.getItem('swalpa_activity_log');
        let log = {};

        if (logStr) {
            log = JSON.parse(logStr);
        }

        if (!log[today]) {
            log[today] = 0;
        }

        log[today] += points;
        localStorage.setItem('swalpa_activity_log', JSON.stringify(log));

        console.log(`[SWALPA] Activity logged for ${today}: +${points} (Total: ${log[today]})`);
    } catch (e) {
        console.error("Failed to log SWALPA activity:", e);
    }
}

export function getActivityLog() {
    try {
        const logStr = localStorage.getItem('swalpa_activity_log');
        if (logStr) {
            return JSON.parse(logStr);
        }
    } catch (e) {
        console.error("Failed to parse SWALPA activity log:", e);
    }
    return {};
}

// Make globally available for inline scripts that cannot use modules easily
window.swalpaLogActivity = logActivity;
window.swalpaGetActivityLog = getActivityLog;
