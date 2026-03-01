/**
 * SWALPA Authentication Logic
 * Refers to window.StorageManager and userbase SDK.
 */

window.AuthManager = {
    async signUp(username, password) {
        try {
            const user = await userbase.signUp({ username, password, rememberMe: 'local' });
            window.StorageManager.user = user;
            await window.StorageManager.syncUp(); // Migrate local progress to new account
            window.StorageManager._notifySyncChange();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },

    async signIn(username, password) {
        try {
            const user = await userbase.signIn({ username, password, rememberMe: 'local' });
            window.StorageManager.user = user;
            await window.StorageManager.syncDown();
            window.StorageManager._notifySyncChange();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },

    async logout() {
        try {
            await userbase.signOut();
            window.StorageManager.user = null;
            window.StorageManager._notifySyncChange();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }
};
