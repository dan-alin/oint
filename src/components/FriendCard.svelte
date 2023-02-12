<script lang="ts">
	export let name: string;
	export let id: number;
	export let isAcceptingMode: boolean = false;
	export let action: (friendId: number) => void;
</script>

<div class="flex">
	<div class="avatar placeholder w-14">
		<div class="bg-neutral-focus text-neutral-content rounded-full">
			<span class="text-3xl">{name.charAt(0)}</span>
		</div>
	</div>
	<div class="w-full">
		<div class="flex justify-between mb-2 w-full">
			<span class="font-bold w-full align-middle self-center">{name}</span>
			{#if !isAcceptingMode}
				<button class="btn btn-sm btn-primary" on:click={() => action(id)}>Send</button>
			{/if}
		</div>
		{#if isAcceptingMode}
			<div class="flex justify-center">
				<button class="btn btn-xs btn-primary" on:click={() => action(id)}>Accept</button>
				<button class="btn btn-xs btn-secondary ml-2" on:click={() => action(id)}>Decline</button>
			</div>
		{/if}
	</div>
</div>
