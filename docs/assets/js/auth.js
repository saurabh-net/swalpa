/**
 * SWALPA Authentication Logic
 * Refers to window.swalpaStorage and userbase SDK.
 */

window.AuthManager = {
    // Firebase uses email/password. We emulsify username by appending a domain.
    _getUserEmail(username) {
        return `${username.toLowerCase().trim()}@swalpa.app`;
    },

    async signUp(username, password) {
        try {
            const userCredential = await window.auth.createUserWithEmailAndPassword(
                this._getUserEmail(username),
                password
            );
            window.swalpaStorage.user = userCredential.user;
            await window.swalpaStorage.syncUp(); // Migrate local progress to new Firestore account
            window.swalpaStorage._notifySyncChange();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    },

    async signIn(username, password) {
        try {
            const userCredential = await window.auth.signInWithEmailAndPassword(
                this._getUserEmail(username),
                password
            );
            window.swalpaStorage.user = userCredential.user;
            await window.swalpaStorage.syncDown();
            window.swalpaStorage._notifySyncChange();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
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
