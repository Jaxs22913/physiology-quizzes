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
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME.firebaseapp.com",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME.appspot.com",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME"
};
