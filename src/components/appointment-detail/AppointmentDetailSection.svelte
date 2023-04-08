<script lang="ts">
	import type { AppointmentDetailSectionData } from '../../models/appointment';
	import Icon from '../Icon.svelte';

	export let data: AppointmentDetailSectionData;
	const { icon, firstRow, secondRow, btnLabel, callback } = data;
</script>

<div class="mt-4 text-xs">
	<span class="mr-3 inline-block h-8 w-8 rounded bg-light-gray p-1.5 align-top text-disabled">
		<Icon {icon} size={'20'} />
	</span>
	<div class="inline-flex flex-col">
		<p class="font-bold">{firstRow}</p>
		<p>{secondRow}</p>
		{#if btnLabel}
			<button class="link-primary mt-2 text-start font-bold underline" on:click={callback}>
				{btnLabel}
			</button>
		{/if}
	</div>
</div>
