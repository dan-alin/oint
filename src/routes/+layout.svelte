<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { pwaInfo } from 'virtual:pwa-info';
	import Header from '../components/Header.svelte';
	import Drawer from '../components/Drawer.svelte';
	import { fade } from 'svelte/transition';
	import { toggleSpinner } from '../stores/spinner';
	import { Jumper } from 'svelte-loading-spinners';
	import Alert from '../components/Alert.svelte';
	import { toggleAlert, type AlertState } from '../stores/alert';
	import { onMount } from 'svelte';
	import { initializeApp } from 'Firebase/app';
	import { getMessaging, getToken, onMessage } from 'firebase/messaging';

	let ReloadPrompt: any;
	let showSpinner = false;
	let showAlert: AlertState;
	let tokeFirebase = '';

	toggleSpinner.subscribe((value) => (showSpinner = value));
	toggleAlert.subscribe((value) => (showAlert = value));

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	const {
		VITE_FIREBASE_API_KEY,
		VITE_FIREBASE_AUTH_DOMAIN,
		VITE_FIREBASE_DATABASE_URL,
		VITE_FIREBASE_PROJECT_ID,
		VITE_FIREBASE_STORAGE_BUCKET,
		VITE_FIREBASE_MESSAGING_SENDER_ID,
		VITE_FIREBASE_APP_ID,
		VITE_FIREBASE_MEASUREMENT_ID
	} = import.meta.env;

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
	let messagingProva: any;

	onMount(() => {
		const firebaseApp = initializeApp(firebaseConfig);
		const messaging = getMessaging(firebaseApp);
		messagingProva = messaging;
		getToken(messaging, {
			vapidKey:
				'BNZpAk2_gpV_TlH9d1D8vVrbluvk3eG0lZ6RD24fHoFiPTQyOOGFX7wysw3uZzdoVwpNsncCDRPRckg4t79hhTw'
		})
			.then((currentToken) => {
				if (currentToken) {
					console.log('current token for client: ', currentToken);
					tokeFirebase = currentToken;
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
		onMessage(messagingProva, (payload) => {
			console.log(payload);
			console.log(Notification.permission);
			const notification = new Notification('PRova', {
				body: payload.notification?.body
			});
		});
	});
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

{#if showSpinner}
	<div
		class="w-full h-full fixed  top-0 left-0 bg-white opacity-75 z-50 flex flex-col items-center justify-center"
	>
		<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
	</div>
{/if}
{#if showAlert.show}
	<div class="absolute top-24 w-full z-50" transition:fade>
		<Alert
			message={showAlert.message}
			isError={showAlert.isError}
			isSuccess={showAlert.isSuccess}
		/>
	</div>
{/if}
<Drawer>
	<Header />

	<slot />
</Drawer>

{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}
