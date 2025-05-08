// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage }    from 'firebase/storage';
import { getAuth }       from 'firebase/auth';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// 1️⃣ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 2️⃣ Create & export Storage and Auth instances
export const storage = getStorage(app);
export const auth    = getAuth(app);

export default app;
