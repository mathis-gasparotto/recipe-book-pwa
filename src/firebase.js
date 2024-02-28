import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { firebaseConfig } from "./services/firebaseService";

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

