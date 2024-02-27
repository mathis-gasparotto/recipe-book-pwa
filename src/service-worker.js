import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

const firebaseConfig = {
    apiKey: "AIzaSyDUoxdnUNtCEqDhiFGMzQN5p7MLzMLOecw",
    authDomain: "recipe-book-pwa-b837b.firebaseapp.com",
    projectId: "recipe-book-pwa-b837b",
    storageBucket: "recipe-book-pwa-b837b.appspot.com",
    messagingSenderId: "789256533856",
    appId: "1:789256533856:web:38998f11548961611b1005",
    measurementId: "G-53DP3X17W3"
};

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
    notificationOptions);
  
  });