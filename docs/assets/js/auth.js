/**
 * SWALPA Authentication Logic
 * Refers to window.swalpaStorage and userbase SDK.
 */

window.AuthManager = {
    async signUp(username, password) {
        try {
            const user = await window.userbase.signUp({ username, password, rememberMe: 'local' });
            window.swalpaStorage.user = user;
            await window.swalpaStorage.syncUp(); // Migrate local progress to new account
            window.swalpaStorage._notifySyncChange();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },

    async signIn(username, password) {
        try {
            const user = await window.userbase.signIn({ username, password, rememberMe: 'local' });
            window.swalpaStorage.user = user;
            await window.swalpaStorage.syncDown();
            window.swalpaStorage._notifySyncChange();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },

    async logout() {
        try {
            await window.userbase.signOut();
            window.swalpaStorage.user = null;
            window.swalpaStorage._notifySyncChange();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }
};
