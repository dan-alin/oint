<script lang="ts">
	import { Icons } from '../enums';
	import Icon from './Icon.svelte';

	export let firstRow: string;
	export let secondRow: string;
	export let notificationsUreadCount: number;
</script>

<div class="flex items-center justify-between">
	<div>
		<p class="text-xl text-gray-400">{firstRow}</p>

		<p class="text-2xl font-bold">{secondRow}</p>
	</div>
	<div class="relative flex  h-[50px] w-[50px] items-center justify-center rounded-full shadow-md">
		{#if notificationsUreadCount > 0}
			<div class="badge absolute top-0 left-8 text-[10px]">
				{notificationsUreadCount >= 100 ? '99+' : notificationsUreadCount}
			</div>
		{/if}
		<Icon icon={Icons.NOTIFICATION} />
	</div>
</div>
