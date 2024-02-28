import { initializeApp } from 'firebase/app'
import { getDatabase, set, ref, onValue, remove, update } from 'firebase/database'

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
     
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export function createData(refStr, data) {
  set(ref(db, refStr), data)
}

export function updateData(refStr, data) {
  update(ref(db, refStr), data)
}

export function removeData(refStr) {
  remove(ref(db, refStr))
}

export function initData(refStr, localStorageKey) {
  const dataRef = ref(db, refStr)
  return onValue(dataRef, (snapshot) => {
    const data = snapshot.val()
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, JSON.stringify(data))
    }
  })
}
