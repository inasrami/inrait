import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'
import { getAuth }       from 'firebase/auth'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

// Firebase only runs in the browser. During the prerender build there is no
// window (and usually no env vars), so db/auth stay null there; every consumer
// reads them inside onMounted().
const inBrowser = typeof window !== 'undefined'
const app = inBrowser ? initializeApp(firebaseConfig) : null

export const db   = app ? getFirestore(app) : null
export const auth = app ? getAuth(app)      : null
