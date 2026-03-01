/**
 * Firebase Configuration Logic
 * This file initializes Firebase and exposes auth and db to the global window object.
 */

// TODO: Replace this with your actual Firebase config from the console!
const firebaseConfig = {
    apiKey: "AIzaSyCsaiPL1biWDpHWyLnGX60yLh9LtHBlcC4",
    authDomain: "swalpa-storage.firebaseapp.com",
    projectId: "swalpa-storage",
    storageBucket: "swalpa-storage.firebasestorage.app",
    messagingSenderId: "683261630195",
    appId: "1:683261630195:web:8cb8edd93bc922abbd4986",
    measurementId: "G-E0B6F7LT0P"
};

if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.error("Firebase Configuration is missing! Please update assets/js/firebase-config.js with your real credentials.");
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Expose instances globally
window.auth = firebase.auth();
window.db = firebase.firestore();

// Initialize Analytics if supported
if (typeof firebase.analytics === 'function') {
    window.analytics = firebase.analytics();
}
