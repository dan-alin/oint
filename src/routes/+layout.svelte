<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import Header from '../components/Header.svelte';
	import Drawer from '../components/Drawer.svelte';
	import { toggleSpinner } from '../stores/spinner';
	import { Jumper } from 'svelte-loading-spinners';
	import Button from '../components/Button.svelte';

	let ReloadPrompt: any;
	let showSpinner = false;

	toggleSpinner.subscribe((value) => (showSpinner = value));

	onMount(async () => {
		pwaInfo && (ReloadPrompt = (await import('$lib/ReloadPrompt.svelte')).default);
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
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
<Header />

<Drawer>
	<slot />
</Drawer>

{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}
