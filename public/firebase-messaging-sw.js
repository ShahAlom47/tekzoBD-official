importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBkP-HgLQiKIApCeAU1mPn1WIA9Xn6mQqw",
  authDomain: "teckzobd.firebaseapp.com",
  projectId: "teckzobd",
  storageBucket: "teckzobd.firebasestorage.app",
  messagingSenderId: "331570180475",
  appId: "1:331570180475:web:2c05cb26511005012f8dde",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png",
  });
});
