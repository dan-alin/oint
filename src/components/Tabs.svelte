<script lang="ts">
	import type { Tab } from '../models';

	export let tabs: Tab[];
	export let active = tabs[0].id;
</script>

<div class="tabs flex w-full">
	{#each tabs as tab}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id={tab.id}
			class={' tab tab-bordered'}
			on:click={() => (active = tab.id)}
			class:tab-active={active === tab.id}
			class:text-primary={active === tab.id}
			class:border-primary={active === tab.id}
			class:tab-2={tabs.length === 2}
			class:tab-3={tabs.length === 3}
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
