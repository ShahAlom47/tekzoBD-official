importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// });
 firebase.initializeApp({
  apiKey:"AIzaSyBkP-HgLQiKIApCeAU1mPn1WIA9Xn6mQqw",
   authDomain:"teckzobd.firebaseapp.com",
   projectId:"teckzobd",
   storageBucket:"teckzobd.firebasestorage.app",
   messagingSenderId:"331570180475",
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

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const { title, body, icon } = data.notification;

    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon: icon || '/logo.png',
      })
    );
  }
});
