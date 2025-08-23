const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Place your downloaded service account JSON here

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function run() {
  const uid = 'i2e25Ac1tFMEDdSjCyt6Z5avim63';
  await db.collection('users').doc(uid).set({
    name: 'test user',
    bio: 'Student / electronics hobbyist',
    school: 'Example College',
    photoURL: '',
    role: 'user',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
  console.log('Done');
  process.exit(0);
}

run().catch(console.error);
