import { initializeApp } from 'firebase/app'
import { getDatabase, set, ref, onValue, remove, update } from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { setCurrentUser } from './userService'

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
const auth = getAuth(app)

export function createData(refStr, data) {
  set(ref(db, refStr), data)
}

export function updateData(refStr, data) {
  update(ref(db, refStr), data)
}

export function removeData(refStr) {
  remove(ref(db, refStr))
}

export function initData(refStr, localStorageKey, initValue = null) {
  const dataRef = ref(db, refStr)
  return onValue(dataRef, (snapshot) => {
    const data = snapshot.val()
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, initValue && !data ? JSON.stringify(initValue) : JSON.stringify(data))
    }
  })
}

export async function registerUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setCurrentUser(userCredential.user)
    return userCredential.user
  })
  .catch((error) => {
    throw new Error(error)
  })
}

export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setCurrentUser(userCredential.user)
    return userCredential.user
  })
  .catch((error) => {
    throw new Error(error)
  })
}