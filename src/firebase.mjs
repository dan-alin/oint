import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const {
	VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_DATABASE_URL,
	VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIREBASE_MESSAGING_SENDER_ID,
	VITE_FIREBASE_APP_ID,
	VITE_FIREBASE_MEASUREMENT_ID,
	VITE_FIREBASE_VAPID_KEY
} = import.meta.env;

console.log(import.meta.env);

const firebaseConfig = {
	apiKey: VITE_FIREBASE_API_KEY,
	authDomain: VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: VITE_FIREBASE_DATABASE_URL,
	projectId: VITE_FIREBASE_PROJECT_ID,
	storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: VITE_FIREBASE_APP_ID,
	measurementId: VITE_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getTokenFirebase = (/** @type {(arg0: string) => void} */ setTokenFound) => {
	getToken(messaging, {
		vapidKey: VITE_FIREBASE_VAPID_KEY
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
