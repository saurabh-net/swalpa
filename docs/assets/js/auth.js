/**
 * SWALPA Authentication Logic
 * Refers to window.swalpaStorage and Firebase SDK.
 */

window.AuthManager = {
    async signInWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await window.auth.signInWithPopup(provider);
            window.swalpaStorage.user = result.user;
            await window.swalpaStorage.syncDown();
            window.swalpaStorage._notifySyncChange();
            return { success: true };
        } catch (e) {
            console.error("Google Sign-In failed:", e);
            return { success: false, error: e.message, code: e.code };
        }
    },

    async logout() {
        try {
            await window.auth.signOut();
            window.swalpaStorage.user = null;
            window.swalpaStorage._notifySyncChange();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }
};
