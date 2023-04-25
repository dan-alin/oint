<script lang="ts">
	import { Icons } from '../enums';
	import Icon from './Icon.svelte';

	export let firstRow: string;
	export let secondRow: string;
	export let notificationsUreadCount = 0;
	export let showNotification = false;
</script>

<div class="flex items-center justify-between ">
	<div>
		<p class="text-xl text-gray-400">{firstRow}</p>

		<p class="text-2xl font-bold">{secondRow}</p>
	</div>
	{#if showNotification}
		<a
			class="relative flex  h-[50px] w-[50px] items-center justify-center rounded-full shadow-md"
			href={`/notifications`}
		>
			{#if notificationsUreadCount > 0}
				<div class="badge absolute top-0 left-8 text-[10px]">
					{notificationsUreadCount >= 100 ? '99+' : notificationsUreadCount}
				</div>
			{/if}
			<Icon icon={Icons.NOTIFICATION_OUTLINE} />
		</a>
	{/if}
</div>
