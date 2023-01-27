<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import Header from '../components/Header.svelte';
	import Drawer from '../components/Drawer.svelte';

	let ReloadPrompt: any;

	onMount(async () => {
		pwaInfo && (ReloadPrompt = (await import('$lib/ReloadPrompt.svelte')).default);
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<Header />

<Drawer>
	<slot />
</Drawer>

{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}
