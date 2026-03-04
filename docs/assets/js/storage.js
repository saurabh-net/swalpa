/**
 * SWALPA Storage Manager
 * Handles local-first persistence with Firebase cloud sync.
 */

class SwalpaStorageManager {
    constructor() {
        this.user = null;
        this.isSyncing = false;
        this.syncCallbacks = [];
        this.unsubscribe = null;
    }

    async init() {
        if (!window.auth) {
            console.error('Firebase Auth not found.');
            return;
        }

        // Listen for authentication state changes
        window.auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.user = user;
                console.log('Firebase user logged in:', user.email);
            } else {
                this.user = null;
                if (this.unsubscribe) {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            }
            this._notifySyncChange();
        });
    }

    /**
     * Save data to local storage and sync to cloud if logged in.
     */
    async save(key, data) {
        // 1. Always save to localStorage immediately for speed/offline use
        const timestampedData = {
            _data: data,
            _updatedAt: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(timestampedData));

        // 2. Sync to Firestore if logged in
        if (this.user) {
            try {
                await window.db.collection('users')
                    .doc(this.user.uid)
                    .collection('progress')
                    .doc(key)
                    .set(timestampedData);
            } catch (e) {
                console.error(`Firebase save failed for ${key}:`, e);
            }
        }
    }

    /**
     * Load data from local storage.
     */
    load(key) {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        try {
            const parsed = JSON.parse(raw);
            return (parsed && parsed._data !== undefined) ? parsed._data : parsed;
        } catch (e) {
            return raw;
        }
    }

    /**
     * Remove data from local storage.
     */
    remove(key) {
        localStorage.removeItem(key);
        // Optional: Could also remove from Firestore if needed, 
        // but typically 'removing state' in these games is a reset, 
        // and we might want to keep the cloud backup or overwrite it later.
    }

    /**
     * Fetch all items from Firestore and completely overwrite localStorage.
     */
    async syncDown() {
        if (!this.user) return { success: false, error: 'Not logged in' };
        this.isSyncing = true;
        this._notifySyncChange();

        try {
            const querySnapshot = await window.db.collection('users')
                .doc(this.user.uid)
                .collection('progress')
                .get();

            querySnapshot.forEach((doc) => {
                const key = doc.id;
                const cloudData = doc.data();
                localStorage.setItem(key, JSON.stringify(cloudData));
            });

            this.isSyncing = false;
            this._notifySyncChange();
            window.dispatchEvent(new CustomEvent('swalpa-data-synced'));
            return { success: true };
        } catch (e) {
            console.error('Firebase pull failed:', e);
            this.isSyncing = false;
            this._notifySyncChange();
            return { success: false, error: e.message };
        }
    }

    /**
     * Push all local SWALPA data to cloud.
     */
    async syncUp() {
        if (!this.user) return { success: false, error: 'Not logged in' };
        this.isSyncing = true;
        this._notifySyncChange();

        try {
            const swalpaKeys = Object.keys(localStorage).filter(key =>
                key.startsWith('swalpa_') || key.includes('_haaki_') || key.includes('_maadi_')
            );

            for (const key of swalpaKeys) {
                const data = this.load(key);
                await this.save(key, data);
            }

            this.isSyncing = false;
            this._notifySyncChange();
            return { success: true };
        } catch (e) {
            console.error('Firebase push failed:', e);
            this.isSyncing = false;
            this._notifySyncChange();
            return { success: false, error: e.message };
        }
    }

    onSyncChange(callback) {
        this.syncCallbacks.push(callback);
    }

    _notifySyncChange() {
        const status = {
            isLoggedIn: !!this.user,
            username: this.user ? this.user.email.split('@')[0] : null,
            isSyncing: this.isSyncing
        };
        this.syncCallbacks.forEach(cb => cb(status));

        // Dispatch global event for iframes (games) to listen to
        window.dispatchEvent(new CustomEvent('swalpa-data-synced', { detail: status }));
    }
}

// Global instance
window.swalpaStorage = new SwalpaStorageManager();
document.addEventListener('DOMContentLoaded', () => window.swalpaStorage.init());
