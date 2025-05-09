// import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
// import { getFirestore, type Firestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// let app: FirebaseApp | null = null;
// let db: Firestore | null = null;

// if (typeof window !== 'undefined') { // Ensure Firebase is initialized only on the client-side
//   if (getApps().length === 0) {
//     app = initializeApp(firebaseConfig);
//   } else {
//     app = getApps()[0]!;
//   }
//   if (app) {
//     db = getFirestore(app);
//   }
// }

// Temporary: export null db to avoid breaking existing imports immediately.
// Components should be updated to not rely on this.
const db = null;
const app = null;

export { app, db };
