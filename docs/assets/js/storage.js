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
                await this.syncDown();
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
     * Fetch all items from Firestore and update localStorage if newer.
     */
    async syncDown() {
        if (!this.user) return;
        this.isSyncing = true;
        this._notifySyncChange();

        try {
            // Real-time listener performance optimization: we only update local if cloud is newer
            this.unsubscribe = window.db.collection('users')
                .doc(this.user.uid)
                .collection('progress')
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const key = doc.id;
                        const cloudData = doc.data();
                        const localRaw = localStorage.getItem(key);

                        let shouldUpdate = true;
                        if (localRaw) {
                            try {
                                const localData = JSON.parse(localRaw);
                                if (localData._updatedAt && cloudData._updatedAt && localData._updatedAt > cloudData._updatedAt) {
                                    shouldUpdate = false;
                                }
                            } catch (e) { }
                        }

                        if (shouldUpdate) {
                            localStorage.setItem(key, JSON.stringify(cloudData));
                        }
                    });
                    this.isSyncing = false;
                    this._notifySyncChange();
                    window.dispatchEvent(new CustomEvent('swalpa-data-synced'));
                }, (error) => {
                    console.error('Firestore listener error:', error);
                    this.isSyncing = false;
                    this._notifySyncChange();
                });
        } catch (e) {
            console.error('Firebase sync down failed:', e);
            this.isSyncing = false;
            this._notifySyncChange();
        }
    }

    /**
     * Push all local SWALPA data to cloud.
     */
    async syncUp() {
        if (!this.user) return;

        const swalpaKeys = Object.keys(localStorage).filter(key =>
            key.startsWith('swalpa_') || key.includes('_haaki_') || key.includes('_maadi_')
        );

        for (const key of swalpaKeys) {
            const data = this.load(key);
            await this.save(key, data);
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
