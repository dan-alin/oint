/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

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
