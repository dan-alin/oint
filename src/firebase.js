import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// const {
// 	VITE_FIREBASE_API_KEY,
// 	VITE_FIREBASE_AUTH_DOMAIN,
// 	VITE_FIREBASE_DATABASE_URL,
// 	VITE_FIREBASE_PROJECT_ID,
// 	VITE_FIREBASE_STORAGE_BUCKET,
// 	VITE_FIREBASE_MESSAGING_SENDER_ID,
// 	VITE_FIREBASE_APP_ID,
// 	VITE_FIREBASE_MEASUREMENT_ID,
// 	VITE_FIREBASE_VAPID_KEY
// } = import.meta.env;

const firebaseConfig = {
	apiKey: process.env.VITE_FIREBASE_API_KEY,
	authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
	projectId: process.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VITE_FIREBASE_APP_ID,
	measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getTokenFirebase = (/** @type {(arg0: string) => void} */ setTokenFound) => {
	getToken(messaging, {
		vapidKey: process.env.VITE_FIREBASE_VAPID_KEY
	})
		.then((currentToken) => {
			if (currentToken) {
				console.log('current token for client: ', currentToken);
				setTokenFound(currentToken);
				// Track the token -> client mapping, by sending to backend server
				// show on the UI that permission is secured
			} else {
				console.log('No registration token available. Request permission to generate one.');
				// shows on the UI that permission is required
			}
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
			// catch error while creating client token
		});
	onMessage(messaging, (payload) => {
		console.log(payload);
		console.log(Notification.permission);
		const notification = new Notification('PRova', {
			body: payload.notification?.body
		});
	});
};
