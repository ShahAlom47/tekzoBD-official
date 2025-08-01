import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBkP-HgLQiKIApCeAU1mPn1WIA9Xn6mQqw",
  authDomain: "teckzobd.firebaseapp.com",
  projectId: "teckzobd",
  storageBucket: "teckzobd.firebasestorage.app",
  messagingSenderId: "331570180475",
  appId: "1:331570180475:web:2c05cb26511005012f8dde",
  measurementId: "G-FGLRTE0FJK",
};

const app = initializeApp(firebaseConfig);

export const messaging = (async () => {
  if (await isSupported()) {
    return getMessaging(app);
  } else {
    return null;
  }
})();
