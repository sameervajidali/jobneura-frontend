// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getStorage }     from 'firebase/storage';
import { getAuth }        from 'firebase/auth';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};


console.log('🔥 [dev] firebaseConfig:', firebaseConfig);
// 1️⃣ Initialize the Firebase App
const app = initializeApp(firebaseConfig);

// 2️⃣ Export the services you need
export const auth    = getAuth(app);
export const storage = getStorage(app);

export default app;
