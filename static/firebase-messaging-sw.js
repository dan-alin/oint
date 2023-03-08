// Scripts for firebase and firebase messaging
/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
	messagingSenderId: '1031262027372',
	apiKey: 'AIzaSyAyGOc3a03Gv6DaqmQ5rUuCo-A2qqgupbY',
	projectId: 'oint-a5854',
	appId: '1:1031262027372:web:34e68c233344d875dae249'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload.notification);

	const notificationTitle = payload?.notification?.title;
	const notificationOptions = {
		body: payload?.notification?.body
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
