// Firebase web config -- this is NOT a secret. Firebase's client-side config
// (apiKey included) is meant to be public; it just identifies which Firebase
// project a request belongs to. Actual data protection comes from the
// Firestore security rules set in the Firebase Console, not from hiding this
// file. Safe to commit.
//
// Fill this in from Firebase Console -> Project settings -> General ->
// "Your apps" -> the web app's config snippet. Until it's filled in, cloud
// sync silently stays off (see cloud-sync.js's isConfigured() check) and the
// site behaves exactly as it did before -- local-only, no account needed.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyB4-jFggOwUvqeIo7ut5yJRh3uUXpndBzI",
  authDomain: "pa-quizzes-addc1.firebaseapp.com",
  projectId: "pa-quizzes-addc1",
  storageBucket: "pa-quizzes-addc1.firebasestorage.app",
  messagingSenderId: "60051577783",
  appId: "1:60051577783:web:45d53d37b1592f17c36632"
};
