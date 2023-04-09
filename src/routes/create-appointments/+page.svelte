<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import HeaderMenu from '../../components/HeaderMenu.svelte';
	import PageHead from '../../components/PageHead.svelte';
	import { base } from '$app/paths';
	import { userStore } from '../../stores/user';

	let previousPage: string = base;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<svelte:head>
	<title>Eventi</title>
	<meta name="description" content="An events list" />
</svelte:head>

<div class="sticky left-0 top-0 z-50 w-full  bg-base-100 px-6 py-8">
	<div class="flex flex-col gap-8 ">
		{#if $userStore}
			<HeaderMenu firstRow="Ciao" secondRow={$userStore.name} goto={previousPage} />
		{/if}
		<p class="text-sm">
			Dai tornei di calcetto alle mostre d'arte, dalla degustazione di vini ai corsi di cucina...
			Vediamo cosa è in programma questa settimana
		</p>
	</div>
</div>
