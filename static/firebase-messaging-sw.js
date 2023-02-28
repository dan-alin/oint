// Scripts for firebase and firebase messaging
/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const {
	VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_MESSAGING_SENDER_ID,
	VITE_FIREBASE_APP_ID
} = import.meta.env;

console.log('API', VITE_FIREBASE_API_KEY);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.2
firebase.initializeApp({
	messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
	apiKey: VITE_FIREBASE_API_KEY,
	projectId: VITE_FIREBASE_PROJECT_ID,
	appId: VITE_FIREBASE_APP_ID
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload.notification);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
