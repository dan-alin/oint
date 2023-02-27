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

	let ReloadPrompt: any;
	let showSpinner = false;
	let showAlert: AlertState;
	let tokeFirebase = '';

	toggleSpinner.subscribe((value) => (showSpinner = value));
	toggleAlert.subscribe((value) => (showAlert = value));

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
	let firebaseToken: string;
	const setFirebaseToken = (token: string) => {
		firebaseToken = token;
	};

	onMount(async () => {
		const { getTokenFirebase } = await import('../../firebase');

		getTokenFirebase(setFirebaseToken);
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
