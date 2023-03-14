<script lang="ts">
	export let name: string;
	export let id: number;
	export let isViewMode = false;
	export let isAcceptingMode = false;
	export let action: (friendId: number) => void;
</script>

<div class="min-h-16 flex items-center gap-6">
	<div class="placeholder avatar  h-14">
		<div class="rounded-full bg-neutral-focus text-neutral-content ">
			<span class="text-3xl">{name.charAt(0)}</span>
		</div>
	</div>
	<div class="w-full">
		<div class="mb-2 flex w-full justify-between">
			<span class="w-full self-center align-middle font-bold">{name}</span>
			{#if !isAcceptingMode}
				<button class="btn-primary btn-sm btn" on:click={() => action(id)}
					>{isViewMode ? 'remove' : 'Send'}</button
				>
			{/if}
		</div>
		{#if isAcceptingMode}
			<div class="flex justify-center">
				<button class="btn-primary btn-xs btn" on:click={() => action(id)}>Accept</button>
				<button class="btn-secondary btn-xs btn ml-2" on:click={() => action(id)}>Decline</button>
			</div>
		{/if}
	</div>
</div>
