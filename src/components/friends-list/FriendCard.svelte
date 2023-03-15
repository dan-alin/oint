<script lang="ts">
	import AcceptReject from '../AcceptReject.svelte';

	export let name: string;
	export let id: number;
	// export let isViewMode = false;
	export let mode: 'view' | 'accept' | 'send' = 'view';

	export let action: (friendId: number) => void = () => null;
</script>

<div class="flex flex-col gap-4">
	<div class="min-h-12 flex items-center gap-4 text-xs">
		<div class="placeholder avatar h-12 ">
			<div class="rounded-full bg-neutral-focus text-neutral-content shadow ">
				<span class="text-3xl">{name.charAt(0)}</span>
			</div>
		</div>
		<div class="w-full">
			<div class="mb-2  w-full ">
				<p class="ellipsis w-full self-center align-middle font-bold">{name}</p>
				<p>X amici in comune</p>
			</div>
		</div>

		<div />
	</div>
	{#if mode === 'accept'}
		<AcceptReject acceptAction={action} declineAction={action} {id} />
	{/if}

	{#if mode === 'send'}
		<button on:click={() => action(id)} class="btn-primary btn-sm btn rounded-md ">
			Richiedi amicizia
		</button>
	{/if}

	<div class="divider my-0" />
</div>

<style>
	.shadow {
		box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
	}
</style>
