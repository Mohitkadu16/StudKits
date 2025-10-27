const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

// Initialize Firebase (copy your config from firebase-config.ts)
const firebaseConfig = {
  // Add your Firebase config here
};

async function checkUserProfile() {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Sign in to get the UID
    const userCredential = await signInWithEmailAndPassword(auth, 'studkits25@gmail.com', 'YOUR_PASSWORD');
    const uid = userCredential.user.uid;

    // Get user profile from Firestore
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (userDoc.exists()) {
      console.log('User Profile:', userDoc.data());
    } else {
      console.log('No user profile found in database');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUserProfile();