/**
 * SWALPA Storage Manager
 * Handles local-first persistence with optional Userbase.com cloud sync.
 */

const USERBASE_APP_ID = 'YOUR_USERBASE_APP_ID_HERE'; // Placeholder

class StorageManager {
    constructor() {
        this.user = null;
        this.isSyncing = false;
        this.syncCallbacks = [];
    }

    async init() {
        if (!window.userbase) {
            console.error('Userbase SDK not found.');
            return;
        }

        try {
            if (!window.userbase) throw new Error('Userbase SDK not available');
            const session = await window.userbase.init({ appId: USERBASE_APP_ID });
            if (session.user) {
                this.user = session.user;
                await this.syncDown();
            }
            this._notifySyncChange();
        } catch (e) {
            console.warn('Userbase init failed (Sync disabled):', e.message);
            this._notifySyncChange(); // Still notify so UI can render Guest state
        }
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

        // 2. Sync to Userbase if logged in
        if (this.user) {
            try {
                await window.userbase.putItem({
                    databaseName: 'swalpa_progress',
                    item: timestampedData,
                    itemId: key
                });
            } catch (e) {
                console.error(`Cloud save failed for ${key}:`, e);
                // We don't block on failure; localStorage is the primary source
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
            return raw; // Fallback for plain strings
        }
    }

    /**
     * Fetch all items from Userbase and update localStorage if newer.
     */
    async syncDown() {
        if (!this.user) return;
        this.isSyncing = true;
        this._notifySyncChange();

        try {
            await window.userbase.openDatabase({
                databaseName: 'swalpa_progress',
                changeHandler: (items) => {
                    items.forEach(item => {
                        const key = item.itemId;
                        const cloudData = item.item;
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
                    // Dispatch global event for UI components to refresh
                    window.dispatchEvent(new CustomEvent('swalpa-data-synced'));
                }
            });
        } catch (e) {
            console.error('Cloud sync down failed:', e);
            this.isSyncing = false;
            this._notifySyncChange();
        }
    }

    /**
     * Push all local SWALPA data to cloud (used after first signup).
     */
    async syncUp() {
        if (!this.user) return;

        const swalpaKeys = Object.keys(localStorage).filter(key => key.startsWith('swalpa_') || key.includes('_haaki_') || key.includes('_maadi_'));

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
            username: this.user ? this.user.username : null,
            isSyncing: this.isSyncing
        };
        this.syncCallbacks.forEach(cb => cb(status));
    }
}

// Global instance
window.StorageManager = new StorageManager();
document.addEventListener('DOMContentLoaded', () => window.StorageManager.init());
