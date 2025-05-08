import { getStorage, ref as storageRef } from 'firebase/storage';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const ref = storageRef(storage, `uploads/${file.name}`);
await uploadBytes(ref, file);
const url = await getDownloadURL(ref);

const app     = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
