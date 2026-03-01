/**
 * Firebase Configuration Logic
 * This file initializes Firebase and exposes auth and db to the global window object.
 */

// TODO: Replace this with your actual Firebase config from the console!
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.error("Firebase Configuration is missing! Please update assets/js/firebase-config.js with your real credentials.");
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Expose instances globally
window.auth = firebase.auth();
window.db = firebase.firestore();
