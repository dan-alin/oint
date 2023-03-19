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
			class={`tab tab-bordered w-1/${tabs.length}`}
			on:click={() => (active = tab.id)}
			class:tab-active={active === tab.id}
			class:tab-act={active === tab.id}
		>
			{tab.label}
		</div>
	{/each}
</div>
