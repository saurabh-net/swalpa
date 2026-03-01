/**
 * SWALPA Daily Activity Logger
 * Tracks the volume of engagement per calendar day to render the Consistency Heatmap.
 */

export function logActivity(points = 1) {
    try {
        const today = new Date().toLocaleDateString('en-CA'); // 'YYYY-MM-DD' local time
        let log = StorageManager.load('swalpa_activity_log') || {};

        if (!log[today]) {
            log[today] = 0;
        }

        log[today] += points;
        StorageManager.save('swalpa_activity_log', log);

        console.log(`[SWALPA] Activity logged for ${today}: +${points} (Total: ${log[today]})`);
    } catch (e) {
        console.error("Failed to log SWALPA activity:", e);
    }
}

export function getActivityLog() {
    try {
        return StorageManager.load('swalpa_activity_log') || {};
    } catch (e) {
        console.error("Failed to parse SWALPA activity log:", e);
    }
    return {};
}

// Make globally available for inline scripts that cannot use modules easily
window.swalpaLogActivity = logActivity;
window.swalpaGetActivityLog = getActivityLog;
