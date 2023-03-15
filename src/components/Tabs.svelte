<script lang="ts">
	import type { Tab } from '../models';

	export let tabs: Tab[];
	export let active = tabs[0].id;

	let size = `w-1/${tabs.length}`;
</script>

<div class="tabs flex w-full">
	{#each tabs as tab}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id={tab.id}
			class={`${size} tab tab-bordered`}
			on:click={() => (active = tab.id)}
			class:tab-active={active === tab.id}
			class:text-primary={active === tab.id}
			class:border-primary={active === tab.id}
		>
			{tab.label}
		</div>
	{/each}
</div>

<style>
	.border-primary {
		border-bottom: 3px var(--color-primary) solid;
	}
</style>
