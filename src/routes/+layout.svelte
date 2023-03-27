<script lang="ts">
	import '../app.css';
	import { pwaInfo } from 'virtual:pwa-info';
	import { fade } from 'svelte/transition';
	import { toggleSpinner } from '../stores/spinner';
	import { Jumper } from 'svelte-loading-spinners';
	import Alert from '../components/Alert.svelte';
	import { toggleAlert, type AlertState } from '../stores/alert';
	import { onMount } from 'svelte';
	import BottomNav from '../components/bottom-nav/BottomNav.svelte';
	import { apiCall } from '../utils/api-call';
	import { page } from '$app/stores';
	import { userStore } from '../stores/user';
	import type { User } from '../models';

	let ReloadPrompt: any;
	let showSpinner = false;
	let showAlert: AlertState;
	let tokeFirebase = '';

	toggleSpinner.subscribe((value) => (showSpinner = value));
	toggleAlert.subscribe((value) => (showAlert = value));

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	let firebaseToken: string;
	const setFirebaseToken = async (token: string) => {
		firebaseToken = token;
		await apiCall(
			'/api/add-token-device',
			'post',
			'',
			JSON.stringify({
				token
			}),
			sessionStorage.getItem('jwt_token') || ''
		);
	};


	onMount(async () => {
		//SW registration to check app updates
		// pwaInfo && (ReloadPrompt = (await import('$lib/ReloadPrompt.svelte')).default);
		const { getTokenFirebase } = await import('../firebase');
		if ($page.url.pathname !== '/login' && $page.url.pathname !== '/sign-up' && $page.url.pathname !== '/change-password') {
			const user: User = await apiCall(
			'/api/auth-profile',
			'get',
			'',
			undefined,
			sessionStorage.getItem('jwt_token') || ''
			);
			userStore.update(() => user);
		}
		getTokenFirebase(setFirebaseToken);

	});

</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

{#if showSpinner}
	<div
		class="fixed top-0 left-0  z-50 flex h-full w-full flex-col items-center justify-center bg-white opacity-75"
	>
		<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
	</div>
{/if}
{#if showAlert.show}
	<div class="absolute  z-50 w-full" transition:fade>
		<Alert
			message={showAlert.message}
			isError={showAlert.isError}
			isSuccess={showAlert.isSuccess}
		/>
	</div>
{/if}
	<!-- <Header /> -->

	<div class="h-screen overflow-auto ">
		<slot />
	</div>
	{#if $page.url.pathname !== '/login' && $page.url.pathname !== '/sign-up'}
		<BottomNav />
	{/if}
	<!-- {#if ReloadPrompt}
			<svelte:component this={ReloadPrompt} />
		{/if} -->
